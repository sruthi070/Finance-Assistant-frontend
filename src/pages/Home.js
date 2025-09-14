import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import ReceiptUpload from "../components/ReceiptUpload";
import TransactionTable from "../components/TransactionTable";
import Graphs from "../components/Graphs";

export default function Home(){
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const loadAll = async () => {
    try {
      const u = await API.get("/auth/me"); setUser(u.data);
      const tx = await API.get("/transactions"); setTransactions(tx.data.sort((a,b)=>new Date(b.date)-new Date(a.date)));
    } catch (err) {
      console.error("Load error", err);
    }
  };

  useEffect(()=>{ loadAll(); }, []);

  const handleAdd = async (tx) => { await API.post("/transactions", tx); await loadAll(); };
  const handleRemoveLast = async () => { if (!transactions[0]) return; await API.delete(`/transactions/${transactions[0]._id}`); await loadAll(); };
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      await loadAll();
    } catch (err) {
      console.error("Delete failed", err);
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  return (
    <div>
      <Navbar user={user} />
      <div className="page">
        <div className="hero">
          <h1 className="welcome-title typing">WELCOME BACK!!</h1>
          <p className="welcome-sub typing">Let's track your budget together</p>
        </div>

        <div className="two-col">
          <TransactionForm onAdd={handleAdd} onRemoveLast={handleRemoveLast}/>
          <ReceiptUpload onAdded={loadAll}/>
        </div>

        <Graphs transactions={transactions}/>
        <TransactionTable transactions={transactions} onDelete={handleDelete}/>
      </div>
    </div>
  );
}
