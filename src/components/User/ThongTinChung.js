import React, { useState } from "react";

import avatar from "../../images/avatar.png";

export default function ThongTinChung() {
  const [menu, setMenu] = useState({
    canhan: "",
    otro: "none",
    thanhvien: "none",
  });

  return (
    <div className="thongtinchung">
      <div className="row">
        {/* mấy cái class click là khi người dùng nhấn vào nó thay đổi */}
        <div
          className={menu.canhan !== "none" ? "option option-click" : "option"}
          onClick={() => {
            setMenu({ canhan: "", otro: "none", thanhvien: "none" });
          }}
        >
          <h3
            className={
              menu.canhan !== "none"
                ? "option-title option-title-click"
                : "option-title"
            }
          >
            Thông tin cá nhân
          </h3>
        </div>
        <div
          className={menu.otro !== "none" ? "option option-click" : "option"}
          onClick={() => {
            setMenu({ canhan: "none", otro: "", thanhvien: "none" });
          }}
        >
          <h3
            className={
              menu.otro !== "none"
                ? "option-title option-title-click"
                : "option-title"
            }
          >
            Thông tin ở trọ
          </h3>
        </div>
        <div
          className={
            menu.thanhvien !== "none" ? "option option-click" : "option"
          }
          onClick={() => {
            setMenu({ canhan: "none", otro: "none", thanhvien: "" });
          }}
        >
          <h3
            className={
              menu.thanhvien !== "none"
                ? "option-title option-title-click"
                : "option-title"
            }
          >
            Thông tin thành viên
          </h3>
        </div>
      </div>

      <div className="background" style={{ height: '72vh', overflowY: 'scroll' }}>
        {/* Màn hình ở phần thông tin cá nhân*/}
        <div className="option-ca-nhan" style={{ display: menu.canhan }}>
          <div className="box-avatar">
            <img src={avatar} className="avatar" alt="Avatar" />
            <div className="display-flex">
              <i
                className="material-icons-round"
                id="icon-edit"
                style={{ fontSize: "22px" }}
              >
                edit
              </i>
              <p className="text-change-avatar">Thay đổi ảnh</p>
            </div>
          </div>
          <div className="box-thongtin">
            <p id="user-name">Nguyễn Đoàn Duy Nhựt</p>
            {/* 1 dòng chứa 3 thông tin*/}
            <div className="box-thongtin-row">
              <div className="row-item">
                <p className="item-title">Ngày sinh</p>
                <p className="item-infor">04/05/1999</p>
              </div>
              <div className="row-item">
                <p className="item-title">Giới tính</p>
                <p className="item-infor">Nam</p>
              </div>
              <div className="row-item">
                <p className="item-title">Nghề nghiệp</p>
                <p className="item-infor">Tổng giám đốc</p>
              </div>
              <div className="row-item">
                <p className="item-title" style={{ whiteSpace: "nowrap" }}>
                  Số điện thoại
                </p>
                <p className="item-infor">09391294944</p>
              </div>
              <div className="row-item">
                <p className="item-title">Email</p>
                <p className="item-infor">ahihi@gmail.com</p>
              </div>
              <div className="row-item">
                <p className="item-title">CMND/CCCD</p>
                <p className="item-infor">094922985739</p>
              </div>
            </div>
            <div className="row-item2">
              <p className="item-title">Địa chỉ</p>
              <p className="item-infor">Quận nào đó Thành phố Hồ chí minh</p>
            </div>

            <div className="btn-edit-infor">
              {/* Compoent button */}
              <div className="box-btn">
                <div className="btn2"></div>
                <button className="btn">
                  <i className="material-icons-round" id="icon-btn">
                    add_circle
                  </i>
                  Sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*Màn hình ở phần thông tin ở trọ */}
        <div className="option-o-tro" style={{ display: menu.otro }}>
          <div className="box-thong-tin-o-tro">
            <div className="box-column">
              <div className="column-title">
                <p className="item-title">Phòng trọ</p>
                <p className="item-title">Dãy trọ</p>
                <p className="item-title">Ngày đăng ký</p>
                <p className="item-title">Ngày bắt đầu</p>
                <p className="item-title">Thời gian đã ở</p>
                <p className="item-title">Tiền cọc</p>
              </div>
              <div className="column-infor">
                <p className="item-infor">Phòng A</p>
                <p className="item-infor">Dãy A</p>
                <p className="item-infor">23/12/2099</p>
                <p className="item-infor">04/05/1999</p>
                <p className="item-infor">4 tháng</p>
                <p className="item-infor">2.000.000 đ</p>
              </div>
            </div>
          </div>
          <div className="thong-tin-phong">
            <p id="title-phong">Thông tin phòng A1</p>
            <div className="box-thongtin-row2">
              <div className="row-item3">
                <p className="item-title2">Diện tích</p>
                <p className="item-infor2">
                  22 m<sup style={{ fontSize: "12px" }}>2</sup>
                </p>
              </div>
              <div className="row-item3">
                <p className="item-title2">Tiền phòng</p>
                <p className="item-infor2">4.000.000 đ</p>
              </div>
              <div className="row-item3">
                <p className="item-title2">Gác</p>
                <i
                  className="material-icons-round"
                  id="icon-edit"
                  style={{ fontSize: "24px" }}
                >
                  check
                  {/* close */}
                </i>
              </div>
              <div className="row-item3">
                <p className="item-title2">Thiết bị</p>
                <p className="item-infor2">Tử lạnh, máy giặt, máy sấy</p>
              </div>
            </div>
          </div>
        </div>

        {/*Màn hình ở phần thông tin thành viên */}
        <div className="option-thanh-vien" style={{ display: menu.thanhvien }}>
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <th className="sort">
                    <p className="sort_text">Tên</p>
                    <span
                      className="material-icons-round icon"
                      style={{ fontSize: "22px" }}
                    >
                      arrow_downward
                    </span>
                  </th>
                  <th>
                    <p>Ngày sinh</p>
                  </th>
                  <th>
                    <p>Số điện thoại</p>
                  </th>
                  <th>
                    <p>Email</p>
                  </th>
                  <th>
                    <p>Nghề nghiệp</p>
                  </th>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{alignItems: 'center', display: "flex"}}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
