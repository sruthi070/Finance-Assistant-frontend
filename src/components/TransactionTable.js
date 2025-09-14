import React from "react";

export default function TransactionTable({ transactions, onDelete }) {
  return (
    <div className="card">
      <h3 className="card-title">Transaction History</h3>
      <table className="tx-table">
        <thead>
          <tr>
            <th>Date</th><th>Category</th><th>Description</th><th>Type</th><th>Amount</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && <tr><td colSpan="6" className="muted">No transactions yet</td></tr>}
          {transactions.map(tx => (
            <tr key={tx._id} className={tx.type === "expense" ? "row-expense" : "row-income"}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.category}</td>
              <td>{tx.description || "-"}</td>
              <td>{tx.type}</td>
              <td>₹ {Number(tx.amount).toLocaleString()}</td>
              <td><button className="btn-icon" onClick={()=>onDelete(tx._id)} title="Delete">🗑</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
