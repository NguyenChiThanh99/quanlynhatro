import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import routesAdmin from "../../routesAdmin";

export default function Admin() {
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
        <NavLink className="nav-link" to="/admin/quanlydaytro">
          Quan ly Day tro
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/admin/quanlyphongtro">
          Quan ly Phong tro
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/admin/quanlynguoi">
          Quan ly Nguoi
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/admin/thongke">
          Thong ke
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/admin/yeucau">
          Yeu cau
        </NavLink>
      </button>
      <button type="button" class="btn btn-dark">
        <NavLink className="nav-link" to="/admin/thongbao">
          Thong bao
        </NavLink>
      </button>
      <Switch>{showContent(routesAdmin)}</Switch>
    </div>
  );
}
