import React, {useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesUser from "../../routesUser";

import logo from "../../images/logo.png";
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

  const [thongtinchung, setThongtinchung] = useState("nav-item nav-item-click");
  const [thanhtoan, setThanhtoan] = useState("nav-item");
  const [yeucau, setYeucau] = useState("nav-item");
  const [thongbao, setThongbao] = useState("nav-item");

  const handleMenu = (menuItem) => {
    if (menuItem === 1) {
      setThongtinchung("nav-item nav-item-click");
      setThanhtoan("nav-item");
      setYeucau("nav-item");
      setThongbao("nav-item");
      history.push("/user/thongtinchung");
    } else if (menuItem === 2) {
      setThongtinchung("nav-item");
      setThanhtoan("nav-item nav-item-click");
      setYeucau("nav-item");
      setThongbao("nav-item");
      history.push("/user/thanhtoan");
    } else if (menuItem === 3) {
      setThongtinchung("nav-item");
      setThanhtoan("nav-item");
      setYeucau("nav-item nav-item-click");
      setThongbao("nav-item");
      history.push("/user/yeucau");
    } else if (menuItem === 4) {
      setThongtinchung("nav-item");
      setThanhtoan("nav-item");
      setYeucau("nav-item");
      setThongbao("nav-item nav-item-click");
      history.push("/user/thongbao");
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
          <i className="material-icons" id="icon-search">
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
            className="material-icons"
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
              className={thongtinchung}
              onClick={() => {
                handleMenu(1);
              }}
            >
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">person</i>
              <span className="text-nav">Thông tin chung</span>
            </li>
            <li
              className={thanhtoan}
              onClick={() => {
                handleMenu(2);
              }}
            >
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">receipt</i>
              <span className="text-nav">Thanh toán</span>
            </li>
            <li
              className={yeucau}
              onClick={() => {
                handleMenu(3);
              }}
            >
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">build</i>
              <span className="text-nav">Yêu cầu</span>
            </li>
            <li
              className={thongbao}
              onClick={() => {
                handleMenu(4);
              }}
            >
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">notifications</i>
              <span className="text-nav">Thông báo</span>
            </li>
          </ul>
        </div>
        <Switch>{showContent(routesUser)}</Switch>
      </div>
    </div>
  );
}
