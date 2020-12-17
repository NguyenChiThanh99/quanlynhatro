/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesUser from "../../routesUser";

import logo from "../../images/logo.jpg";
import avatar from "../../images/avatar.png";
import avatar_nhatro from "../../images/avatar_nhatro.jpg";

export default function User() {
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

  useEffect(() => {
    handleMenu();
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

  return (
    <div>
      <div className="header">
        {/* Hiển thị logo cho header */}
        <div className="logo">
          <img id="img-logo" src={logo} alt="Logo" />
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
    </div>
  );
}
