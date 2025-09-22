import React from "react";

function GmailAuth() {
  const handleLogin = () => {
    // Redirects to backend login
    window.location.href = "http://localhost:8080/auth/google/login";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Connect Your Gmail</h1>
      <p style={styles.subtitle}>
        We need your permission to send emails using your Gmail account.
      </p>
      <button style={styles.loginBtn} onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  loginBtn: {
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default GmailAuth;
