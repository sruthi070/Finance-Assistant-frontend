import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TransactionTable from "../components/TransactionTable";

export default function Profile(){
  const [user,setUser] = useState(null);
  const [transactions,setTransactions] = useState([]);

  const load = async () => {
    try {
      const u = await API.get("/auth/me"); setUser(u.data);
      const tx = await API.get("/transactions"); setTransactions(tx.data);
    } catch(err) { console.error(err); }
  };

  useEffect(()=>{ load(); }, []);

  const income = transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);
  const expense = transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);
  const balance = income - expense;

  return (
    <div>
      <Navbar user={user}/>
      <div className="page profile-page">
        <h1 className="page-title">My Profile</h1>
        <div className="profile-grid">
          <div className="card">
            <h3>User Details</h3>
            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>
            <p><b>Joined:</b> {user ? new Date(user.createdAt).toLocaleDateString() : ""}</p>
          </div>
          <div className="card summary-card">
            <h3>Summary</h3>
            <p><b>Total Income:</b> ₹ {income.toLocaleString()}</p>
            <p><b>Total Expense:</b> ₹ {expense.toLocaleString()}</p>
            <p><b>Balance:</b> ₹ {balance.toLocaleString()}</p>
          </div>
        </div>

        <h3 style={{marginTop:20}}>Recent Transactions</h3>
        <TransactionTable transactions={transactions.slice(0,10)} onDelete={async(id)=>{ await API.delete(`/transactions/${id}`); load(); }} />
      </div>
    </div>
  );
}
