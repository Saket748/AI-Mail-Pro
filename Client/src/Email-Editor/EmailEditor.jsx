import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Send, Sparkles, Edit3, Target } from "lucide-react";

export default function EmailEditor() {
  const [emailDraft, setEmailDraft] = useState("Loading email...");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showATS, setShowATS] = useState(false);
const [atsScore, setAtsScore] = useState("87"); // string, since backend returns string
  const navigate = useNavigate();

  // ✅ Fetch email from backend
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/resume/generate-mail"
        );
        setEmailDraft(response.data);
      } catch (error) {
        console.error("Error fetching email:", error);
        setEmailDraft("Error fetching email from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, []);

  // ✅ Update email in backend and navigate
  const handleConfirm = async () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    try {
      await axios.post("http://localhost:8080/resume/update-mail", emailDraft, {
        headers: { "Content-Type": "text/plain" },
      });
      navigate("/confirm", { state: { finalEmail: emailDraft } });
    } catch (error) {
      console.error("Error updating email:", error);
      alert("Failed to update email in backend!");
    }
  };

  const handleATSCheck = async () => {
  try {
    const response = await axios.post("http://localhost:8080/resume/generate-ATS");
    setAtsScore(response.data); // backend sends string like "87"
    setShowATS(true);
  } catch (error) {
    console.error("Error fetching ATS score:", error);
    alert("Failed to fetch ATS score from backend!");
  }
};


  const getScoreColor = (score) => {
  const num = parseInt(score, 10) || 0;  // convert string to int safely
  if (num >= 80) return '#10b981';
  if (num >= 60) return '#f59e0b';
  return '#ef4444';
};

const getScoreLabel = (score) => {
  const num = parseInt(score, 10) || 0;
  if (num >= 80) return 'Excellent';
  if (num >= 60) return 'Good';
  return 'Needs Improvement';
};


  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start',
    },
    
    backgroundElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0,
    },
    
     floatingIcon: {
      position: 'absolute',
      top: '20px',
      left: '63rem',
      width: '120px',
      height: '120px',
      background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(15px)',
      border: '2px solid rgba(79, 172, 254, 0.3)',
      animation: 'float 6s ease-in-out infinite',
      zIndex: 3,
      boxShadow: '0 10px 30px rgba(79, 172, 254, 0.2)',
    },
    
    mainCard: {
      maxWidth: '800px',
      flex: '1',
      margin: '100px auto',
      top: '10px',                                                                                                                                                                                                                                    
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '4rem',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      position: 'relative',
      zIndex: 2,
      transform: loading ? 'scale(0.95) translateY(20px)' : 'scale(1) translateY(0)',
      opacity: loading ? 0.8 : 1,
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },

    atsPanel: {
      width: '350px',
      height: 'fit-content',
      marginTop: '100px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '24px',
      padding: '2.5rem',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      position: 'relative',
      zIndex: 2,
      transform: showATS ? 'scale(1) translateX(0)' : 'scale(0.9) translateX(50px)',
      opacity: showATS ? 1 : 0,
      visibility: showATS ? 'visible' : 'hidden',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },

    atsHeader: {
      textAlign: 'center',
      marginBottom: '2rem',
    },

    atsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#475569',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },

    atsSubtitle: {
      color: '#64748b',
      fontSize: '0.9rem',
    },

    scoreCircle: {
      width: '200px',
      height: '200px',
      border: `8px solid ${getScoreColor(atsScore)}`,
      borderRadius: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      background: `linear-gradient(135deg, ${getScoreColor(atsScore)}15, ${getScoreColor(atsScore)}05)`,
      position: 'relative',
      animation: showATS ? 'scoreAppear 1s ease-out 0.3s both' : 'none',
    },

    scoreNumber: {
      fontSize: '3.5rem',
      fontWeight: '800',
      color: getScoreColor(atsScore),
      lineHeight: '1',
      marginBottom: '0.2rem',
    },

    scoreUnit: {
      fontSize: '1.2rem',
      color: '#64748b',
      fontWeight: '500',
    },

    scoreLabel: {
      textAlign: 'center',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      background: `linear-gradient(135deg, ${getScoreColor(atsScore)}20, ${getScoreColor(atsScore)}10)`,
      border: `1px solid ${getScoreColor(atsScore)}30`,
      color: getScoreColor(atsScore),
      fontWeight: '600',
      fontSize: '1rem',
      animation: showATS ? 'slideUp 0.8s ease-out 0.6s both' : 'none',
    },
    
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem',
    },
    
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      marginBottom: '0.5rem',
      animation: loading ? 'pulse 2s ease-in-out infinite' : 'none',
    },
    
    subtitle: {
      color: '#64748b',
      fontSize: '1.1rem',
      fontWeight: '400',
    },
    
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '3rem',
    },
    
    loadingSpinner: {
      width: '50px',
      height: '50px',
      border: '3px solid rgba(79, 172, 254, 0.3)',
      borderTop: '3px solid #4facfe',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem',
    },
    
    loadingText: {
      color: '#4facfe',
      fontSize: '1.1rem',
      fontWeight: '500',
    },
    
    textareaWrapper: {
      position: 'relative',
      marginBottom: '2rem',
    },
    
    textareaHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      padding: '0 0.5rem',
    },
    
    textareaLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#475569',
      fontWeight: '600',
      fontSize: '0.95rem',
    },
    
    editToggle: {
      background: 'none',
      border: 'none',
      color: '#4facfe',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    
    textarea: {
      width: '100%',
      minHeight: '300px',
      padding: '1.5rem',
      border: `2px solid ${isEditing ? '#4facfe' : '#e2e8f0'}`,
      borderRadius: '16px',
      fontSize: '1rem',
      lineHeight: '1.6',
      fontFamily: 'inherit',
      resize: 'vertical',
      backgroundColor: isEditing ? '#fafbfc' : '#f8fafc',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      outline: 'none',
      color: '#334155',
      boxShadow: isEditing ? '0 0 0 4px rgba(79, 172, 254, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
    },
    
    confirmButton: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      border: 'none',
      borderRadius: '16px',
      padding: '1rem 2.5rem',
      color: 'white',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 8px 25px rgba(79, 172, 254, 0.4)',
      transform: 'translateY(0)',
    },

    atsButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      border: 'none',
      borderRadius: '16px',
      padding: '1rem 2rem',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
      transform: 'translateY(0)',
    },
    
    buttonText: {
      position: 'relative',
      zIndex: 2,
    },
    
    buttonRipple: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0',
      height: '0',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.6s, height 0.6s',
      zIndex: 1,
    },
    
    confetti: {
      position: 'absolute',
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      pointerEvents: 'none',
      zIndex: 10,
    },
    
    confettiPiece: {
      position: 'absolute',
      width: '6px',
      height: '6px',
      background: '#4facfe',
      animation: showConfetti ? 'confettiFall 3s ease-out forwards' : 'none',
    }
  };

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(5deg); }
      66% { transform: translateY(-10px) rotate(-5deg); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes confettiFall {
      0% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
      }
      100% {
        opacity: 0;
        transform: translateY(200px) rotate(720deg);
      }
    }
    
    @keyframes buttonHover {
      0% { transform: translateY(0) scale(1); }
      100% { transform: translateY(-2px) scale(1.05); }
    }

    @keyframes scoreAppear {
      0% {
        transform: scale(0) rotate(-180deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.1) rotate(-90deg);
        opacity: 0.8;
      }
      100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
    }

    @keyframes slideUp {
      0% {
        transform: translateY(20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Background floating elements */}
        <div style={styles.backgroundElements}>
          <div style={styles.floatingIcon}>
            <Mail size={32} color="rgba(255, 255, 255, 0.8)" />
          </div>
        </div>

        {/* Main card */}
        <div style={styles.mainCard}>
          <div style={styles.header}>
            <h2 style={styles.title}>Email Preview & Editor</h2>
            <p style={styles.subtitle}>
              Review and customize your AI-generated email
            </p>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Generating your perfect email...</p>
            </div>
          ) : (
            <>
              <div style={styles.textareaWrapper}>
                <div style={styles.textareaHeader}>
                  <div style={styles.textareaLabel}>
                    <Edit3 size={18} />
                    Email Content
                  </div>
                  <button
                    style={{
                      ...styles.editToggle,
                      color: isEditing ? '#059669' : '#4facfe',
                    }}
                    onClick={() => setIsEditing(!isEditing)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(79, 172, 254, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    {isEditing ? '✓ Done' : 'Edit'}
                  </button>
                </div>
                <textarea
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  style={styles.textarea}
                  readOnly={!isEditing}
                  onFocus={() => setIsEditing(true)}
                />
              </div>

              <div style={styles.buttonContainer}>
                <button
                  style={styles.atsButton}
                  onClick={handleATSCheck}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                    e.target.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(1px) scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  }}
                >
                  <div style={styles.buttonRipple}></div>
                  <span style={styles.buttonText}>ATS Score</span>
                  <Target size={20} />
                </button>

                <button
                  style={styles.confirmButton}
                  onClick={handleConfirm}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                    e.target.style.boxShadow = '0 12px 35px rgba(79, 172, 254, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.4)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'translateY(1px) scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  }}
                >
                  <div style={styles.buttonRipple}></div>
                  <span style={styles.buttonText}>Confirm & Send</span>
                  <Send size={20} />
                  {showConfetti && (
                    <div style={styles.confetti}>
                      <Sparkles size={16} color="gold" />
                    </div>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ATS Score Panel */}
        <div style={styles.atsPanel}>
          <div style={styles.atsHeader}>
            <h3 style={styles.atsTitle}>
              <Target size={24} />
              ATS Score
            </h3>
            <p style={styles.atsSubtitle}>Application Tracking System Rating</p>
          </div>
          
          <div style={styles.scoreCircle}>
            <div style={styles.scoreNumber}>{atsScore}</div>
            <div style={styles.scoreUnit}>/ 100</div>
          </div>
          
          <div style={styles.scoreLabel}>
            {getScoreLabel(atsScore)}
          </div>
        </div>
      </div>
    </>
  );
}