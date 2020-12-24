import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routesLogin from "./routesLogin";
import { Provider } from "react-redux";

import store from './store/store';

function App() {
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
    <Provider store={store}>
      <Router>
        <div>
          <Switch>{showContent(routesLogin)}</Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
