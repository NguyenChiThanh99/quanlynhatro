import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import routesUser from "../../routesUser";

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
  return (
    <div>
      <h3>User</h3>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/user/thongtinchung");
        }}
      >
        Thong tin chung
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/user/thanhtoan");
        }}
      >
        Thanh toan
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/user/yeucau");
        }}
      >
        Yeu cau
      </button>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/user/thongbao");
        }}
      >
        Thong bao
      </button>
      <Switch>{showContent(routesUser)}</Switch>
    </div>
  );
}
