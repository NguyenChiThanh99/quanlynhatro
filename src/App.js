import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import routesLogin from "./routesLogin";

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
    <Router>
      <div>
        <Switch>{showContent(routesLogin)}</Switch>
      </div>
    </Router>
  );
}

export default App;
