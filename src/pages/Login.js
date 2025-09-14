import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back to Budget Buddy</h2>
        <form onSubmit={submit} className="auth-form">
          <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          <button className="btn primary">Login</button>
        </form>
        <p className="auth-switch">New user? <Link to="/register">Create account</Link></p>
      </div>
    </div>
  );
}
