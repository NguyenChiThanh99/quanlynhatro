import React from "react";

import QuanLyDayTro from "./components/Admin/QuanLyDayTro";
import QuanLyPhongTro from "./components/Admin/QuanLyPhongTro";
import QuanLyNguoi from "./components/Admin/QuanLyNguoi";
import ThongKe from "./components/Admin/ThongKe";
import YeuCau from "./components/Admin/YeuCau";
import ThongBao from "./components/Admin/ThongBao";
import NotFound from "./components/Login/NotFound";

const routesAdmin = [
    {
        path: '/admin/',
        exact: true,
        main: () => <QuanLyDayTro />
    },
    {
        path: '/admin/quanlydaytro',
        exact: true,
        main: () => <QuanLyDayTro />
    },
    {
        path: '/admin/quanlyphongtro',
        exact: false,
        main: () => <QuanLyPhongTro />
    },
    {
        path: '/admin/quanlynguoi',
        exact: false,
        main: () => <QuanLyNguoi />
    },
    {
        path: '/admin/thongke',
        exact: false,
        main: () => <ThongKe />
    },
    {
        path: '/admin/yeucau',
        exact: false,
        main: () => <YeuCau />
    },
    {
        path: '/admin/thongbao',
        exact: false,
        main: () => <ThongBao />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    },
];

export default routesAdmin;
