import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesAdmin from "../../routesAdmin";

import logo from "../../images/logo.jpg";
import avatar from "../../images/avatar.png";
import avatar_nhatro from "../../images/avatar_nhatro.jpg";

export default function Admin() {
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

  const [daytro, setDaytro] = useState("nav-item nav-item-click");
  const [phongtro, setPhongtro] = useState("nav-item");
  const [nguoi, setNguoi] = useState("nav-item");
  const [thongke, setThongke] = useState("nav-item");
  const [yeucau, setYeucau] = useState("nav-item");
  const [thongbao, setThongbao] = useState("nav-item");

  const handleMenu = (menuItem) => {
    if (menuItem === 1) {
      setDaytro("nav-item nav-item-click");
      setPhongtro("nav-item");
      setNguoi("nav-item");
      setThongke("nav-item");
      setYeucau("nav-item");
      setThongbao("nav-item");
      history.push("/admin/quanlydaytro");
    } else if (menuItem === 2) {
      setDaytro("nav-item");
      setPhongtro("nav-item nav-item-click");
      setNguoi("nav-item");
      setThongke("nav-item");
      setYeucau("nav-item");
      setThongbao("nav-item");
      history.push("/admin/quanlyphongtro");
    } else if (menuItem === 3) {
      setDaytro("nav-item");
      setPhongtro("nav-item");
      setNguoi("nav-item nav-item-click");
      setThongke("nav-item");
      setYeucau("nav-item");
      setThongbao("nav-item");
      history.push("/admin/quanlynguoi");
    } else if (menuItem === 4) {
      setDaytro("nav-item");
      setPhongtro("nav-item");
      setNguoi("nav-item");
      setThongke("nav-item nav-item-click");
      setYeucau("nav-item");
      setThongbao("nav-item");
      history.push("/admin/thongke");
    } else if (menuItem === 5) {
      setDaytro("nav-item");
      setPhongtro("nav-item");
      setNguoi("nav-item");
      setThongke("nav-item");
      setYeucau("nav-item nav-item-click");
      setThongbao("nav-item");
      history.push("/admin/yeucau");
    } else if (menuItem === 6) {
      setDaytro("nav-item");
      setPhongtro("nav-item");
      setNguoi("nav-item");
      setThongke("nav-item");
      setYeucau("nav-item");
      setThongbao("nav-item nav-item nav-item-click");
      history.push("/admin/thongbao");
    }
  };
  return (
    <div>
      <div className="header">
        {/* Hiển thị logo cho header */}
        <div className="logo">
          <img id="img-logo" src={logo} alt="Logo" />
        </div>
        <div className="search">
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
          <img id="img-avatar" src={avatar} alt="Avatar" />
          <span id="username">Duy Nhựt</span>
          <i
            className="material-icons-round"
            style={{ paddingTop: "3px", paddingLeft: "6px", color: "#828282" }}
          >
            arrow_drop_down
          </i>
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
              className={daytro}
              onClick={() => {
                handleMenu(1);
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">location_city</i>
              <span className="text-nav">Quản lý dãy trọ</span>
            </li>
            <li
              className={phongtro}
              onClick={() => {
                handleMenu(2);
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">meeting_room</i>
              <span className="text-nav">Quản lý phòng trọ</span>
            </li>
            <li
              className={nguoi}
              onClick={() => {
                handleMenu(3);
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">accessibility</i>
              <span className="text-nav">Quản lý người</span>
            </li>
            <li
              className={thongke}
              onClick={() => {
                handleMenu(4);
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">assessment</i>
              <span className="text-nav">Thống kê</span>
            </li>
            <li
              className={yeucau}
              onClick={() => {
                handleMenu(5);
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">build</i>
              <span className="text-nav">Yêu cầu</span>
            </li>
            <li
              className={thongbao}
              onClick={() => {
                handleMenu(6);
              }}
            >
              <i className="material-icons-round icon-left">arrow_right</i>
              <i className="material-icons-round icon-right">notifications</i>
              <span className="text-nav">Thông báo</span>
            </li>
          </ul>
        </div>
        <Switch>{showContent(routesAdmin)}</Switch>
      </div>
    </div>
  );
}
