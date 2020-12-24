import React, { useState } from "react";
import Rodal from "rodal";
import Dropdown from "react-dropdown";
import { useSelector } from "react-redux";

import "rodal/lib/rodal.css";

import Global from "../Global";
import ModalLogin from "../ModalLogin";

import avatar from "../../images/avatar.jpeg";

export default function ThongTinChung() {
  const [tokenStatus, setTokenStatus] = useState(false);
  const [menu, setMenu] = useState({
    canhan: "",
    otro: "none",
    thanhvien: "none",
  });
  const [birthdayIcon, setBirthdayIcon] = useState(true);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "1",
    job: "",
    birthday: "",
    cmnd: "",
  });
  const optionsGender = [
    { value: "1", label: "Nam" },
    { value: "0", label: "Nữ" },
  ];

  function onSelectGender(option) {
    setInput({ ...input, gender: option.value });
  }

  const onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const _onFocusBirthday = (e) => {
    e.currentTarget.type = "date";
    setBirthdayIcon(false);
  };
  const _onBlurBirthday = (e) => {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Ngày sinh";
    setBirthdayIcon(true);
  };

  const closeModal = () => {
    setInput({
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "1",
      job: "",
      birthday: "",
      cmnd: "",
    });
    setModal(false);
  };

  const user = useSelector((state) => state.ID);
  var email = "",
    name = "",
    phone = "",
    address = "",
    cmnd = "",
    birthday = "",
    gender = "",
    avatar = "",
    job = "";
  if (user.length !== 0) {
    email = user.user.user.email;
    name = user.user.user.name;
    phone = user.user.phone;
    address = user.user.user.address;
    cmnd = user.user.user.cmnd;
    birthday = user.user.user.birthday;
    gender = user.user.user.gender;
    avatar = user.user.user.avatar;
    job = user.user.user.job;
  }

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

      <div
        className="background"
        style={{ height: "72vh", overflowY: "scroll" }}
      >
        {/* Màn hình ở phần thông tin cá nhân*/}
        <div className="option-ca-nhan" style={{ display: menu.canhan }}>
          <div className="box-avatar">
            <img
              src={user.length === 0 ? avatar : user.user.user.avatar}
              className="avatar"
              alt="Avatar"
            />
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
            <p id="user-name">{name}</p>
            {/* 1 dòng chứa 3 thông tin*/}
            <div className="box-thongtin-row">
              <div className="row-item">
                <p className="item-title">Ngày sinh</p>
                <p className="item-infor">{Global.formatDate(birthday)}</p>
              </div>
              <div className="row-item">
                <p className="item-title">Giới tính</p>
                <p className="item-infor">{gender}</p>
              </div>
              <div className="row-item">
                <p className="item-title">Nghề nghiệp</p>
                <p className="item-infor">{job}</p>
              </div>
              <div className="row-item">
                <p className="item-title" style={{ whiteSpace: "nowrap" }}>
                  Số điện thoại
                </p>
                <p className="item-infor">{phone}</p>
              </div>
              <div className="row-item">
                <p className="item-title">Email</p>
                <p
                  className="item-infor"
                  style={{ width: "12vw", overflowX: "scroll" }}
                >
                  {email}
                </p>
              </div>
              <div className="row-item">
                <p className="item-title">CMND/CCCD</p>
                <p className="item-infor">{cmnd}</p>
              </div>
            </div>
            <div className="row-item2">
              <p className="item-title">Địa chỉ</p>
              <p className="item-infor">{address}</p>
            </div>

            <div className="btn-edit-infor">
              {/* Compoent button */}
              <div className="box-btn" onClick={() => setModal(true)}>
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
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
                    <img src={avatar} className="avatar-small" alt="Avatar" />
                    <span id="roommate-name">Cameron Williamson</span>
                  </td>
                  <td>24/7/1998</td>
                  <td>0834999373</td>
                  <td>nguyenchithanh1999@gmail.com</td>
                  <td>IT Developer</td>
                </tr>
                <tr>
                  <td style={{ alignItems: "center", display: "flex" }}>
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

      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          marginTop: 50,
          width: 650,
          height: 425,
          backgroundColor: "white",
          borderRadius: 12,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thay đổi thông tin</p>
          <span
            onClick={() => closeModal()}
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "default" }}
          >
            close
          </span>
        </div>
        <div className="model-box">
          <div className="model-flex">
            <div className="model-column">
              <div className="input-box">
                <input
                  type="text"
                  className="model-input"
                  placeholder="Họ và tên"
                  name="name"
                  value={input.name}
                  onChange={onChange}
                />
                <span
                  className="material-icons icon"
                  style={{ fontSize: "22px", color: "#828282" }}
                >
                  account_box
                </span>
              </div>
              <div className="input-box">
                <input
                  type="email"
                  className="model-input"
                  placeholder="Email"
                  name="email"
                  value={input.email}
                  onChange={onChange}
                />
                <span
                  className="material-icons icon"
                  style={{ fontSize: "22px", color: "#828282" }}
                >
                  email
                </span>
              </div>
              <div className="input-box">
                <input
                  type="tel"
                  className="model-input"
                  placeholder="Số điện thoại"
                  name="phone"
                  value={input.phone}
                  onChange={onChange}
                />
                <span
                  className="material-icons icon"
                  style={{ fontSize: "22px", color: "#828282" }}
                >
                  phone
                </span>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="model-input"
                  placeholder="Địa chỉ"
                  name="address"
                  value={input.address}
                  onChange={onChange}
                />
                <span
                  className="material-icons icon"
                  style={{ fontSize: "22px", color: "#828282" }}
                >
                  location_on
                </span>
              </div>
            </div>
            <div className="model-column">
              <div className="input-box">
                <Dropdown
                  controlClassName="dropdown-modal"
                  menuClassName="menu-modal"
                  arrowClassName="arrow-modal"
                  options={optionsGender}
                  onChange={onSelectGender}
                  value={"Nam"}
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="model-input"
                  placeholder="Nghề nghiệp"
                  name="job"
                  value={input.job}
                  onChange={onChange}
                />
                <span
                  className="material-icons icon"
                  style={{ fontSize: "22px", color: "#828282" }}
                >
                  work
                </span>
              </div>
              <div className="input-box">
                <input
                  className="model-input"
                  placeholder="Ngày sinh"
                  type="text"
                  name="birthday"
                  value={input.birthday}
                  onChange={onChange}
                  onFocus={_onFocusBirthday}
                  onBlur={_onBlurBirthday}
                />
                {birthdayIcon ? (
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    cake
                  </span>
                ) : null}
              </div>
              <div className="input-box">
                <input
                  type="number"
                  className="model-input"
                  placeholder="CMND"
                  name="cmnd"
                  value={input.cmnd}
                  onChange={onChange}
                />
                <span
                  className="material-icons icon"
                  style={{ fontSize: "22px", color: "#828282" }}
                >
                  picture_in_picture
                </span>
              </div>
            </div>
          </div>
          <div className="input-box">
            <p
              className="text-huy"
              style={{ marginRight: 20 }}
              onClick={() => closeModal()}
            >
              Hủy
            </p>
            <div className="box-btn">
              <button className="btn2"></button>
              <button className="btn">
                <i className="material-icons" id="icon-btn">
                  add_circle
                </i>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
