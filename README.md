# Customer Management App

A full-stack application to manage customers and their addresses, built with **Node.js**, **Express**, and **SQLite** for the backend, and a **React.js** frontend.

---

## 🛠 Tech Stack

**Backend:**
- Node.js
- Express
- SQLite3
- REST API

**Frontend:**
- React.js (create-react-app)
- HTML, CSS, JS



# Project Structure

customer-management-app/
│
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CustomerForm/
│   │   │   │   ├── CustomerFormPage.js
│   │   │   │   └── CustomerFormPage.css
│   │   │   ├── CustomerList/
│   │   │   │   ├── CustomerListPage.js
│   │   │   │   └── CustomerListPage.css
│   │   │   └── CustomerDetails/
│   │   │       ├── CustomerDetailsPage.js
│   │   │       └── CustomerDetailsPage.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── server/                     # Node.js backend
│   ├── controllers/
│   │   ├── customerController.js
│   │   └── addressController.js
│   ├── models/
│   │   ├── Customer.js
│   │   └── Address.js
│   ├── routes/
│   │   ├── customerRoutes.js
│   │   └── addressRoutes.js
│   ├── middleware/
│   │ 
│   ├── db.js                   # Database connection (Sequelize)
│   ├── app.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json 
