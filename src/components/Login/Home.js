import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h3>Login</h3>
      <button type="button" class="btn btn-dark">
        <NavLink exact className="nav-link" to="/admin">
          Admin
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/user">
          User
        </NavLink>
      </button>
    </div>
  );
}
