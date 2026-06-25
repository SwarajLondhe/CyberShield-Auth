# 🛡️ CyberShield Auth: Secure Login System

[![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)](https://nodejs.org/)
[![Security](https://img.shields.io/badge/Security-OWASP_Top_10-blue.svg)](#)

## 📌 Overview
CyberShield Auth is a highly secure, full-stack authentication system built with Node.js and Express. It features a futuristic hacker-style terminal UI while enforcing strict backend security protocols designed to prevent common vulnerabilities like SQL Injection, XSS, and Brute Force attacks.

## 🔐 Core Security Features
* **Password Cryptography:** Passwords are never stored in plain text. They are hashed and salted using `bcrypt` (12 rounds).
* **Anti-Brute Force (Rate Limiting):** IP addresses are temporarily blocked after 5 requests per 15 minutes.
* **Account Lockout:** Users are locked out for 15 minutes after 5 consecutive failed login attempts.
* **SQL Injection Prevention:** Uses parameterized queries via the SQLite ORM to prevent malicious SQL execution.
* **XSS Mitigation:** Inputs are sanitized to prevent Cross-Site Scripting.
* **Secure Session Management:** Cookies are handled securely with `httpOnly` properties to prevent session hijacking.

## 🎨 UI/UX Features
* **Cyberpunk Terminal Aesthetic:** Dark mode, neon green text, glowing box shadows.
* **Dynamic Animations:** Real-time JavaScript typing effects for alerts and error messages.
* **Live Security Dashboard:** A simulated secure area showing live database security logs.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SwarajLondhe/CyberShield-Auth.git
   cd CyberShield-Auth
