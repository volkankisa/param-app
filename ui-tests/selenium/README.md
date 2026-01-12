## UI Test Automation (Selenium)

### Prerequisites
- Node.js
- Google Chrome
- Backend must be running on http://localhost:3000
- UI must be served via Live Server

### How to Run
1. Start backend:
   cd param-backend
   npm start

2. Open index.html with Live Server

3. Run Selenium test:
   cd ui-tests/selenium
   npm install
   node seleniumTest.js

### Notes
- A short delay is added for visual verification during demo
- Test may fail if UI elements are not available
