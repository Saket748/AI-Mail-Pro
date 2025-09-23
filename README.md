<div align="center">

# 📧 ResumeMailer-AI

### AI-Powered Bulk Resume Emailing System
**Revolutionize your job applications with personalized, scalable email automation**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0+-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring%20AI-Latest-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-ai)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-success?style=for-the-badge)](https://resumemailer-ai.onrender.com)

[🚀 Live Demo](https://resumemailer-ai.onrender.com) • [📖 Documentation](#documentation) • [🤝 Contributing](#contributing) • [🐛 Report Bug](https://github.com/yourusername/resumemailer-ai/issues)

</div>

---

## 🌟 Overview

**ResumeMailer-AI** transforms the job application process by combining cutting-edge AI technology with automated bulk emailing capabilities. Upload your resume and HR contact list, then let our AI generate personalized job application emails that stand out in crowded inboxes.

### 🎯 Why Choose ResumeMailer-AI?

- **Save Time**: Apply to hundreds of jobs in minutes, not hours
- **Increase Success**: AI-personalized emails get higher response rates
- **Stay Professional**: ATS-compatible resume analysis ensures your applications pass initial screenings
- **Complete Control**: Preview every email before sending

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🤖 **AI-Powered Intelligence**
- **Smart Personalization** using Google Gemini AI
- **Context-Aware** email generation
- **Professional Tone** matching

### 📊 **Data Management**
- **CSV Processing** for HR contact lists
- **Resume Analysis** with ATS compatibility check
- **Bulk Operations** at scale

</td>
<td width="50%">

### 📧 **Email Automation**
- **Gmail API Integration** for reliable delivery
- **Email Preview** before sending
- **Attachment Support** for resumes
- **Bulk Sending** capabilities

### 🔒 **Security & Privacy**
- **Google OAuth** authentication
- **Secure File Processing**
- **No Data Storage** of sensitive information

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Backend
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring_AI-6DB33F?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-ai)
[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)

### Frontend
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

### APIs & Services
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Gmail API](https://img.shields.io/badge/Gmail%20API-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](https://developers.google.com/gmail)

</div>

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
```bash
# Java Development Kit
java --version  # Should be 17+

# Node.js and npm
node --version  # Should be 18+
npm --version   # Should be 8+

git clone https://github.com/yourusername/resumemailer-ai.git
   cd resumemailer-ai

# Create .env file in root directory
   GEMINI_API_KEY=your_gemini_api_key_here
   GMAIL_CLIENT_ID=your_gmail_client_id
   GMAIL_CLIENT_SECRET=your_gmail_client_secret

# Navigate to backend directory
   cd backend
   
   # Install dependencies and run
   ./mvnw spring-boot:run

# Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm start

Frontend: http://localhost:3000
   Backend API: http://localhost:8080
```

</div>

### Step-by-Step Process:

1. **🔐 Authentication**: Login securely with your Google account
2. **📊 Data Upload**: Upload your HR contact CSV file
3. **📄 Resume Upload**: Upload your resume (PDF format)
4. **🤖 AI Processing**: Generate personalized emails using Gemini AI
5. **👀 Review**: Preview and edit emails before sending
6. **🔍 ATS Check**: (Optional) Analyze resume for ATS compatibility
7. **📧 Send**: Bulk send personalized emails with optional resume attachments

---

## 📋 CSV Format Requirements

Your HR contacts CSV should follow this structure:
```csv
name,email,company,position
John Doe,john@company.com,TechCorp,HR Manager
Jane Smith,jane@startup.co,InnovateLab,Talent Acquisition
Mike Johnson,mike@enterprise.org,BigTech,Recruiter
```
### Base-URL:

Production: https://ai-mail-pro.vercel.app/
Development: http://localhost:8080
