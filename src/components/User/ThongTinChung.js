import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import Dropdown from "react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import qs from "qs";
import Dropzone from "react-dropzone";
import ReactLoading from "react-loading";

import "rodal/lib/rodal.css";

import Global from "../Global";
import { updateID } from "../../actions";
import ModalLogin from "../ModalLogin";
import Notification from "../Notification";

export default function ThongTinChung() {
  const user = useSelector((state) => state.ID);
  useEffect(() => {
    if (user.length !== 0) {
      getData();
      getRoomMate();
      var date = new Date(user.user.user.birthday);
      var newBirthday =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2);
      setInput({
        name: user.user.user.name,
        email: user.user.user.email,
        phone: user.user.user.phone,
        address: user.user.user.address,
        gender: user.user.user.gender,
        job: user.user.user.job,
        birthday: newBirthday,
        cmnd: user.user.user.cmnd,
      });
    }
  }, []);

  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);
  const [file, setFile] = useState({ name: "*PNG, JPG, JPEG" });
  const [modalAvatar, setModalAvatar] = useState(false);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [data, setData] = useState([]);
  const [roomMate, setRoomMate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [menu, setMenu] = useState({
    canhan: "",
    otro: "none",
    thanhvien: "none",
  });
  const [birthdayIcon, setBirthdayIcon] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "Male",
    job: "",
    birthday: "",
    cmnd: "",
  });
  const optionsGender = [
    { value: "Male", label: "Nam" },
    { value: "Female", label: "Nữ" },
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

  const closeModal = (status) => {
    if (status !== 1) {
      var date = new Date(user.user.user.birthday);
      var newBirthday =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2);
      setInput({
        name: user.user.user.name,
        email: user.user.user.email,
        phone: user.user.user.phone,
        address: user.user.user.address,
        gender: user.user.user.gender,
        job: user.user.user.job,
        birthday: newBirthday,
        cmnd: user.user.user.cmnd,
      });
    }
    setModal(false);
  };

  const getData = () => {
    setLoading(true);
    const data = {
      email: user.user.user.email,
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
            closeModal(0);
            closeModalAvatar();
            setLoading(false);
          }
        } else {
          setData(res.data.User);
          setLoading(false);
        }
      })
      .catch((error) => {});
  };

  const getRoomMate = () => {
    setLoading2(true);
    const data = {
      roomId: user.user.user.room,
    };
    const token = user.user.token;
    const url = Global.server + "user/getalluserbyroomid";
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
            closeModal(0);
            setTokenStatus(true);
            closeModalAvatar();
            setLoading2(false);
          }
        } else {
          setRoomMate(res.data.User);
          setLoading2(false);
        }
      })
      .catch((error) => {});
  };

  const loadRoomMate = () => {
    var result = null;
    if (roomMate.length > 0) {
      result = roomMate.map((roommate, index) => {
        if (roommate._id !== user.user.user._id) {
          return (
            <tr key={index}>
              <td style={{ alignItems: "center", display: "flex" }}>
                <img
                  src={roommate.avatar}
                  className="avatar-small"
                  alt="Avatar"
                />
                <span id="roommate-name">{roommate.name}</span>
              </td>
              <td>{Global.formatDate(roommate.birthday)}</td>
              <td>{roommate.phone}</td>
              <td>{roommate.email}</td>
              <td>{roommate.job}</td>
            </tr>
          );
        } else {
          return null;
        }
      });
    }
    return result;
  };

  const monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const editUser = () => {
    setLoading3(true)
    const data = {
      userId: user.user.user._id,
      name: input.name,
      phone: input.phone,
      address: input.address,
      cmnd: input.cmnd,
      birthday: input.birthday,
      gender: input.gender,
      job: input.job,
    };
    const token = user.user.token;
    const url = Global.server + "user/updatecustomer";
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
            closeModal(0);
            setTokenStatus(true);
            closeModalAvatar();
            setLoading3(false)
          } else {
            setError(res.data.message);
            setLoading3(false)
          }
        } else {
          dispatch(
            updateID({ user: { token: user.user.token, user: res.data.User } })
          );
          setLoading3(false)
          closeModal(1);
        }
      })
      .catch((error) => {});
  };

  const handleImageUpload = () => {
    var f = file;
    const formData = new FormData();
    formData.append("file", f);
    // replace this with your upload preset name
    formData.append("upload_preset", "quanlynhatro");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      "https://api.Cloudinary.com/v1_1/dep0t5tcf/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.secure_url);
        setImageAlt(`An image of ${res.original_filename}`);
        editAvatar(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    const objectUrl = URL.createObjectURL(acceptedFiles[0]);
    setImageUrl(objectUrl);
  };

  const closeModalAvatar = () => {
    setImageUrl(null);
    setImageAlt(null);
    setFile({ name: "*PNG, JPG, JPEG" });
    setModalAvatar(false);
    setError("");
  };

  const editAvatar = (image) => {
    setLoading3(true)
    const data = {
      userId: user.user.user._id,
      avatar: image,
    };
    const token = user.user.token;
    const url = Global.server + "user/updateavatarcustomer";
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
            closeModalAvatar();
            setTokenStatus(true);
            setLoading3(false)
          } else {
            setError(res.data.message);
            setLoading3(false)
          }
        } else {
          dispatch(
            updateID({ user: { token: user.user.token, user: res.data.User } })
          );
          setLoading3(false)
          closeModalAvatar();
        }
      })
      .catch((error) => {});
  };

  var email = "",
    name = "",
    phone = "",
    address = "",
    cmnd = "",
    birthday = "",
    gender = "",
    avatar = "",
    job = "",
    roomName = "",
    blockName = "",
    createdAt = "",
    startDate = "",
    tienCoc = 0,
    area = 0,
    tienPhong = 0,
    gac = false,
    device = "";
  if (user.length !== 0) {
    email = user.user.user.email;
    name = user.user.user.name;
    phone = user.user.user.phone;
    address = user.user.user.address;
    cmnd = user.user.user.cmnd;
    birthday = user.user.user.birthday;
    gender = user.user.user.gender;
    avatar = user.user.user.avatar;
    job = user.user.user.job;
  }
  if (data.length !== 0) {
    roomName = data.room.name;
    blockName = data.block.name;
    createdAt = data.createdAt;
    startDate = data.startDate;
    tienCoc = data.price;
    area = data.room.area;
    tienPhong = data.room.price;
    gac = data.room.rooftop;
    device = data.room.device;
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
            <div
              className="display-flex"
              style={{ cursor: "default" }}
              onClick={() => {
                setModalAvatar(true);
              }}
            >
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

        {loading && menu.otro === "" ? (
          <div className="loading" style={{ backgroundColor: "white" }}>
            <ReactLoading
              type={"spin"}
              color={"#EE6F57"}
              height={"4%"}
              width={"4%"}
            />
          </div>
        ) : (
          /* Màn hình ở phần thông tin ở trọ */
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
                  <p className="item-infor">{roomName}</p>
                  <p className="item-infor">{blockName}</p>
                  <p className="item-infor">{Global.formatDate(createdAt)}</p>
                  <p className="item-infor">{Global.formatDate(startDate)}</p>
                  <p className="item-infor">
                    {monthDiff(new Date(startDate), new Date()) + 1} tháng
                  </p>
                  <p className="item-infor">
                    {Global.currencyFormat(tienCoc.toString())} VND
                  </p>
                </div>
              </div>
            </div>
            <div className="thong-tin-phong">
              <p id="title-phong">Thông tin {roomName}</p>
              <div className="box-thongtin-row2">
                <div className="row-item3">
                  <p className="item-title2">Diện tích</p>
                  <p className="item-infor2">
                    {area} m<sup style={{ fontSize: "12px" }}>2</sup>
                  </p>
                </div>
                <div className="row-item3">
                  <p className="item-title2">Tiền phòng</p>
                  <p className="item-infor2">
                    {Global.currencyFormat(tienPhong.toString())} VND
                  </p>
                </div>
                <div className="row-item3">
                  <p className="item-title2">Gác mái</p>
                  <i
                    className="material-icons-round"
                    id="icon-edit"
                    style={{ fontSize: "24px" }}
                  >
                    {gac ? "check" : "close"}
                  </i>
                </div>
                <div className="row-item3">
                  <p className="item-title2">Thiết bị</p>
                  <p className="item-infor2">{device}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading2 && menu.thanhvien === "" ? (
          <div className="loading">
            <ReactLoading
              type={"spin"}
              color={"#EE6F57"}
              height={"4%"}
              width={"4%"}
            />
          </div>
        ) : (
          /*Màn hình ở phần thông tin thành viên */
          <div
            className="option-thanh-vien"
            style={{ display: menu.thanhvien }}
          >
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
                  {loadRoomMate()}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          marginTop: 50,
          width: 650,
          height: 470,
          backgroundColor: "white",
          borderRadius: 12,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thay đổi thông tin</p>
          <span
            onClick={() => closeModal(0)}
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
                <input className="model-input" value={email} readOnly />
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
                  type="number"
                  maxLength="10"
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
                  value={input.gender === "Male" ? "Nam" : "Nữ"}
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
          {error === "" ? null : <Notification type="error" content={error} />}
          {loading3 ? (
            <div className="loading2">
              <ReactLoading
                type={"spin"}
                color={"#EE6F57"}
                height={"5%"}
                width={"5%"}
              />
            </div>
          ) : null}
          <div className="input-box">
            <p
              className="text-huy"
              style={{ marginRight: 20 }}
              onClick={() => closeModal(0)}
            >
              Hủy
            </p>
            <div
              className="box-btn"
              onClick={() => {
                editUser();
              }}
            >
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

      <Rodal
        visible={modalAvatar}
        animation={"slideUp"}
        customStyles={{
          width: 425,
          height: 425,
          background: "white",
          borderRadius: 8,
          padding: 0,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Đổi ảnh đại diện</p>
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModalAvatar()}
          >
            close
          </span>
        </div>
        <div className="model-box">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input
                  {...getInputProps()}
                  accept="image/jpg, image/jpeg, image/png"
                  multiple={false}
                />
                <div className="upload-img">
                  {file.name === "*PNG, JPG, JPEG" ? (
                    <div>
                      <span
                        className="material-icons icon"
                        style={{
                          fontSize: "40px",
                          color: "#EE6F57",
                          margin: "10px",
                        }}
                      >
                        cloud_upload
                      </span>
                      <p className="text-tai-anh-len">Tải ảnh lên</p>
                      <p id="input-type">*PNG, JPG, JPEG</p>
                    </div>
                  ) : (
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="displayed-avatar"
                    />
                  )}
                </div>
              </div>
            )}
          </Dropzone>

          <div className="input-box">
            <span className="model-result-input">{file.name}</span>
            {file.name !== "*PNG, JPG, JPEG" ? (
              <span
                className="material-icons icon"
                style={{ fontSize: "22px", color: "green" }}
              >
                check_circle
              </span>
            ) : null}
          </div>

          {error === "" ? null : <Notification type="error" content={error} />}
          {loading3 ? (
            <div className="loading2">
              <ReactLoading
                type={"spin"}
                color={"#EE6F57"}
                height={"5%"}
                width={"5%"}
              />
            </div>
          ) : null}

          <div className="input-box">
            <p className="text-huy" onClick={() => closeModalAvatar()}>
              Hủy
            </p>
            <div className="box-btn" style={{ marginLeft: 20 }}>
              <div className="btn2"></div>
              <button className="btn" onClick={handleImageUpload}>
                <i className="material-icons" id="icon-btn">
                  edit
                </i>
                Đổi ảnh đại diện
              </button>
            </div>
          </div>
        </div>
      </Rodal>

      <ModalLogin status={tokenStatus} />
    </div>
  );
}
