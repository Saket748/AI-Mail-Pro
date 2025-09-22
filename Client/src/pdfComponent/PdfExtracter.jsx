import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PdfExtractor = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Rainfall animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const raindrops = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < 150; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(100, 149, 237, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please drop a valid PDF file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // ✅ Integrated API upload
  const handleUpload = async () => {
  if (!file) return alert("Please select a PDF file first!");

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);
    setUploadProgress(0);

    // Artificial delay (2 seconds)
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));

    // Real upload with progress tracking
    const upload = axios.post("http://localhost:8080/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percent);
      },
    });

    // Wait for both upload & delay to finish
    await Promise.all([upload, delay]);

    setIsSuccess(true);

    // Show success for 1.5s before redirect
    setTimeout(() => {
      navigate("/email");
    }, 1500);
  } catch (error) {
    console.error("Error:", error);
    alert("Upload failed!");
    setLoading(false);
  }
};

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setIsSuccess(false);
  };

  return (
    <div style={styles.container}>
      <canvas 
        ref={canvasRef} 
        style={styles.rainCanvas}
      />
      
      <div style={styles.overlay}>
        <div style={styles.content}>
          {/* Floating particles */}
          <div style={styles.particles}>
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                style={{
                  ...styles.particle,
                  animationDelay: `${i * 0.3}s`,
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
          
          <div style={styles.card}>
            <div style={styles.header}>
              <div style={styles.titleContainer}>
                <div style={styles.iconContainer}>
                  <svg style={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <h1 style={styles.title}>Resume PDF Extractor</h1>
                <p style={styles.subtitle}>Upload your resume to extract and analyze</p>
              </div>
            </div>

            <div 
              style={{
                ...styles.dropZone,
                ...(isDragOver ? styles.dropZoneDragOver : {}),
                ...(file ? styles.dropZoneHasFile : {}),
                ...(loading ? styles.dropZoneLoading : {})
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => !loading && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={styles.fileInput}
              />

              {loading ? (
                <div style={styles.loadingContent}>
                  <div style={styles.waveContainer}>
                    <div style={styles.wave}></div>
                    <div style={styles.wave}></div>
                    <div style={styles.wave}></div>
                    <div style={styles.wave}></div>
                  </div>
                  
                  <div style={styles.progressContainer}>
                    <div style={styles.progressBar}>
                      <div 
                        style={{
                          ...styles.progressFill,
                          width: `${uploadProgress}%`
                        }}
                      />
                    </div>
                    <span style={styles.progressText}>
                      {isSuccess ? 'Upload Complete!' : `Uploading... ${Math.round(uploadProgress)}%`}
                    </span>
                  </div>
                </div>
              ) : !file ? (
                <div style={styles.dropContent}>
                  <div style={styles.cloudContainer}>
                    <svg style={styles.cloudIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z" />
                    </svg>
                    <div style={styles.raindropsContainer}>
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i}
                          style={{
                            ...styles.raindrop,
                            animationDelay: `${i * 0.2}s`,
                            left: `${20 + i * 10}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h3 style={styles.dropTitle}>Drop your PDF here</h3>
                  <p style={styles.dropText}>or click to browse files</p>
                  <div style={styles.formatInfo}>Supports: PDF files only</div>
                </div>
              ) : (
                <div style={styles.filePreview}>
                  <div style={styles.fileIconContainer}>
                    <svg style={styles.fileIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <div style={styles.fileInfo}>
                    <div style={styles.fileName}>{file.name}</div>
                    <div style={styles.fileSize}>{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                  </div>
                  <button style={styles.removeButton} onClick={removeFile}>
                    <svg style={styles.removeIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <button 
              style={{
                ...styles.uploadButton,
                ...(loading || !file ? styles.uploadButtonDisabled : {}),
                ...(isSuccess ? styles.uploadButtonSuccess : {})
              }}
              onClick={handleUpload}
              disabled={loading || !file}
            >
              {isSuccess ? (
                <>
                  <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                  </svg>
                  Success! Redirecting...
                </>
              ) : loading ? (
                <>
                  <div style={styles.spinner} />
                  Processing...
                </>
              ) : (
                <>
                  <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20V16M16,6V14L13.5,11.5L12.08,12.92L16,16.84L19.92,12.92L18.5,11.5L16,14V6Z" />
                  </svg>
                  Extract & Continue →
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4a90e2 100%)'
  },

  rainCanvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1
  },

  overlay: {
    position: 'relative',
    zIndex: 2,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },

  content: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px'
  },

  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden'
  },

  particle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },

  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '3rem',
    boxShadow: `
      0 20px 60px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    animation: 'cardSlideIn 1s ease-out',
    position: 'relative',
    overflow: 'hidden'
  },

  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },

  titleContainer: {
    position: 'relative'
  },

  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '50%',
    marginBottom: '1.5rem',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
    animation: 'iconFloat 3s ease-in-out infinite'
  },

  icon: {
    width: '40px',
    height: '40px',
    color: 'white'
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    margin: '0 0 0.5rem 0',
    fontFamily: "'Segoe UI', sans-serif"
  },

  subtitle: {
    color: '#64748b',
    fontSize: '1.1rem',
    margin: 0,
    fontWeight: '500'
  },

  dropZone: {
    border: '3px dashed #cbd5e1',
    borderRadius: '20px',
    padding: '4rem 2rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    position: 'relative',
    marginBottom: '2rem',
    overflow: 'hidden'
  },

  dropZoneDragOver: {
    borderColor: '#667eea',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(255, 255, 255, 0.1))',
    transform: 'scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)'
  },

  dropZoneHasFile: {
    borderColor: '#10b981',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 0.1))'
  },

  dropZoneLoading: {
    borderColor: '#f59e0b',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(255, 255, 255, 0.1))',
    cursor: 'not-allowed'
  },

  fileInput: {
    display: 'none'
  },

  dropContent: {
    position: 'relative',
    zIndex: 1
  },

  cloudContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '2rem'
  },

  cloudIcon: {
    width: '100px',
    height: '100px',
    color: '#667eea',
    filter: 'drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3))',
    animation: 'cloudFloat 4s ease-in-out infinite'
  },

  raindropsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    height: '60px'
  },

  raindrop: {
    position: 'absolute',
    width: '2px',
    height: '20px',
    background: 'linear-gradient(to bottom, rgba(102, 126, 234, 0.8), transparent)',
    borderRadius: '50px',
    animation: 'raindropFall 2s ease-in infinite'
  },

  dropTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.5rem 0'
  },

  dropText: {
    color: '#64748b',
    fontSize: '1rem',
    margin: '0 0 1.5rem 0'
  },

  formatInfo: {
    display: 'inline-block',
    background: 'rgba(102, 126, 234, 0.1)',
    color: '#667eea',
    padding: '0.5rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: '500'
  },

  filePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    background: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '16px',
    padding: '2rem',
    position: 'relative',
    zIndex: 1
  },

  fileIconContainer: {
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
  },

  fileIcon: {
    width: '32px',
    height: '32px',
    color: 'white'
  },

  fileInfo: {
    flex: 1
  },

  fileName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.25rem'
  },

  fileSize: {
    color: '#64748b',
    fontSize: '0.9rem'
  },

  removeButton: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#ef4444',
    transition: 'all 0.2s ease'
  },

  removeIcon: {
    width: '20px',
    height: '20px'
  },

  loadingContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
  },

  waveContainer: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'end'
  },

  wave: {
    width: '6px',
    height: '40px',
    background: 'linear-gradient(to top, #667eea, #764ba2)',
    borderRadius: '3px',
    animation: 'wave 1.5s ease-in-out infinite'
  },

  progressContainer: {
    width: '100%',
    maxWidth: '300px',
    textAlign: 'center'
  },

  progressBar: {
    width: '100%',
    height: '8px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50px',
    overflow: 'hidden',
    marginBottom: '1rem'
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    borderRadius: '50px',
    transition: 'width 0.3s ease',
    position: 'relative'
  },

  progressText: {
    color: '#1e293b',
    fontSize: '1rem',
    fontWeight: '500'
  },

  uploadButton: {
    width: '100%',
    padding: '1.25rem 2rem',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    position: 'relative',
    overflow: 'hidden'
  },

  uploadButtonDisabled: {
    background: 'linear-gradient(135deg, #94a3b8, #64748b)',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },

  uploadButtonSuccess: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
  },

  buttonIcon: {
    width: '24px',
    height: '24px'
  },

  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Inject CSS animations
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(5px) rotate(-1deg); }
    }
    
    @keyframes cardSlideIn {
      from {
        opacity: 0;
        transform: translateY(50px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes iconFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    @keyframes cloudFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes raindropFall {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateY(60px);
      }
    }
    
    @keyframes wave {
      0%, 100% {
        transform: scaleY(1);
      }
      25% {
        transform: scaleY(0.3);
      }
      50% {
        transform: scaleY(0.8);
      }
      75% {
        transform: scaleY(0.5);
      }
    }
    
    .wave:nth-child(2) { animation-delay: 0.1s; }
    .wave:nth-child(3) { animation-delay: 0.2s; }
    .wave:nth-child(4) { animation-delay: 0.3s; }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .remove-button:hover {
      background: rgba(239, 68, 68, 0.2) !important;
      transform: scale(1.1);
    }
    
    .upload-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
    }
    
    .upload-button:active:not(:disabled) {
      transform: translateY(0px);
    }
    
    @media (max-width: 768px) {
      .card {
        padding: 2rem 1.5rem;
        margin: 1rem;
      }
      
      .title {
        font-size: 2rem;
      }
      
      .drop-zone {
        padding: 3rem 1rem;
      }
      
      .cloud-icon {
        width: 80px;
        height: 80px;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default PdfExtractor;