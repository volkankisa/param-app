# Param Event - Payment System
## 🎓 Term Project – API & UI Test Automation

This project was developed as part of the **API & UI Test Automation** course.  
It includes **manual testing**, **API test automation using Postman**, and **UI test automation using Selenium WebDriver**.

Full-stack payment application with backend API and frontend interface.

---

## 🚀 Live Demo

- **Frontend:** https://param-app-e7qs.vercel.app
- **Backend API:** https://param-app.onrender.com

---

## 📋 Postman Collection

You can use the Postman collection to test API endpoints:

👉 [Postman Collection](./postman/param-app-collection.json)

### How to Import

1. Open Postman
2. Click **Import → Upload Files**
3. Select `postman/param-app-collection.json`

### Test Scope
The Postman collection includes:
- At least 5 different API endpoints
- HTTP methods: **GET, POST, PUT, DELETE**
- Positive, negative, and edge case scenarios
- Status code validations
- Response body assertions
- Collection Runner execution support

---

## 🧪 UI Test Automation – Selenium

UI test automation is implemented using **Selenium WebDriver**.

### Scope
- Automated login scenario
- UI interaction testing (inputs, buttons, result validation)
- Integration with backend API during test execution

### How to Run UI Tests

#### Prerequisites
- Node.js
- Google Chrome
- Backend must be running on `http://localhost:3000`
- UI must be served via **Live Server**

#### Steps
1. Start backend:
   ```bash
   cd backend
   npm install
   npm start
Open frontend/index.html using Live Server in VS Code

Run Selenium test:

bash
Copy code
cd ui-tests/selenium
npm install
node seleniumTest.js
Notes
A short delay is intentionally added for visual verification during demo

Tests may fail if the backend or Live Server is not running, which is an expected behavior

🛠️ Technologies
Backend:

Node.js

Express.js

JWT Authentication

bcryptjs

Frontend:

HTML5

Vanilla JavaScript

CSS3

Test Automation:

Postman

Selenium WebDriver

Axios

Deployment:

Backend: Render

Frontend: Vercel

CI/CD:

GitHub Actions

📦 Installation
Backend
bash
Copy code
cd backend
npm install
npm start
Frontend
Open frontend/index.html using Live Server in VS Code.

📚 API Endpoints
User
POST /v1/user/register – Register user

POST /v1/user/login – User login

GET /v1/user/profile – Get user profile

DELETE /v1/user/delete – Delete user account

Wallet
GET /v1/wallet/balance – Get wallet balance

POST /v1/wallet/load – Load wallet balance

Event
POST /v1/event/pay – Make payment

🔐 Environment Variables
Create a .env file in the backend directory:

env
Copy code
PORT=3000
JWT_SECRET=your_secret_key_here
👤 Project Roles
QA Lead & Test Analyst: Manual testing, test scenarios, acceptance criteria

API Automation Engineer: Postman API test automation

UI Automation Engineer: Selenium UI test automation

SDET & Automation Support: Test executability, environment setup, automation stability

👥 Developers
Volkan Kısa
Selahattin Oktan
Doğa Özdür
Eren Efe Taşlıyurt

[Volkan Kısa](https://github.com/volkankisa)

📄 License
MIT