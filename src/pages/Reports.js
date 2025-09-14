import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";

function groupBy(transactions, keyFn) {
  const map = {};
  transactions.forEach(tx => {
    const key = keyFn(tx);
    if (!map[key]) map[key] = { value: 0 };
    map[key].value += (tx.type === "expense") ? -tx.amount : tx.amount;
  });
  return Object.keys(map).sort().map(k => ({ name: k, value: map[k].value }));
}

export default function Reports() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState("daily");

  useEffect(() => {
    (async () => {
      const u = await API.get("/auth/me"); setUser(u.data);
      const tx = await API.get("/transactions"); setTransactions(tx.data);
    })();
  }, []);

  const daily = groupBy(transactions, tx => {
    const d = new Date(tx.date);
    return `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0"+d.getDate()).slice(-2)}`;
  });
  const monthly = groupBy(transactions, tx => {
    const d = new Date(tx.date);
    return `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}`;
  });
  const yearly = groupBy(transactions, tx => (new Date(tx.date)).getFullYear());

  const data = view === "daily" ? daily : view === "monthly" ? monthly : yearly;

  return (
    <div>
      <Navbar user={user}/>
      <div className="page">
        <h1 className="page-title">Reports</h1>

        <div className="card">
          <div className="card-header">
            <h3>Performance Overview</h3>
            <select value={view} onChange={e=>setView(e.target.value)}>
              <option value="daily">Per Day</option>
              <option value="monthly">Per Month</option>
              <option value="yearly">Per Year</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            {view === "daily" ? (
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <XAxis dataKey="name" /><YAxis /><Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563EB" dot={false}/>
              </LineChart>
            ) : (
              <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <XAxis dataKey="name" /><YAxis /><Tooltip />
                <Bar dataKey="value" fill="#7B61FF" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <h3>Transaction History</h3>
          <table className="tx-table big">
            <thead>
              <tr><th>Date</th><th>Type</th><th>Category</th><th>Description</th><th>Amount</th></tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx._id} className={tx.type === "expense" ? "row-expense" : "row-income"}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.type}</td>
                  <td>{tx.category}</td>
                  <td>{tx.description || "-"}</td>
                  <td>₹ {tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
