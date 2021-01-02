import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Rodal from "rodal";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";
import Global from "../Global";

import avatarSample from "../../images/avatar.jpeg";

export default function NguoiThue() {
  let history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.ID);

  const [data, setData] = useState([]);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (user.length !== 0) {
      if (location.state !== undefined) {
        getData();
      }
    }
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const getData = () => {
    const data = {
      email: location.state.user.email,
    };
    const token = user.user.token;
    const url = Global.server + "user/getuserbyemail";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${token}`,
      },
      url,
      data: qs.stringify(data),
    };
    axios(options)
      .then((res) => {
        if (res.data.status === false) {
          if (res.data.message === "Unauthorized user!") {
            setTokenStatus(true);
            closeModal();
          }
        } else {
          setData(res.data.User);
        }
      })
      .catch((error) => {});
  };

  const monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const deletePerson = () => {
    const data = {
      userId: location.state.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "user/deleteuser";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${token}`,
      },
      url,
      data: qs.stringify(data),
    };
    axios(options)
      .then((res) => {
        if (res.data.status === false) {
          if (res.data.message === "Unauthorized user!") {
            setTokenStatus(true);
            closeModal();
          }
        } else {
          closeModal();
          history.push("/admin/quanlynguoi")
        }
      })
      .catch((error) => {});
  }

  var email = "",
    name = "",
    phone = "",
    address = "",
    cmnd = "",
    birthday = "",
    gender = "",
    avatar = avatarSample,
    job = "";
  if (location.state !== undefined) {
    email = location.state.user.email;
    name = location.state.user.name;
    phone = location.state.user.phone;
    address = location.state.user.address;
    cmnd = location.state.user.cmnd;
    birthday = location.state.user.birthday;
    gender = location.state.user.gender;
    avatar = location.state.user.avatar;
    job = location.state.user.job;
  }
  var block = "",
    room = "",
    registerDate = "",
    startDate = "",
    price = "";
  if (data.length !== 0) {
    block = data.block.name;
    room = data.room.name;
    registerDate = data.createdAt;
    startDate = data.startDate;
    price = data.price;
  }

  return (
    <div className="thongtinchung">
      <div
        className="row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {location.state.from === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                color: "#151515",
                fontFamily: "Roboto-Medium",
                cursor: "pointer",
              }}
              onClick={() => {
                history.push("/admin/quanlydaytro");
              }}
            >
              Tất cả dãy trọ
            </h3>
            <i
              className="material-icons-round"
              style={{
                padding: "0px 10px",
                color: "#828282",
                alignSelf: "center",
              }}
            >
              chevron_right
            </i>
            <h3
              style={{
                color: "#151515",
                fontFamily: "Roboto-Medium",
                cursor: "pointer",
              }}
              onClick={() => {
                if (data.length !== 0) {
                  history.push({
                    pathname: "/admin/quanlyphongtro",
                    state: data.block,
                  });
                }
              }}
            >
              {block}
            </h3>
            <i
              className="material-icons-round"
              style={{
                padding: "0px 10px",
                color: "#828282",
                alignSelf: "center",
              }}
            >
              chevron_right
            </i>
            <h3
              style={{
                color: "#151515",
                fontFamily: "Roboto-Medium",
                cursor: "pointer",
              }}
              onClick={() => {
                if (data.length !== 0) {
                  history.push({
                    pathname: "/admin/quanlynguoi",
                    state: { room: data.room },
                  });
                }
              }}
            >
              {room}
            </h3>
            <i
              className="material-icons-round"
              style={{
                padding: "0px 10px",
                color: "#828282",
                alignSelf: "center",
              }}
            >
              chevron_right
            </i>
            <h3
              style={{
                color: "#151515",
                fontFamily: "Roboto-Medium",
              }}
            >
              {name}
            </h3>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                color: "#151515",
                fontFamily: "Roboto-Medium",
                cursor: "pointer",
              }}
              onClick={() => {
                history.push("/admin/quanlynguoi");
              }}
            >
              Tất cả người thuê
            </h3>
            <i
              className="material-icons-round"
              style={{
                padding: "0px 10px",
                color: "#828282",
                alignSelf: "center",
              }}
            >
              chevron_right
            </i>
            <h3
              style={{
                color: "#151515",
                fontFamily: "Roboto-Medium",
              }}
            >
              {name}
            </h3>
          </div>
        )}
        {/* Compoent button */}
        <div
          className="box-btn"
          onClick={() => {
            setModal(true);
          }}
        >
          <div className="btn2"></div>
          <button className="btn">
            <i className="material-icons-round" id="icon-btn">
              delete
            </i>
            Xóa người thuê
          </button>
        </div>
      </div>

      <div
        className="background"
        style={{ height: "72vh", overflowY: "scroll" }}
      >
        <div className="option-ca-nhan2">
          <div className="box-avatar">
            <img src={avatar} className="avatar" alt="Avatar" />
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
                <p className="item-infor">{gender === "Male" ? "Nam" : "Nữ"}</p>
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
          </div>
        </div>

        <div className="option-o-tro2">
          <div className="thong-tin-phong" style={{ marginTop: 0 }}>
            <p id="title-phong">Thông tin ở trọ</p>
            <div className="box-thongtin-row2">
              <div className="row-item3">
                <p className="item-title2">Dãy trọ</p>
                <p className="item-infor2">{block}</p>
              </div>
              <div className="row-item3">
                <p className="item-title2">Phòng trọ</p>
                <p className="item-infor2">{room}</p>
              </div>
              <div className="row-item3">
                <p className="item-title2">Ngày đăng ký</p>
                <p className="item-infor2">{Global.formatDate(registerDate)}</p>
              </div>
              <div className="row-item3">
                <p className="item-title2">Ngày bắt đầu</p>
                <p className="item-infor2">{Global.formatDate(startDate)}</p>
              </div>
              <div className="row-item3">
                <p className="item-title2">Thời gian đã ở</p>
                <p className="item-infor2">
                  {monthDiff(new Date(data.startDate), new Date()) + 1} tháng
                </p>
              </div>
              <div className="row-item3">
                <p className="item-title2">Tiền cọc</p>
                <p className="item-infor2">
                  {Global.currencyFormat(price.toString())} VND
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Rodal
        visible={modal}
        animation={"slideUp"}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="modal-title">
          Xóa người thuê
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            close
          </span>
        </div>

        <span className="modal-content">
          Bạn có chắc chắn muốn xóa <span style={{fontFamily: 'Roboto-Bold'}}>{name}</span> khỏi {room} không?
        </span>

        <div className="input-box" style={{ marginTop: 70 }}>
          <p className="text-huy" style={{marginRight: 20}} onClick={() =>closeModal()}>
            Hủy
          </p>
          <div className="box-btn" onClick={() => deletePerson()}>
            <button className="btn2"></button>
            <button className="btn">Đồng ý</button>
          </div>
        </div>
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
