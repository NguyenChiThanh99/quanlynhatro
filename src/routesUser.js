import React from "react";

import ThongTinChung from "./components/User/ThongTinChung";
import ThanhToan from "./components/User/ThanhToan";
import YeuCau from "./components/User/YeuCau";
import ThongBao from "./components/User/ThongBao";
import NotFound from "./components/Login/NotFound";

const routesUser = [
    {
        path: '/user/',
        exact: true,
        main: () => <ThongTinChung />
    },
    {
        path: '/user/thongtinchung',
        exact: true,
        main: () => <ThongTinChung />
    },
    {
        path: '/user/thanhtoan',
        exact: false,
        main: () => <ThanhToan />
    },
    {
        path: '/user/yeucau',
        exact: false,
        main: () => <YeuCau />
    },
    {
        path: '/user/thongbao',
        exact: false,
        main: () => <ThongBao />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    },
];

export default routesUser;
