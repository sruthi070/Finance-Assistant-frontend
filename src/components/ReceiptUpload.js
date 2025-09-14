import React, { useState } from "react";
import API from "../services/api";

/*
 This component uploads a file to /api/transactions/upload
 Backend responds with { candidateAmounts: [numbers...] }
 We show each as an editable item (name + price) and Add button to save a transaction.
*/
export default function ReceiptUpload({ onAdded }) {
  const [file, setFile] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file");
    const fd = new FormData();
    fd.append("receipt", file);
    try {
      setLoading(true);
      const res = await API.post("/transactions/upload", fd, { headers: { "Content-Type": "multipart/form-data" }});
      const candidateAmounts = res.data.candidateAmounts || [];
      const parsedItems = candidateAmounts.map((amt, i) => ({ id: i, name: `Item ${i+1}`, price: amt }));
      setItems(parsedItems);
    } catch (err) {
      console.error("Upload error", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const updateName = (idx, name) => {
    const copy = [...items];
    copy[idx].name = name;
    setItems(copy);
  };

  const addExpense = async (item) => {
    try {
      await API.post("/transactions", {
        type: "expense",
        amount: Number(item.price),
        date: new Date().toISOString(),
        category: "Receipt",
        description: item.name
      });
      // remove item from list and call refresh
      setItems(prev => prev.filter(i => i.id !== item.id));
      onAdded();
    } catch (err) {
      console.error("Add from receipt failed", err);
      alert("Failed to add transaction");
    }
  };

  return (
    <form className="card form" onSubmit={upload}>
      <h3 className="card-title">Upload Receipt</h3>
      <input type="file" accept="image/*,application/pdf,text/*" onChange={e=>setFile(e.target.files[0])} />
      <div className="form-actions" style={{ marginTop: 12 }}>
        <button className="btn primary" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
        <button type="button" className="btn ghost" onClick={()=>{ setFile(null); setItems([]); }}>Clear</button>
      </div>

      {items.length > 0 && (
        <div className="parsed">
          <h4>Detected Items</h4>
          {items.map((item, idx) => (
            <div className="candidate" key={item.id}>
              <input value={item.name} onChange={(e)=>updateName(idx, e.target.value)} className="candidate-name" />
              <div className="candidate-price">₹ {item.price}</div>
              <button type="button" className="btn small" onClick={()=>addExpense(item)}>Add</button>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
