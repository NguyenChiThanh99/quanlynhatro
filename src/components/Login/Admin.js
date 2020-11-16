import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesAdmin from "../../routesAdmin";

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
      <h3>Admin</h3>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/quanlydaytro");
        }}
      >
        Quan ly Day tro
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/quanlyphongtro");
        }}
      >
        Quan ly Phong tro
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/quanlynguoi");
        }}
      >
        Quan ly Nguoi
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/thongke");
        }}
      >
        Thong ke
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/yeucau");
        }}
      >
        Yeu cau
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/thongbao");
        }}
      >
        Thong bao
      </button>
      <Switch>{showContent(routesAdmin)}</Switch>
    </div>
  );
}
