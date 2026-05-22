Customer Management App

A full-stack Customer Management Application built using modern web technologies. This application helps businesses manage customer details efficiently with features like adding, updating, deleting, and viewing customer records.

🚀 Features
Add new customers
View all customer details
Update customer information
Delete customer records
REST API integration
Responsive UI
Form validation
Database storage
Clean folder structure
🛠️ Tech Stack
Frontend
React.js
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Database
MySQL
Tools & Packages
Sequelize ORM
Axios
React Router DOM
Postman
VS Code
📂 Project Structure
customer-management-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/customer-management-app.git
2️⃣ Backend Setup

Navigate to backend folder:

cd backend

Install dependencies:

npm install

Start backend server:

npm start

Server runs on:

http://localhost:5000
3️⃣ Database Setup

Create a MySQL database:

CREATE DATABASE customer_management;

Update database configuration inside:

backend/config/config.json

Example:

{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "customer_management",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
4️⃣ Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start React application:

npm start

Application runs on:

http://localhost:3000
📌 API Endpoints
Method	Endpoint	Description
GET	/customers	Get all customers
GET	/customers/:id	Get customer by ID
POST	/customers	Add new customer
PUT	/customers/:id	Update customer
DELETE	/customers/:id	Delete customer
🖥️ Screenshots
Home Page
Displays customer list
Search and actions
Add Customer
Form to create new customer
Edit Customer
Update customer details
🔥 Future Enhancements
Authentication & Authorization
Pagination
Search & Filter
Export to Excel/PDF
Dashboard Analytics
Dark Mode
👨‍💻 Author

Suresh SR

LinkedIn: LinkedIn Profile
GitHub: GitHub Profile
📄 License

This project is licensed under the MIT License.

⭐ Support

If you like this project, give it a ⭐ on GitHub and share it with others.
