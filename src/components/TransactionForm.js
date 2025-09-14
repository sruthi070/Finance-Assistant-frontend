import React, { useState } from "react";

export default function TransactionForm({ onAdd, onRemoveLast }) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    date: new Date().toISOString().slice(0,10),
    category: "",
    description: ""
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category) return alert("Please fill amount and category");
    onAdd({ ...form, amount: Number(form.amount) });
    setForm({ ...form, amount: "", category: "", description: "" });
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3 className="card-title">Add Transaction</h3>

      <div className="row">
        <label>
          Type
          <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label>
          Date
          <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
        </label>
      </div>

      <label>
        Amount
        <input type="number" step="0.01" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="₹ 1250" />
      </label>

      <label>
        Category
        <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g. Groceries" />
      </label>

      <label>
        Description
        <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Optional note" />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn primary">Add</button>
        <button type="button" className="btn ghost" onClick={onRemoveLast}>Remove Last</button>
      </div>
    </form>
  );
}
