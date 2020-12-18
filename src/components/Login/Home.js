import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import Global from "../Global";

import logo from "../../images/logo.jpg";

export function Home() {
  let history = useHistory();
  const login = () => {
    const data = {
      email: "nguyenchithanh1999@gmail.com",
      password: "d41nhh",
    };
    const url = Global.server + "user/login";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  };

  const testAPI = () => {
    const data = {
      userId: "5fc495448178f40024971f30",
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJVc2VyIiwiZmlyc3Rsb2dpbiI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9pZCI6IjVmZGFmZmRhYzZhZDY5MDAyNGM2OTY5YiIsImVtYWlsIjoibmd1eWVuY2hpdGhhbmgxOTk5QGdtYWlsLmNvbSIsIm5hbWUiOiJOZ3V54buFbiBDaMOtIFRoYW5oIiwicGhvbmUiOiIwODM0OTk5MzczIiwiYWRkcmVzcyI6IkvDvSB0w7pjIHjDoSBraHUgQSwgVFAuSENNIiwiY21uZCI6IjMwMTY2MjIyMiIsImJpcnRoZGF5IjoiMTk5OS0xMi0wMlQwMDowMDowMC4wMDBaIiwiZ2VuZGVyIjoiTWFsZSIsImF2YXRhciI6IkFkYWRhIiwiam9iIjoiU2luaCB2acOqbiIsInN0YXJ0RGF0ZSI6IjIwMjAtMTItMTBUMDA6MDA6MDAuMDAwWiIsInByaWNlIjo1MDAwMDAwLCJibG9jayI6IjVmZDJjZWE3ZDVlNGM5MzcxMDA5Y2ZmZSIsInJvb20iOiI1ZmRhMjlmM2M4NjVlMDNmMDA5YWM0NGQiLCJwYXNzd29yZCI6IiQyYSQxMCRpMTl1emJvbTNsSGlBWm5HTEFoU0F1bnhtRVNXajJ4WEdUbmF4d000azhkclQ5S0ltaGYubSIsImNyZWF0ZWRBdCI6IjIwMjAtMTItMTdUMDY6NTE6MDYuNzk2WiIsInVwZGF0ZUF0IjoiMjAyMC0xMi0xN1QwNjo1MTowNi43OTZaIiwiX192IjowfSwiaWF0IjoxNjA4MzAzMTI2LCJleHAiOjE2MDgzMDQ5MjZ9.RzDK8YBw6EO-or3GqspfKg98z0o19npHjEUnQpzV-NY";
    const url = Global.server + "service/getservicebyadminid";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url,
      data: qs.stringify(data),
    };
    axios(options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  };

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
            <p className="dangnhap" onClick={() => {testAPI()}}>ĐĂNG NHẬP</p>
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
                <button
                  className="btn"
                  onClick={() => {
                    login();
                  }}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container">
    //   <h3>Login</h3>
    //
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
