import React from "react";
import {useHistory} from "react-router-dom";

export function Home() {
  let history = useHistory();
  return (
    <div className="container">
      <h3>Login</h3>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin");
        }}
      >
        Admin
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/user");
        }}
      >
        User
      </button>
    </div>
  );
}
export default Home;
