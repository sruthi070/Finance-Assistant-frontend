import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      // After register backend returns token; store it and go home
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        nav("/");
      } else {
        alert("Registered. Please login.");
        nav("/login");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Your Budget Buddy Account</h2>
        <form onSubmit={submit} className="auth-form">
          <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          <button className="btn primary">Register</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}
