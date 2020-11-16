import React from "react";

import NotFound from "./components/Login/NotFound";
import QuanLyDayTro from "./components/Admin/QuanLyDayTro";
import QuanLyPhongTro from "./components/Admin/QuanLyPhongTro";
import QuanLyNguoi from "./components/Admin/QuanLyNguoi";
import ThongKe from "./components/Admin/ThongKe";
import YeuCau from "./components/Admin/YeuCau";
import ThongBao from "./components/Admin/ThongBao";
import DayTro from "./components/Admin/DayTro"
import DayTroDetail from "./components/Admin/DayTroDetail"
import PhongTro from "./components/Admin/PhongTro"
import NguoiThue from "./components/Admin/NguoiThue"

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
        path: '/admin/quanlydaytro/daytro',
        exact: true,
        main: () => <DayTro />
    },
    {
        path: '/admin/quanlydaytro/daytro/daytrodetail',
        exact: false,
        main: () => <DayTroDetail />
    },
    {
        path: '/admin/quanlydaytro/daytro/phongtro',
        exact: true,
        main: () => <PhongTro />
    },
    {
        path: '/admin/quanlydaytro/daytro/phongtro/nguoithue',
        exact: false,
        main: () => <NguoiThue />
    },
    {
        path: '/admin/quanlyphongtro',
        exact: true,
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
