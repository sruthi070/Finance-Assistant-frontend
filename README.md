# Budget Buddy – Personal Finance Assistant
Budget Buddy is a full-stack web app that helps users **track expenses, incomes, and receipts** with beautiful dashboards and reports. 
## Backend code repo: <a href="https://github.com/sruthi070/Finance-Assistant-backend">Finance-Assistant-backend</a>
Access website here: <a href="https://budget-buddy-sruthi.netlify.app/">Live link</a>

Demo: <a href="https://drive.google.com/drive/folders/1VuqnYvY0ZT_ngB7JdL3BRY2wppcVAJRm?usp=drive_link">Budget-Buddy-Demo</a>

**sample credentials**:
- mail: user@gmail.com
- password: 123

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
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/c2c93ad9-ae7a-481d-b131-b7b50758d7fa" />
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/da703051-41bd-4ced-955c-b81ffcec39ed" />
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/8a6e2e8e-9740-416f-af03-179df31bbe07" />
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/e271783d-0043-49ec-b3cc-b9705fadca45" />
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/0d119b24-b27f-49c6-b089-48a0e0cc9dd5" />

## Future Improvements
- Real OCR for receipts
- Export reports as CSV/PDF
- Budget goal tracking & alerts
## 👩‍💻 Author
Made with ❤️ by Sruthi
