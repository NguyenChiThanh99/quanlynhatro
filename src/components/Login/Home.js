import React from "react";
import { useHistory } from "react-router-dom";

import logo from '../../images/logo.jpg';

export function Home() {
  let history = useHistory();
  return (
    <div className="login">
      <div className="header">
        <div className="logo">
          <img id="img-logo" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="body">
        <div className="formlogin">
          <p className="title">TRANG QUẢN LÝ NHÀ TRỌ CỦA BẠN</p>
          <div className="form">
            <p className="dangnhap">ĐĂNG NHẬP</p>
            <div className="input" style={{ marginBottom: "24px" }}>
              <input className="inputtext" type="text" placeholder="Email" />
              <span className="material-icons icon">person</span>
            </div>
            <div className="input" style={{ marginBottom: "8px" }}>
              <input
                className="inputtext"
                type="password"
                placeholder="Mật khẩu"
              />
              <span className="material-icons icon">lock</span>
            </div>
            <div className="quenmatkhau">
              <span className="material-icons icon2">help</span>
              <p className="quenmktext">Quên mật khẩu</p>
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: 20,
              }}
            >
              <div className="box-btn">
                <div className="btn2"> </div>
                <button className="btn">Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <h3>Login</h3>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin");
    //     }}
    //   >
    //     Admin
    //   </button>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/user");
    //     }}
    //   >
    //     User
    //   </button>
    // </div>
  );
}
export default Home;
