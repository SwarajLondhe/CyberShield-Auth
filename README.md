# 🛡️ CyberShield Auth – Secure Login System

> A next-generation cybersecurity-focused authentication system built using Node.js & Express with a futuristic hacker-style UI.

---

## 📌 Overview

CyberShield Auth is a full-stack secure authentication system designed using modern cybersecurity practices. It combines strong backend protection with a cyberpunk hacker-style terminal UI to simulate a real-world secure login environment.

This system protects against major vulnerabilities such as:
- SQL Injection
- Cross-Site Scripting (XSS)
- Brute Force Attacks
- Session Hijacking

---

## 🔐 Core Security Features

- 🔑 Password Hashing using bcrypt (12 salt rounds)
- 🚫 Anti-Brute Force Protection (5 requests / 15 min)
- 🔒 Account Lockout after 5 failed attempts (15 min lock)
- 🛡️ SQL Injection Prevention using parameterized queries
- ⚠️ XSS Protection via input sanitization
- 🍪 Secure Session Management (httpOnly cookies)

---

## 🎨 UI/UX Features

- 🖥️ Cyberpunk Terminal Design (black + neon green)
- ⚡ Typing animation effects
- 📊 Live security logs dashboard (simulation)
- 💻 Hacker-style login experience

---

## 🧰 Tech Stack

Frontend:
- HTML5
- CSS3
- JavaScript

Backend:
- Node.js
- Express.js

Database:
- SQLite

Security Libraries:
- bcrypt
- express-session
- express-rate-limit
- helmet
- csurf
- validator

---

## 📁 Project Structure

CyberShield-Auth/
│
├── public/
│   ├── css/
│   ├── js/
│
├── views/
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── routes/
├── models/
├── middleware/
├── config/
│   └── db.js
│
├── server.js
├── package.json
└── README.md

---

## 🚀 How to Run Locally

### 1. Clone Repository
git clone https://github.com/SwarajLondhe/CyberShield-Auth.git
cd CyberShield-Auth

### 2. Install Dependencies
npm install

### 3. Start Server
node server.js

### 4. Open Browser
http://localhost:3000

---

## 🔍 Security Implementation Summary

- Password Hashing ✅
- Rate Limiting ✅
- Account Lockout ✅
- SQL Injection Protection ✅
- XSS Protection ✅
- Secure Sessions ✅
- CSRF Protection ✅

---

## 💡 Future Enhancements

- 🔐 Two-Factor Authentication (2FA)
- 📧 Email Login Alerts
- 🌍 IP Tracking System
- 🤖 AI Threat Detection
- 🔑 Password Reset System

---

## 🤝 Contributing

1. Fork the repository  
2. Create new branch  
3. Commit changes  
4. Push code  
5. Open Pull Request  

---

## 📜 License

MIT License

---

## 👨‍💻 Author

Swaraj Londhe  
GitHub: https://github.com/SwarajLondhe  

---

## ⭐ Support

If you like this project:
- Star ⭐ the repo
- Fork 🍴 it
- Share 📢 with others

---

## 💬 Final Note

"Security is not a feature, it's a necessity."
