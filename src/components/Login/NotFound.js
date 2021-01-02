import React from "react";
import { useHistory } from "react-router-dom";

import logo from "../../images/logo.jpg";
import notFound from "../../images/404.png";

export default function NotFound() {
  let history = useHistory();
  return (
    <div className="login">
      <div className="header">
        <div className="logo" onClick={() => history.push("/")}>
          <img id="img-logo" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="body">
        <div style={{marginTop: "-6vh"}}>
          <img src={notFound} style={{ height: "50vh" }} alt="Logo" />
          <p id="return-home" onClick={() => history.push("/")}>Quay về Trang chủ</p>
        </div>
      </div>
    </div>
  );
}
