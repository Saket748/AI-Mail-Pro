import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// CSS Styles
const styles = `.confirm-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 10rem auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.upload-section, .preview-section {
  display: flex;
  flex-direction: column;
}

.upload-card, .preview-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.upload-card:hover, .preview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 2rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  position: relative;
}

.title-icon {
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.count-badge {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: auto;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.drop-zone {
  border: 3px dashed #a8b8f0;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(168, 184, 240, 0.1), rgba(255, 255, 255, 0.1));
  position: relative;
  overflow: hidden;
}

.drop-zone::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(168, 184, 240, 0.1), transparent);
  transform: rotate(-45deg);
  transition: transform 0.6s;
}

.drop-zone:hover::before {
  transform: rotate(-45deg) translateX(100%);
}

.drop-zone:hover {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(255, 255, 255, 0.15));
  transform: scale(1.02);
}

.drop-zone.drag-over {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(255, 255, 255, 0.2));
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.drop-zone.has-file {
  border-color: #27ae60;
  background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(255, 255, 255, 0.1));
}

.file-input {
  display: none;
}

.drop-content {
  position: relative;
  z-index: 1;
}

.upload-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  color: #667eea;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.upload-icon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
}

.drop-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 600;
}

.drop-content p {
  margin: 0 0 1rem 0;
  color: #7f8c8d;
  font-size: 1rem;
}

.file-types {
  display: inline-block;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(39, 174, 96, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  z-index: 1;
}

.file-icon {
  width: 50px;
  height: 50px;
  color: #27ae60;
  flex-shrink: 0;
}

.file-icon svg {
  width: 100%;
  height: 100%;
}

.file-info {
  flex: 1;
}

.file-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.file-size {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.remove-file {
  background: rgba(231, 76, 60, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-file:hover {
  background: rgba(231, 76, 60, 0.2);
  transform: scale(1.1);
}

.remove-file svg {
  width: 20px;
  height: 20px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.btn-primary:disabled {
  background: linear-gradient(135deg, #bdc3c7, #95a5a6);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.4);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(116, 185, 255, 0.6);
}

.btn-secondary:disabled {
  background: linear-gradient(135deg, #bdc3c7, #95a5a6);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-icon {
  font-size: 1.1rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.preview-content {
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
}

.loading-animation {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.wave {
  width: 15px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  animation: wave 1.4s ease-in-out infinite;
}

.wave:nth-child(2) {
  animation-delay: 0.2s;
}

.wave:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.3);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: #7f8c8d;
}

.empty-icon {
  width: 100px;
  height: 100px;
  color: #bdc3c7;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-state h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  color: #5a6c7d;
}

.empty-state p {
  margin: 0;
  color: #95a5a6;
}

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.data-table thead {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.data-table th {
  padding: 1.25rem 1rem;
  font-weight: 600;
  text-align: left;
  position: relative;
}

.th-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.th-icon {
  font-size: 1rem;
  opacity: 0.9;
}

.data-table tbody tr {
  transition: all 0.3s ease;
  animation: slideInUp 0.5s ease-out both;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.data-table tbody tr:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(255, 255, 255, 0.8));
  transform: translateX(5px);
}

.data-table td {
  padding: 1rem;
  color: #2c3e50;
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .confirm-page {
    padding: 1rem;
  }
  
  .upload-card, .preview-card {
    padding: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .drop-zone {
    padding: 2rem 1rem;
  }
  
  .upload-icon {
    width: 60px;
    height: 60px;
  }
}
  `
  ;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

function ConfirmPage() {
  const [file, setFile] = useState(null);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // File selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
    } else {
      alert("Please drop a valid CSV file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  // API call to backend
  const handleFetchList = async () => {
    if (!file) return alert("Please select a CSV file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/resume/csv-upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Expecting backend returns [{name, email}, ...]
      setListData(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
      alert("Failed to fetch list from backend.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to next page
  const handleNext = () => {
    navigate("/send-email", { state: { csvList: listData } });
  };

  const removeFile = () => {
    setFile(null);
    setListData([]);
  };

  return (
    <div className="confirm-page">
      <div className="container">
        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-card">
            <h2 className="section-title">
              <span className="title-icon">📊</span>
              Upload CSV File
            </h2>

            <div
              className={`drop-zone ${isDragOver ? "drag-over" : ""} ${
                file ? "has-file" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="file-input"
              />

              {!file ? (
                <div className="drop-content">
                  <div className="upload-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <h3>Drop your CSV file here</h3>
                  <p>or click to browse files</p>
                  <div className="file-types">Supports: .csv files only</div>
                </div>
              ) : (
                <div className="file-preview">
                  <div className="file-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">
                      {(file.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                  <button className="remove-file" onClick={removeFile}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="action-buttons">
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                onClick={handleFetchList}
                disabled={loading || !file}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🔄</span>
                    Load List
                  </>
                )}
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleNext}
                disabled={listData.length === 0}
              >
                <span className="btn-icon">➡️</span>
                Next Step
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <div className="preview-card">
            <h3 className="section-title">
              <span className="title-icon">👥</span>
              List Preview
              {listData.length > 0 && (
                <span className="count-badge">{listData.length}</span>
              )}
            </h3>

            <div className="preview-content">
              {loading && (
                <div className="loading-state">
                  <div className="loading-animation">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                  </div>
                  <p>Processing your CSV file...</p>
                </div>
              )}

              {!loading && listData.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3M19,19H5V5H19V19Z" />
                    </svg>
                  </div>
                  <h4>No data loaded yet</h4>
                  <p>Upload a CSV file to see the preview here</p>
                </div>
              )}

              {!loading && listData.length > 0 && (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">👤</span>
                            Name
                          </div>
                        </th>
                        <th>
                          <div className="th-content">
                            <span className="th-icon">📧</span>
                            Email
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listData.map((item, index) => (
                        <tr
                          key={index}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;
