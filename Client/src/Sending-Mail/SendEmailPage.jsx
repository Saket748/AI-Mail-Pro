import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Send,
  Mail,
  Check,
  X,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import "./SendEmailPage.css";

function SendEmailPage() {
  const location = useLocation();
  const recipients = location.state?.csvList || []; // From ConfirmPage

  const [currentEmail, setCurrentEmail] = useState(null);
  const [results, setResults] = useState([]);
  const [sending, setSending] = useState(false);

  const handleSendEmails = async () => {
    if (recipients.length === 0) return alert("No recipients found!");
    setSending(true);
    setResults([]);
    setCurrentEmail({ email: "", status: "sending" });

    try {
      const response = await axios.get("http://localhost:8080/resume/send-bulk");

      const sentEmails = Array.isArray(response.data.sent) ? response.data.sent : [];
      const failedEmails = Array.isArray(response.data.failed) ? response.data.failed : [];

      const allResults = [
        ...sentEmails.map((email) => ({ email, status: "sent" })),
        ...failedEmails.map((email) => ({ email, status: "failed" })),
      ];

      let i = 0;
      const showNextEmail = () => {
        if (i >= allResults.length) {
          setCurrentEmail(null);
          setSending(false);
          return;
        }

        const emailItem = allResults[i];
        const match = recipients.find((r) => r.email === emailItem.email);
        const name = match?.name || "";

        setCurrentEmail({ name, email: emailItem.email, status: "sending" });

        setTimeout(() => {
          setResults((prev) => [...prev, { ...emailItem, name }]);
          setCurrentEmail(null);
          i++;
          setTimeout(showNextEmail, 500);
        }, 1500);
      };

      showNextEmail();
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails! Check backend logs.");
      setSending(false);
    }
  };

  const getStats = () => {
    const sent = results.filter((r) => r.status === "sent").length;
    const failed = results.filter((r) => r.status === "failed").length;
    return { sent, failed, total: results.length };
  };

  const stats = getStats();

  return (
    <div className="send-email-page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-icon">
            <Mail className="icon-white" />
          </div>
          <h1>Email Campaign Manager</h1>
          <p>Send personalized emails to your recipients</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="card blue">
            <Users className="icon-blue" />
            <div>
              <p>Total Recipients</p>
              <p className="stat-number">{recipients.length}</p>
            </div>
          </div>

          <div className="card green">
            <CheckCircle2 className="icon-green" />
            <div>
              <p>Sent</p>
              <p className="stat-number">{stats.sent}</p>
            </div>
          </div>

          <div className="card red">
            <XCircle className="icon-red" />
            <div>
              <p>Failed</p>
              <p className="stat-number">{stats.failed}</p>
            </div>
          </div>

          <div className="card yellow">
            <Clock className="icon-yellow" />
            <div>
              <p>Progress</p>
              <p className="stat-number">
                {stats.total}/{recipients.length}
              </p>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <div className="center">
          <button
            onClick={handleSendEmails}
            disabled={sending}
            className="send-btn"
          >
            {sending ? <Loader2 className="spin" /> : <Send />}
            {sending ? "Sending Emails..." : "Start Email Campaign"}
          </button>
        </div>

        {/* Progress Bar */}
        {sending && (
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(stats.total / recipients.length) * 100}%` }}
              ></div>
            </div>
            <p>
              {stats.total} of {recipients.length} emails processed
            </p>
          </div>
        )}

        {/* Current Sending */}
        {currentEmail && (
          <div className="current-sending fade-in">
            <div className="sending-box">
              <Loader2 className="spin" />
              <div>
                <h3>Sending...</h3>
                <p>{currentEmail.name}</p>
                <p>{currentEmail.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="results">
          {results.map((result, index) => (
            <div
              key={index}
              className={`result-card slide-up ${
                result.status === "sent" ? "success" : "failed"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div>
                <h4>{result.name}</h4>
                <p>{result.email}</p>
              </div>
              <span className={`status ${result.status}`}>
                {result.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Completion */}
        {!sending && results.length > 0 && results.length === recipients.length && (
          <div className="complete fade-in">
            <CheckCircle2 className="icon-green large" />
            <h3>Campaign Complete!</h3>
            <p>
              Successfully sent {stats.sent} emails, {stats.failed} failed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SendEmailPage;
