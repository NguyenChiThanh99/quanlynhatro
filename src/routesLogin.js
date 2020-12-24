import React from "react";

import Home from "./components/Login/Home";
import Admin from "./components/Login/Admin";
import User from "./components/Login/User";
import ForgotPassword from "./components/Login/ForgotPassword";
import NotFound from "./components/Login/NotFound";

const routesLogin = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/admin',
        exact: false,
        main: () => <Admin />
    },
    {
        path: '/user',
        exact: false,
        main: () => <User />
    },
    {
        path: '/forgotpassword',
        exact: false,
        main: () => <ForgotPassword />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    },
];

export default routesLogin;
