# Budget Buddy – Personal Finance Assistant
Budget Buddy is a full-stack web app that helps users **track expenses, incomes, and receipts** with beautiful dashboards and reports.  
## ✨ Features
- 🔐 User **registration & login** with JWT authentication    
- ➕ Add income/expense manually (type, amount, date, category, description)  
- 📷 Extract expenses from uploaded receipts.
- 📊 Reports with clear charts:
  - Daily, monthly, yearly
  - Expenses by category
  - Income vs Expense (different colors)  
- 👤 Profile page with user details + transaction history  
- 🗑️ Delete transactions (updates reports in real-time)  
## 🛠️ Tech Stack
- **Frontend:** React,CSS  
- **Backend:** Node.js, Express.js, JWT Auth  
- **Database:** MongoDB Atlas   
## 📂 Project Structure
```text
Finance_Assistant/
│
├── backend/                  # Express + MongoDB backend
│   ├── src/
│   │   ├── index.js          # Server entry point
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express routes (auth, transactions)
│   │   ├── controllers/      # Business logic
│   │   └── middleware/       # JWT middleware
│   ├── package.json
│   └── .env.example
│
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/       # Login, Register, Dashboard, Reports…
│   │   ├── services/         # Axios API service
│   │   └── App.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```
## API Endpoints
### Auth
- POST /api/auth/register → Register new user
- POST /api/auth/login → Login user, return JWT
- GET /api/auth/me → Get current user profile
### Transactions
- GET /api/transactions → List all transactions
- POST /api/transactions → Add transaction
- DELETE /api/transactions/:id → Delete transaction
- POST /api/transactions/upload → Upload receipt
## 📸 Screenshots
## Future Improvements
- Real OCR for receipts
- Export reports as CSV/PDF
- Budget goal tracking & alerts
## 👩‍💻 Author
Made with ❤️ by Sruthi
