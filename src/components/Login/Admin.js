/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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

  const [menu, setMenu] = useState({
    daytro: "nav-item nav-item-click",
    phongtro: "nav-item",
    nguoi: "nav-item",
    thongke: "nav-item",
    yeucau: "nav-item",
    thongbao: "nav-item",
    dichvu: "nav-item",
  });

  useEffect(() => {
    handleMenu();
    return () => {
      handleMenu();
    };
  }, [window.location.pathname]);

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
      })
    } else if (window.location.pathname.indexOf("quanlyphongtro") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item nav-item-click",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item",
      })
    } else if (window.location.pathname.indexOf("quanlynguoi") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item nav-item-click",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item",
      })

    } else if (window.location.pathname.indexOf("thongke") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item nav-item-click",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item",
      })

    } else if (window.location.pathname.indexOf("yeucau") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item nav-item-click",
        thongbao: "nav-item",
        dichvu: "nav-item",
      })
    } else if (window.location.pathname.indexOf("thongbao") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item nav-item-click",
        dichvu: "nav-item",
      })
    } else if (window.location.pathname.indexOf("dichvu") !== -1) {
      setMenu({
        daytro: "nav-item",
        phongtro: "nav-item",
        nguoi: "nav-item",
        thongke: "nav-item",
        yeucau: "nav-item",
        thongbao: "nav-item",
        dichvu: "nav-item nav-item-click",
      })
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
    </div>
  );
}
