import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import routesUser from "../../routesUser";

export default function User() {
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
      <h3>Admin</h3>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/user/thongtinchung">
          Thong tin chung
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/user/thanhtoan">
          Thanh toan
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/user/yeucau">
          Yeu cau
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/user/thongbao">
          Thong bao
        </NavLink>
      </button>
      <Switch>{showContent(routesUser)}</Switch>
    </div>
  );
}
