import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import Rodal from "rodal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";

import "rodal/lib/rodal.css";

import Global from "./Global";
import { updateID } from "../actions";
import Notification from "./Notification";

export default function ModalLogin(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const [modal, setModal] = useState(true);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const closeModal = () => {
    setInput({
      email: "",
      password: "",
    });
    setModal(false);
    setError("");
  };

  const login = () => {
    setLoading(true)
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
          setError(res.data.message);
          setLoading(false)
        } else {
          setLoading(false)
          closeModal();
          dispatch(updateID({ user: res.data }));
          if (res.data.user.role === "User") {
            history.push("/user/thongtinchung");
          } else {
            history.push("/admin/quanlydaytro");
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

  return (
    <Rodal
      visible={props.status && modal}
      animation={"slideUp"}
      customStyles={{
        marginTop: 50,
        width: 425,
        height: 390,
        backgroundColor: "white",
        borderRadius: 12,
      }}
      showCloseButton={false}
      onClose={() => {}}
      onKeyDown={handleKeyDown}
    >
      <div className="title-box">
        <p className="title-text">Đăng nhập</p>
      </div>
      <p
        style={{
          fontFamily: "Roboto-Light",
          marginBottom: 0,
          marginLeft: 20,
          color: "#828282",
          marginTop: 20,
        }}
      >
        Phiên hiện tại đã kết thúc, vui lòng đăng nhập lại để tiếp tục
      </p>
      <div className="model-box">
        <div className="input-box">
          <input
            type="email"
            className="model-input"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={onChange}
          />
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282" }}
          >
            person
          </span>
        </div>
        <div className="input-box">
          <input
            type="password"
            className="model-input"
            placeholder="Mật khẩu"
            name="password"
            value={input.password}
            onChange={onChange}
          />
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282" }}
          >
            lock
          </span>
        </div>

        {error === "" ? null : <Notification type="error" content={error} />}
        {loading ? (
          <div className="loading2">
            <ReactLoading
              type={"spin"}
              color={"#EE6F57"}
              height={"6%"}
              width={"6%"}
            />
          </div>
        ) : null}
        <div className="input-box">
          <div className="box-btn" onClick={() => login()}>
            <button className="btn2"></button>
            <button className="btn">Đăng nhập</button>
          </div>
        </div>
      </div>
    </Rodal>
  );
}
