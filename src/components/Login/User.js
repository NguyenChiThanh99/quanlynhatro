/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesUser from "../../routesUser";
import Rodal from "rodal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";

import "rodal/lib/rodal.css";

import Global from "../Global";
import {updateID} from '../../actions';
import Notification from "../Notification";

import logo from "../../images/logo.jpg";
import avatar from "../../images/avatar.jpeg";
import avatar_nhatro from "../../images/avatar_nhatro.jpg";

export default function User() {
  const dispatch = useDispatch();
  let history = useHistory();
  function showContent(routes) {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  }

  const [menu, setMenu] = useState({
    thongtinchung: "nav-item nav-item-click",
    thanhtoan: "nav-item",
    yeucau: "nav-item",
    thongbao: "nav-item",
  });
  const user = useSelector((state) => state.ID);

  useEffect(() => {
    handleMenu();
    checkUser();
    return () => {
      handleMenu();
    };
  }, [window.location.pathname]);

  const handleMenu = () => {
    if (window.location.pathname.indexOf("thongtinchung") !== -1) {
      setMenu({
        thongtinchung: "nav-item nav-item-click",
        thanhtoan: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
      });
    } else if (window.location.pathname.indexOf("thanhtoan") !== -1) {
      setMenu({
        thongtinchung: "nav-item",
        thanhtoan: "nav-item nav-item-click",
        yeucau: "nav-item",
        thongbao: "nav-item",
      });
    } else if (window.location.pathname.indexOf("yeucau") !== -1) {
      setMenu({
        thongtinchung: "nav-item",
        thanhtoan: "nav-item",
        yeucau: "nav-item nav-item nav-item-click",
        thongbao: "nav-item",
      });
    } else if (window.location.pathname.indexOf("thongbao") !== -1) {
      setMenu({
        thongtinchung: "nav-item",
        thanhtoan: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item nav-item nav-item-click",
      });
    }
  };

  const checkUser = () => {
    if (user.length === 0) {
      return history.push("/");
    }
    if (user.user.user.firstlogin === false) {
      setModalChangePass(true);
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const [hoverChangePass, setHoverChangePass] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    oldpass: "",
    newpass: "",
    newpassconfirm: "",
  });
  const [modalChangePass, setModalChangePass] = useState(false);
  const [error, setError] = useState("");

  const changePassword = () => {
    const data = {
      email: user.user.user.email,
      password: input.oldpass,
      newpassword: input.newpass,
      newpasswordconfirm: input.newpassconfirm,
    };
    const token = user.user.token;
    const url = Global.server + "user/changepassword";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${token}`,
      },
      url,
      data: qs.stringify(data),
    };
    axios(options)
      .then((res) => {
        if (res.data.status === false) {
          if (res.data.message === "Unauthorized user!") {
            closeModal();
          } else {
            setError(res.data.message);
          }
        } else {
          dispatch(updateID({user: {status: user.user.status, token: user.user.token, user: {...user.user.user, firstlogin: true}}}));
          setModalChangePass(false);
          closeModal();
        }
      })
      .catch((error) => {});
  };

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
      oldpass: "",
      newpass: "",
      newpassconfirm: "",
    });
    setModal(false);
    setError("");
  };

  return (
    <div>
      <div className="header">
        {/* Hiển thị logo cho header */}
        <div className="logo">
          <img id="img-logo" src={logo} alt="Logo" />
        </div>
        <div className="account">
          <div
            className="account"
            style={{ marginRight: 0 }}
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <img
              id="img-avatar"
              src={user.length === 0 ? avatar : user.user.user.avatar}
              alt="Avatar"
            />
            <span id="username">
              {user.length === 0 ? "" : user.user.user.name}
            </span>
            <i
              className="material-icons-round"
              style={{
                paddingTop: "3px",
                paddingLeft: "6px",
                color: "#828282",
              }}
            >
              arrow_drop_down
            </i>
          </div>

          <div
            className="form-account"
            style={dropdown ? {} : { display: "none" }}
            onMouseEnter={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
          >
            <div
              className="row-dropdown"
              onClick={() => setModal(true)}
              style={hoverChangePass ? { background: "#EE6F57" } : {}}
              onMouseEnter={() => {
                setHoverChangePass(true);
              }}
              onMouseLeave={() => {
                setHoverChangePass(false);
              }}
            >
              <i
                className="material-icons-round"
                style={
                  hoverChangePass
                    ? {
                        color: "#fff",
                      }
                    : { color: "#828282" }
                }
              >
                vpn_key
              </i>
              <p
                className="title-dropdown"
                style={hoverChangePass ? { color: "#fff" } : {}}
              >
                Đổi mật khẩu
              </p>
            </div>
            <div
              onClick={() => history.push("/")}
              className="row-dropdown"
              style={hoverLogout ? { background: "#EE6F57" } : {}}
              onMouseEnter={() => {
                setHoverLogout(true);
              }}
              onMouseLeave={() => {
                setHoverLogout(false);
              }}
            >
              <i
                className="material-icons-round"
                style={
                  hoverLogout
                    ? {
                        color: "#fff",
                      }
                    : { color: "#828282" }
                }
              >
                power_settings_new
              </i>
              <p
                className="title-dropdown"
                style={hoverLogout ? { color: "#fff" } : {}}
              >
                Đăng xuất
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="home">
        {/* Hiện thanh nav để lựa chọn màn hình trong trang home */}
        <div className="nav">
          <div className="title">
            <div className="box">
              <img id="img-nhatro" src={avatar_nhatro} alt="Img Nhà trọ" />
              <span id="ten-nha-tro">Đông Dương</span>
            </div>
          </div>
          <div className="line" />
          <ul className="ul-nav">
            <li
              className={menu.thongtinchung}
              onClick={() => {
                history.push("/user/thongtinchung");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">person</i>
              <span className="text-nav">Thông tin chung</span>
            </li>
            <li
              className={menu.thanhtoan}
              onClick={() => {
                history.push("/user/thanhtoan");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">receipt</i>
              <span className="text-nav">Thanh toán</span>
            </li>
            <li
              className={menu.yeucau}
              onClick={() => {
                history.push("/user/yeucau");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">build</i>
              <span className="text-nav">Yêu cầu</span>
            </li>
            <li
              className={menu.thongbao}
              onClick={() => {
                history.push("/user/thongbao");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">notifications</i>
              <span className="text-nav">Thông báo</span>
            </li>
          </ul>
        </div>
        <Switch>{showContent(routesUser)}</Switch>
      </div>

      <Rodal
        visible={modal}
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
      >
        <div className="title-box">
          <p className="title-text">Đổi mật khẩu</p>
          <span
            onClick={() => closeModal()}
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "default" }}
          >
            close
          </span>
        </div>
        <div className="model-box">
          <div className="input-box">
            <input
              type="password"
              className="model-input"
              placeholder="Mật khẩu cũ"
              name="oldpass"
              value={input.oldpass}
              onChange={onChange}
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              lock
            </span>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="model-input"
              placeholder="Mật khẩu mới"
              name="newpass"
              value={input.newpass}
              onChange={onChange}
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              lock
            </span>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="model-input"
              placeholder="Nhập lại mật khẩu mới"
              name="newpassconfirm"
              value={input.newpassconfirm}
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
          <div className="input-box">
            <p className="text-huy" onClick={() => closeModal()}>
              Hủy
            </p>
            <div className="box-btn" onClick={() => changePassword()}>
              <button className="btn2"></button>
              <button className="btn">Đổi mật khẩu</button>
            </div>
          </div>
        </div>
      </Rodal>

      <Rodal
        visible={modalChangePass}
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
      >
        <div className="title-box">
          <p className="title-text">Đổi mật khẩu</p>
        </div>
        <div className="model-box">
          <div className="input-box">
            <input
              type="password"
              className="model-input"
              placeholder="Mật khẩu cũ"
              name="oldpass"
              value={input.oldpass}
              onChange={onChange}
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              lock
            </span>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="model-input"
              placeholder="Mật khẩu mới"
              name="newpass"
              value={input.newpass}
              onChange={onChange}
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              lock
            </span>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="model-input"
              placeholder="Nhập lại mật khẩu mới"
              name="newpassconfirm"
              value={input.newpassconfirm}
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
          <div className="input-box">
            <div className="box-btn" onClick={() => changePassword()}>
              <button className="btn2"></button>
              <button className="btn">Đổi mật khẩu</button>
            </div>
          </div>
        </div>
      </Rodal>
    </div>
  );
}
