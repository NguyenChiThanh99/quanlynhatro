import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import Global from "../Global";
import Notification from "../Notification";

import logo from "../../images/logo.jpg";

export function Home() {
  let history = useHistory();

  const forgotPass = () => {
    const data = {
      email: input.email,
    };
    const url = Global.server + "user/forgetpassword";
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url,
      data: qs.stringify(data),
    };
    axios(options)
      .then((res) => {
        if (res.data.status === false) {
          setError(res.data.message);
        } else {
          history.push("/");
        }
      })
      .catch((error) => {});
  };

  const [error, setError] = useState("");
  const [input, setInput] = useState({
    email: "",
  });

  const onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
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
            <p className="dangnhap">QUÊN MẬT KHẨU</p>
            <p
              style={{
                fontFamily: "Roboto-Regular",
                color: "white",
                textAlign: "center",
              }}
            >
              Nhập email đã đăng ký để nhận mật khẩu mới<br />
              Mật khẩu sẽ được gửi đến email của bạn
            </p>
            <div className="input" style={{ marginBottom: "24px" }}>
              <input
                className="inputtext"
                type="email"
                placeholder="Email"
                name="email"
                value={input.email}
                onChange={onChange}
              />
              <span className="material-icons icon">person</span>
            </div>
            {error !== "" ? (
              <Notification type="error" content={error} />
            ) : null}
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
                    forgotPass();
                  }}
                >
                  Nhận lại mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
