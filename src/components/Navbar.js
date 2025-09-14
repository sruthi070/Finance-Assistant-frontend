import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-pill">BB</div>
        <div className="logo-text">Budget Buddy</div>
      </div>

      <nav className="navbar-right">
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <NavLink to="/reports" className="nav-link">Reports</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>

        <div className="user-info">
          <div className="avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
          <div className="user-meta">
            <div className="user-name">{user?.name || "User"}</div>
            <div className="user-email">{user?.email || ""}</div>
          </div>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </nav>
    </header>
  );
}
