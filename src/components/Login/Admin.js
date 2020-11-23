import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesAdmin from "../../routesAdmin";

import logo from "../../images/logo.png";
import avatar from "../../images/avatar.png";
import avatar_nhatro from "../../images/avatar_nhatro.jpg"

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
            <li className="nav-item nav-item-click">
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">location_city</i>
              <span className="text-nav">Quản lý dãy trọ</span>
            </li>
            <li className="nav-item">
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">meeting_room</i>
              <span className="text-nav">Quản lý phòng trọ</span>
            </li>
            <li className="nav-item">
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">accessibility</i>
              <span className="text-nav">Quản lý người</span>
            </li>
            <li className="nav-item">
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">assessment</i>
              <span className="text-nav">Thống kê</span>
            </li>
            <li className="nav-item">
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">build</i>
              <span className="text-nav">Yêu cầu</span>
            </li>
            <li className="nav-item">
              <i className="material-icons icon-left">arrow_right</i>
              <i className="material-icons icon-right">notifications</i>
              <span className="text-nav">Thông báo</span>
            </li>
          </ul>
        </div>
        <Switch>{showContent(routesAdmin)}</Switch>
      </div>
    </div>
    // <div>
    //   <h3>Admin</h3>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/quanlydaytro");
    //     }}
    //   >
    //     Quan ly Day tro
    //   </button>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/quanlyphongtro");
    //     }}
    //   >
    //     Quan ly Phong tro
    //   </button>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/quanlynguoi");
    //     }}
    //   >
    //     Quan ly Nguoi
    //   </button>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/thongke");
    //     }}
    //   >
    //     Thong ke
    //   </button>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/yeucau");
    //     }}
    //   >
    //     Yeu cau
    //   </button>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/thongbao");
    //     }}
    //   >
    //     Thong bao
    //   </button>
    // </div>
  );
}
