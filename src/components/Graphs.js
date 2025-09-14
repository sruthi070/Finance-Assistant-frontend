import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Legend, LineChart, Line, Cell
} from "recharts";

/* utility to group by a string key */
function groupBy(transactions, keyFn) {
  const map = {};
  transactions.forEach(tx => {
    const key = keyFn(tx);
    if (!map[key]) map[key] = { income: 0, expense: 0 };
    if (tx.type === "income") map[key].income += tx.amount;
    else map[key].expense += tx.amount;
  });
  // return array with totals and net
  return Object.keys(map).sort().map(k => ({ name: k, income: map[k].income, expense: map[k].expense, net: map[k].income - map[k].expense }));
}

export default function Graphs({ transactions }) {
  const daily = useMemo(() => groupBy(transactions, tx => {
    const d = new Date(tx.date);
    return `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0"+d.getDate()).slice(-2)}`;
  }), [transactions]);

  const monthly = useMemo(() => groupBy(transactions, tx => {
    const d = new Date(tx.date);
    return `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}`;
  }), [transactions]);

  const yearly = useMemo(() => groupBy(transactions, tx => (new Date(tx.date)).getFullYear()), [transactions]);

  const byCategory = useMemo(() => {
    const map = {};
    transactions.forEach(tx => {
      if (!map[tx.category]) map[tx.category] = { value: 0 };
      map[tx.category].value += (tx.type === "expense") ? tx.amount : -tx.amount;
    });
    return Object.keys(map).map(k => ({ name: k, value: Math.abs(map[k].value) }));
  }, [transactions]);

  const totalIncome = transactions.filter(t=>t.type==="income").reduce((a,b)=>a+b.amount,0);
  const totalExpense = transactions.filter(t=>t.type==="expense").reduce((a,b)=>a+b.amount,0);

  // Layout: 3 top cards, 2 bottom (grid via CSS)
  return (
    <div className="graphs">
      <div className="card">
        <h3 className="card-title">Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={[
                { name: "Income", value: totalIncome },
                { name: "Expense", value: totalExpense }
              ]}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {/* Assign green for Income, red for Expense */}
              <Cell key="income" fill="#16A34A" /> {/* Green */}
              <Cell key="expense" fill="#DC2626" /> {/* Red */}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="card-title">Daily (Net)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={daily} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="net" stroke="#2563EB" dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="card-title">Monthly (Income vs Expense)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" stackId="a" fill="#16A34A" />
            <Bar dataKey="expense" stackId="a" fill="#DC2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="card-title">Yearly (Net)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={yearly} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="net">
              {yearly.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    [
                      "#16A34A", // green
                      "#DC2626", // red
                      "#2563EB", // blue
                      "#F59E42", // orange
                      "#7B61FF", // purple
                      "#FACC15", // yellow
                      "#14B8A6", // teal
                      "#F472B6", // pink
                      "#64748B", // slate
                      "#A3E635"  // lime
                    ][index % 10]
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="card-title">By Category</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={byCategory}
              dataKey="value"
              nameKey="name"
              outerRadius={55}
              label
            >
              {byCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    [
                      "#16A34A", // green
                      "#DC2626", // red
                      "#2563EB", // blue
                      "#F59E42", // orange
                      "#7B61FF", // purple
                      "#FACC15", // yellow
                      "#14B8A6", // teal
                      "#F472B6", // pink
                      "#64748B", // slate
                      "#A3E635"  // lime
                    ][index % 10]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
