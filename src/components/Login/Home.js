import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import {useDispatch} from 'react-redux';

import Global from "../Global";
import {updateID} from '../../actions';
import Notification from '../Notification';

import logo from "../../images/logo.jpg";

export function Home() {
  let history = useHistory();
  const dispatch = useDispatch();

  const login = () => {
    const data = {
      email: input.email,
      password: input.password,
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
        if (res.data.status === false) {
          setError(res.data.message)
        } else {
          dispatch(updateID({user: res.data}));
          if (res.data.user.role === "User") {
            history.push("/user");
          } else {
            history.push("/admin");
          }
        }
      })
      .catch((error) => {});
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      login()
    }
  }

  const [error, setError] = useState("")
  const [input, setInput] = useState({
    email: "",
    password: "",
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
    <div className="login" onKeyDown={handleKeyDown}>
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
              <input className="inputtext" type="email" placeholder="Email" name="email"
                value={input.email}
                onChange={onChange}/>
              <span className="material-icons icon">person</span>
            </div>
            <div className="input" style={{ marginBottom: "8px" }}>
              <input
                className="inputtext"
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={input.password}
                onChange={onChange}
              />
              <span className="material-icons icon">lock</span>
            </div>
            <div className="quenmatkhau" onClick={() => history.push("/forgotpassword")}>
              <span className="material-icons icon2">help</span>
              <p className="quenmktext">Quên mật khẩu</p>
            </div>
            {error !== "" ? (<Notification type="error" content={error} />) : null}
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
  );
}
export default Home;
