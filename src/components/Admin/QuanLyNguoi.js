import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Rodal from "rodal";
import Dropdown from "react-dropdown";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import "react-dropdown/style.css";
import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";
import Global from "../Global";
import Notification from "../Notification";

import avatar from "../../images/avatar.jpeg";

export default function QuanLyNguoi() {
  let history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.ID);

  useEffect(() => {
    if (location.state !== undefined) {
      getPerson();
    } else {
      getAllPerson();
    }
  }, []);

  const [Block, setBlock] = useState([]);
  const [data, setData] = useState([]);
  const [Room, setRoom] = useState([]);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [roomStatus, setRoomStatus] = useState(false);
  const [birthdayIcon, setBirthdayIcon] = useState(true);
  const [startDayIcon, setStartDayIcon] = useState(true);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cmnd: "",
    gender: "",
    job: "",
    birthday: "",
    startDay: "",
    block: location.state !== undefined ? location.state.block._id : "",
    room: location.state !== undefined ? location.state.room._id : "",
    price: "",
  });

  const onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const closeModal = () => {
    setInput({
      name: "",
      email: "",
      phone: "",
      address: "",
      cmnd: "",
      gender: "",
      job: "",
      birthday: "",
      startDay: "",
      block: location.state !== undefined ? location.state.block._id : "",
      room: location.state !== undefined ? location.state.room._id : "",
      price: "",
    });
    setModal(false);
    setError("");
  };

  const _onFocusStartDate = (e) => {
    e.currentTarget.type = "date";
    setStartDayIcon(false);
  };
  const _onBlurStartDate = (e) => {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Ngày bắt đầu";
    setStartDayIcon(true);
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

  const optionsGender = [
    { value: "Male", label: "Nam" },
    { value: "Female", label: "Nữ" },
  ];
  function onSelectGender(option) {
    setInput({ ...input, gender: option.value });
  }
  function onSelectBlock(option) {
    setInput({ ...input, block: option.value, room: "" });
    setRoomStatus(true);
    getRoom(option.value);
  }
  function onSelectRoom(option) {
    setInput({ ...input, room: option.value });
  }

  const getBlock = () => {
    const data = {
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "block/getallblockbyadminid";
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
          var newBlock = [];
          for (let index = 0; index < res.data.Block.length; index++) {
            newBlock.push({
              label: res.data.Block[index].name,
              value: res.data.Block[index]._id,
            });
          }
          setBlock(newBlock);
        }
      })
      .catch((error) => {});
  };

  const getRoom = (blockId) => {
    const data = {
      blockId: blockId,
    };
    const token = user.user.token;
    const url = Global.server + "room/getroombyblockid";
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
          var newRoom = [];
          for (let index = 0; index < res.data.Room.length; index++) {
            newRoom.push({
              label: res.data.Room[index].name,
              value: res.data.Room[index]._id,
            });
          }
          setRoom(newRoom);
          setRoomStatus(false);
        }
      })
      .catch((error) => {});
  };

  const CreatePerson = () => {
    const data = {
      email: input.email,
      name: input.name,
      phone: input.phone,
      address: input.address,
      cmnd: input.cmnd,
      birthday: input.birthday,
      gender: input.gender,
      avatar:
        "https://www.bathcollege.ac.uk/wp-content/uploads/2018/05/default-avatar.png",
      job: input.job,
      startDate: input.startDay,
      price: input.price,
      block: input.block,
      room: input.room,
    };
    const token = user.user.token;
    const url = Global.server + "user/register";
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
            closeModal();
            setTokenStatus(true);
          } else {
            setError(res.data.message);
          }
        } else {
          closeModal();
          // if (location.state !== undefined) {
          //   getRoom();
          // } else {
          //   getAllRoom();
          // }
        }
      })
      .catch((error) => {});
  };

  const loadPerson = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((person, index) => {
        return (
          <div className="card" key={index}>
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
        );
      });
    }
    return result;
  };

  const getPerson = () => {};

  const getAllPerson = () => {};

  return (
    <div className="quanlynguoithue">
      <div className="row">
        {location.state !== undefined ? (
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
                history.push({ pathname: "/admin/quanlyphongtro", state: location.state.block });
              }}
            >
              {location.state.block.name}
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
              {location.state.room.name}
            </h3>
          </div>
        ) : (
          <h3 style={{ color: "#151515" }}>Tất cả người thuê</h3>
        )}
        <div className="row">
          <p className="dropdown">Mới nhất</p>
          <i
            className="material-icons-round"
            style={{
              padding: "0px 20px 0px 10px",
              color: "#828282",
              alignSelf: "center",
            }}
          >
            arrow_drop_down
          </i>
          {/* Compoent button */}
          <div
            className="box-btn"
            onClick={() => {
              setModal(true);
              getBlock();
            }}
          >
            <div className="btn2"></div>
            <button className="btn">
              <i className="material-icons-round" id="icon-btn">
                add_circle
              </i>
              Thêm người mới
            </button>
          </div>
        </div>
      </div>
      <div className="array-item">{loadPerson()}</div>

      {/* Modal */}
      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          marginTop: 50,
          width: 650,
          height: 610,
          backgroundColor: "white",
          borderRadius: 12,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thêm người thuê</p>
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            close
          </span>
        </div>
        <div className="model-box">
          <div className="model-flex">
            <div className="model-column">
              <div className="input-box">
                <input
                  className="model-input"
                  placeholder="Họ và tên"
                  type="text"
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
                  className="model-input"
                  placeholder="Email"
                  type="email"
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
                  className="model-input"
                  placeholder="Số điện thoại"
                  type="tel"
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
                  className="model-input"
                  placeholder="Địa chỉ"
                  type="text"
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
              <div className="input-box">
                <input
                  className="model-input"
                  placeholder="Số CMND"
                  type="number"
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
              <div className="input-box">
                <Dropdown
                  placeholder="Giới tính"
                  controlClassName="dropdown-modal"
                  menuClassName="menu-modal"
                  arrowClassName="arrow-modal"
                  options={optionsGender}
                  onChange={onSelectGender}
                  value={input.gender}
                />
              </div>
            </div>
            <div className="model-column">
              <div className="input-box">
                <input
                  className="model-input"
                  placeholder="Nghề nghiệp"
                  type="text"
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
                  className="model-input"
                  placeholder="Ngày bắt đầu"
                  type="text"
                  name="startDay"
                  value={input.startDay}
                  onChange={onChange}
                  onFocus={_onFocusStartDate}
                  onBlur={_onBlurStartDate}
                />
                {startDayIcon ? (
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    date_range
                  </span>
                ) : null}
              </div>
              <div className="model-flex">
                <div className="model-column">
                  {location.state !== undefined ? (
                    <div className="input-box">
                      <input
                        disabled
                        className="model-input"
                        value={location.state.block.name}
                      />
                      <span
                        className="material-icons icon"
                        style={{ fontSize: "22px", color: "#828282" }}
                      >
                        location_city
                      </span>
                    </div>
                  ) : (
                    <Dropdown
                      placeholder="Dãy trọ"
                      controlClassName="dropdown-modal-short"
                      menuClassName="menu-modal-short"
                      arrowClassName="arrow-modal-short"
                      options={Block}
                      onChange={onSelectBlock}
                      value={input.block}
                    />
                  )}
                </div>
                <div className="model-column">
                  {location.state !== undefined ? (
                    <div className="input-box">
                      <input
                        disabled
                        className="model-input"
                        value={location.state.room.name}
                      />
                      <span
                        className="material-icons icon"
                        style={{ fontSize: "22px", color: "#828282" }}
                      >
                        meeting_room
                      </span>
                    </div>
                  ) : (
                    <Dropdown
                      disabled={roomStatus}
                      placeholder="Phòng trọ"
                      controlClassName="dropdown-modal-short"
                      menuClassName="menu-modal-short"
                      arrowClassName="arrow-modal-short"
                      options={Room}
                      onChange={onSelectRoom}
                      value={input.room}
                    />
                  )}
                </div>
              </div>
              <div className="input-box">
                <input
                  className="model-input"
                  placeholder="Tiền cọc"
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={onChange}
                />
                <span
                  className="material-icons icon"
                  style={{ fontSize: "22px", color: "#828282" }}
                >
                  money
                </span>
              </div>
            </div>
          </div>
          {error === "" ? null : <Notification type="error" content={error} />}
          <div className="input-box">
            <p className="text-huy" onClick={() => closeModal()}>
              Hủy
            </p>
            <div
              className="box-btn"
              onClick={() => {
                CreatePerson();
              }}
            >
              <button className="btn2"></button>
              <button className="btn">
                <i className="material-icons" id="icon-btn">
                  add_circle
                </i>
                Thêm
              </button>
            </div>
          </div>
        </div>
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
    // <div>
    //   <h3>Quan ly Nguoi</h3>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/quanlydaytro/daytro/phongtro/nguoithue");
    //     }}
    //   >
    //     Nguoi thue
    //   </button>
    // </div>
  );
}
