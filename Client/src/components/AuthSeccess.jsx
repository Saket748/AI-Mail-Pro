import React from "react";

function AuthSuccess() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>✅ Gmail Connected Successfully!</h1>
      <p style={styles.subtitle}>
        You can now send bulk emails using your Gmail account.
      </p>
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
    background: "#e8f5e9",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
  },
};

export default AuthSuccess;
