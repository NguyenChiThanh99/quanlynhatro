/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesAdmin from "../../routesAdmin";
import Rodal from "rodal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import ReactLoading from "react-loading";

import "rodal/lib/rodal.css";

import Global from "../Global";
import {updateID} from '../../actions';
import Notification from '../Notification';

import logo from "../../images/logo.jpg";
import avatar from "../../images/avatar.jpeg";
import avatar_nhatro from "../../images/avatar_nhatro.jpg";

export default function Admin() {
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
    daytro: "nav-item nav-item-click",
    phongtro: "nav-item",
    nguoi: "nav-item",
    thongke: "nav-item",
    yeucau: "nav-item",
    thongbao: "nav-item",
    dichvu: "nav-item",
  });
  const [dropdown, setDropdown] = useState(false);
  const [hoverChangePass, setHoverChangePass] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.ID);

  useEffect(() => {
    handleMenu();
    checkUser();
    return () => {
      handleMenu();
    };
  }, [window.location.pathname]);

  const checkUser = () => {
    if (user.length === 0) {
      return history.push("/");
    }
    if (user.user.user.firstlogin === false) {
      setModalChangePass(true);
    }
  };

  const handleMenu = () => {
    if (window.location.pathname.indexOf("quanlydaytro") !== -1) {
      setMenu({
        daytro: "nav-item nav-item-click",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item",
      });
    } else if (window.location.pathname.indexOf("quanlyphongtro") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item nav-item-click",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item",
      });
    } else if (window.location.pathname.indexOf("quanlynguoi") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item nav-item-click",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item",
      });
    } else if (window.location.pathname.indexOf("thongke") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item nav-item-click",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item",
      });
    } else if (window.location.pathname.indexOf("yeucau") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item nav-item-click",
        thongbao: "nav-item",
        dichvu: "nav-item",
      });
    } else if (window.location.pathname.indexOf("thongbao") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item nav-item-click",
        dichvu: "nav-item",
      });
    } else if (window.location.pathname.indexOf("dichvu") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item nav-item-click",
      });
    }
  };

  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [modalChangePass, setModalChangePass] = useState(false);
  const [input, setInput] = useState({
    oldpass: "",
    newpass: "",
    newpassconfirm: "",
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

  const closeModal = () => {
    setInput({
      oldpass: "",
      newpass: "",
      newpassconfirm: "",
    });
    setModal(false);
    setError("")
  };

  const changePassword = () => {
    setLoading(true)
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
          if (res.data.message === 'Unauthorized user!') {
            closeModal()
            setLoading(false)
          } else {
            setError(res.data.message);
            setLoading(false)
          }
        } else {
          dispatch(updateID({user: {status: user.user.status, token: user.user.token, user: {...user.user.user, firstlogin: true}}}));
          setModalChangePass(false);
          closeModal();
          setLoading(false)
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="header">
        {/* Hiển thị logo cho header */}
        <div className="logo" onClick={() => history.push("/admin/quanlydaytro")}>
          <img id="img-logo" src={logo} alt="Logo" />
        </div>
        <div className="search" style={{display: 'none'}}>
          <i className="material-icons-round" id="icon-search">
            search
          </i>
          <input
            type="text"
            id="input-search"
            placeholder="Tìm trong nhà trọ..."
          />
        </div>
        <div className="account">
          <div
            className="account"
            style={{ marginRight: 0 }}
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <img id="img-avatar" src={user.length === 0 ? avatar :  user.user.user.avatar} alt="Avatar" />
            <span id="username">{user.length === 0 ? "" :  user.user.user.name}</span>
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
              className="row-dropdown"
              onClick={() => history.push("/")}
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
          <div className="title" >
            <div className="box" onClick={() => history.push("/admin/quanlydaytro")}>
              <img id="img-nhatro" src={avatar_nhatro} alt="Img Nhà trọ" />
              <span id="ten-nha-tro">Đông Dương</span>
            </div>
          </div>
          <div className="line" />
          <ul className="ul-nav">
            <li
              className={menu.daytro}
              onClick={() => {
                history.push("/admin/quanlydaytro");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">location_city</i>
              <span className="text-nav">Quản lý dãy trọ</span>
            </li>
            <li
              className={menu.phongtro}
              onClick={() => {
                history.push("/admin/quanlyphongtro");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">meeting_room</i>
              <span className="text-nav">Quản lý phòng trọ</span>
            </li>
            <li
              className={menu.nguoi}
              onClick={() => {
                history.push("/admin/quanlynguoi");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">accessibility</i>
              <span className="text-nav">Quản lý người</span>
            </li>
            <li
              className={menu.thongke}
              onClick={() => {
                history.push("/admin/thongke");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">assessment</i>
              <span className="text-nav">Thống kê</span>
            </li>
            <li
              className={menu.yeucau}
              onClick={() => {
                history.push("/admin/yeucau");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">build</i>
              <span className="text-nav">Yêu cầu</span>
            </li>
            <li
              className={menu.thongbao}
              onClick={() => {
                history.push("/admin/thongbao");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">notifications</i>
              <span className="text-nav">Thông báo</span>
            </li>
            <li
              className={menu.dichvu}
              onClick={() => {
                history.push("/admin/dichvu");
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">room_service</i>
              <span className="text-nav">Dịch vụ</span>
            </li>
          </ul>
        </div>
        <Switch>{showContent(routesAdmin)}</Switch>
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
          {error === '' ? null : (<Notification type="error" content={error} />)}
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
          {error === '' ? null : (<Notification type="error" content={error} />)}
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
