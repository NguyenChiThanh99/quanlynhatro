import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import Rodal from "rodal";
import Dropzone from "react-dropzone";

import "rodal/lib/rodal.css";

import Notification from "../Notification";
import Global from "../Global";
import ModalLogin from "../ModalLogin";

export default function DayTroDetail() {
  let history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.ID);

  useEffect(() => {
    if (user.length !== 0 && location.state !== undefined) {
      getRoom();
    }
  }, []);

  const [menu, setMenu] = useState({
    general: "",
    service: "none",
  });
  const [modalDelete, setModalDelete] = useState({
    status: false,
    content: { name: "", id: "" },
  });
  const [modalEdit, setModalEdit] = useState({
    status: false,
    content: { name: "", id: "", service: [] },
  });
  const [tokenStatus, setTokenStatus] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [Service, setService] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);
  const [file, setFile] = useState({ name: "*PNG, JPG, JPEG" });
  const [input, setInput] = useState({
    name: "",
    price: "",
    area: "",
    block: location.state !== undefined ? location.state._id : "",
    device: "",
    checkGacMai: "1",
  });
  const [ServiceInput, setServiceInput] = useState({});

  const getRoom = () => {
    const data = {
      blockId: location.state._id,
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
            closeModalEdit();
            setModalDelete(false);
          }
        } else {
          setData(res.data.Room);
        }
      })
      .catch((error) => {});
  };

  const editRoom = (image) => {
    const data = {
      roomId: modalEdit.content._id,
      name: modalEdit.content.name,
      blockId: location.state._id,
      price: modalEdit.content.price,
      area: modalEdit.content.area,
      device: modalEdit.content.device,
      rooftop: modalEdit.content.rooftop,
      image: image,
      service: handleServiceEdit(),
    };
    const token = user.user.token;
    const url = Global.server + "room/updateroom";
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
            closeModalEdit();
            setTokenStatus(true);
            setModalDelete(false);
          } else {
            setError(res.data.message);
          }
        } else {
          closeModalEdit();
          getRoom();
        }
      })
      .catch((error) => {});
  };

  const deleteRoom = (room) => {
    const data = {
      roomId: modalDelete.content._id,
    };
    const token = user.user.token;
    const url = Global.server + "room/deleteroom";
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
            closeModalEdit();
            setModalDelete(false);
          }
        } else {
          setModalDelete({ id: "", content: { name: "", id: "" } });
          getRoom();
        }
      })
      .catch((error) => {});
  };

  const loadRoom = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((room, index) => {
        return (
          <tr key={index}>
            <td>{room.name}</td>
            <td>
              {room.area} m<sup style={{ fontSize: "12px" }}>2</sup>
            </td>
            <td>{Global.currencyFormat(room.price.toString())} VND</td>
            <td>
              <span className="material-icons icon">
                {room.rooftop ? "check" : "close"}
              </span>
            </td>
            <td>{room.device}</td>
            <td>
              <span
                className="material-icons icon"
                style={{ cursor: "default" }}
                onClick={() => {
                  var serArr = [];
                  for (let index = 0; index < room.service.length; index++) {
                    serArr.push({ name: room.service[index], value: true });
                  }
                  setModalEdit({
                    status: true,
                    content: { ...room, service: serArr },
                  });
                  getService();
                  setFile({
                    name: room.image.slice(
                      room.image.lastIndexOf("/") + 1,
                      room.image.length
                    ),
                  });
                  setImageUrl(room.image);
                }}
              >
                edit
              </span>
            </td>
            <td>
              <span
                className="material-icons icon"
                style={{ cursor: "default" }}
                onClick={() => {
                  setModalDelete({ status: true, content: room });
                }}
              >
                delete
              </span>
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  const closeModal = () => {
    setImageUrl(null);
    setImageAlt(null);
    setFile({ name: "*PNG, JPG, JPEG" });
    setInput({
      name: "",
      price: "",
      area: "",
      block: location.state !== undefined ? location.state._id : "",
      device: "",
      checkGacMai: "1",
    });
    setModal(false);
    setError("");
    setMenu({ general: "", service: "none" });
  };

  const closeModalEdit = () => {
    setImageUrl(null);
    setImageAlt(null);
    setFile({ name: "*PNG, JPG, JPEG" });
    setError("");
    setMenu({ general: "", service: "none" });
    setModalEdit({ status: false, content: { name: "", id: "", service: [] } });
  };

  const handleImageUpload = (type) => {
    if (type === 0) {
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
          CreateRoom(res.secure_url);
        })
        .catch((err) => console.log(err));
    } else if (file.path === undefined) {
      editRoom(imageUrl);
    } else {
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
          editRoom(res.secure_url);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    const objectUrl = URL.createObjectURL(acceptedFiles[0]);
    setImageUrl(objectUrl);
  };

  const handleService = () => {
    var serviceArr = Object.entries(ServiceInput);
    var newService = [];
    for (let index = 0; index < serviceArr.length; index++) {
      if (serviceArr[index][1] === true) {
        newService.push(serviceArr[index][0]);
      }
    }
    return newService;
  };

  const handleServiceEdit = () => {
    var serviceArr = modalEdit.content.service;
    var newService = [];
    for (let index = 0; index < serviceArr.length; index++) {
      if (serviceArr[index].value === true) {
        newService.push(serviceArr[index].name);
      }
    }
    return newService;
  };

  const loadService = () => {
    var result = null;
    if (Service.length > 0) {
      result = Service.map((service, index) => {
        var serviceID = service._id;
        return (
          <div className="check-box-box" key={index}>
            <input
              className="check-box-input"
              name={serviceID}
              type="checkbox"
              onChange={onChangeService}
              checked={ServiceInput.serviceID}
            />
            <label className="check-box">
              {service.name +
                ": " +
                Global.currencyFormat(service.price) +
                " " +
                service.calculate}
            </label>
          </div>
        );
      });
    }
    return result;
  };

  const checkService = (service) => {
    if (modalEdit.content.service.length !== 0) {
      for (let index = 0; index < modalEdit.content.service.length; index++) {
        if (
          modalEdit.content.service[index].name === service &&
          modalEdit.content.service[index].value
        ) {
          return true;
        }
      }
      return false;
    }
  };

  const loadServiceEdit = () => {
    var result = null;
    if (Service.length > 0) {
      result = Service.map((service, index) => {
        var serviceID = service._id;
        return (
          <div className="check-box-box" key={index}>
            <input
              className="check-box-input"
              name={serviceID}
              type="checkbox"
              onChange={onChangeServiceEdit}
              checked={checkService(serviceID)}
            />
            <label className="check-box">
              {service.name +
                ": " +
                Global.currencyFormat(service.price) +
                " " +
                service.calculate}
            </label>
          </div>
        );
      });
    }
    return result;
  };

  const onChangeService = (event) => {
    var target = event.target;
    var value = target.checked;
    var name = target.name;
    setServiceInput({
      ...ServiceInput,
      [name]: value,
    });
  };

  const onChangeServiceEdit = (event) => {
    var target = event.target;
    var value = target.checked;
    var name = target.name;

    function isExist(element) {
      return element.name === name;
    }

    var serArr = modalEdit.content.service;
    const found = modalEdit.content.service.findIndex(isExist);
    if (found === -1) {
      serArr.push({ name: name, value: true });
    } else {
      serArr[found].value = value;
    }

    setModalEdit({
      status: modalEdit.status,
      content: { ...modalEdit.content, service: serArr },
    });
  };

  const CreateRoom = (image) => {
    const data = {
      name: input.name,
      blockId: input.block,
      price: input.price,
      area: input.area,
      device: input.device,
      rooftop: input.checkGacMai,
      image: image,
      service: handleService(),
    };
    const token = user.user.token;
    const url = Global.server + "room/create";
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
            closeModalEdit();
            setTokenStatus(true);
            setModalDelete(false);
          } else {
            setError(res.data.message);
          }
        } else {
          closeModal();
          getRoom();
        }
      })
      .catch((error) => {});
  };

  const onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeEdit = (event) => {
    var target = event.target;
    var value = target.type === "checkbox" ? target.checked : target.value;
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }
    var name = target.name;
    setModalEdit({
      status: modalEdit.status,
      content: { ...modalEdit.content, [name]: value },
    });
  };

  const getService = () => {
    const data = {
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "service/getservicebyadminid";
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
            closeModalEdit();
            setModalDelete(false);
          }
        } else if (res.data.message === "Service rỗng") {
          setService([]);
        } else {
          setService(res.data.Service);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="chitietday">
      <div className="row">
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
              history.push({
                pathname: "/admin/quanlyphongtro",
                state: location.state,
              });
            }}
          >
            {location.state.name}
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
            Chi tiết {location.state.name}
          </h3>
          <i
            className="material-icons-round"
            style={{
              padding: "0px 10px",
              color: "#828282",
              fontSize: 8,
              alignSelf: "center",
            }}
          >
            fiber_manual_record
          </i>
          <h3
            style={{
              color: "#828282",
              fontFamily: "Roboto-Regular",
            }}
          >
            {data.length}
          </h3>
        </div>
        <div className="row">
          <p className="dropdown">Mới nhất</p>
          <i
            className="material-icons-round"
            style={{
              padding: "0px 20px 0px 10px",
              color: "#333333",
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
              getService();
            }}
          >
            <div className="btn2"></div>
            <button className="btn">
              <i className="material-icons-round" id="icon-btn">
                add_circle
              </i>
              Thêm phòng mới
            </button>
          </div>
        </div>
      </div>

      <div className="body" style={{ height: "80vh", overflowY: "scroll" }}>
        <div className="table">
          <table>
            <tbody>
              <tr>
                <th className="sort">
                  <p className="sort_text">Phòng</p>
                  <span className="material-icons icon">arrow_downward</span>
                </th>
                <th>
                  <p>Diện tích</p>
                </th>
                <th>
                  <p>Giá</p>
                </th>
                <th>
                  <p>Gác mái</p>
                </th>
                <th style={{ whiteSpace: "nowrap" }}>
                  <p>Thiết bị</p>
                </th>
                <th>
                  <p />
                </th>
                <th>
                  <p />
                </th>
              </tr>
              {loadRoom()}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "10px" }}>
          <select value="Radish" className="dropdown-chitietday">
            <option value="12/2020">12/2020</option>
            <option value="11/2020">11/2020</option>
            <option value="10/2020">10/2020</option>
          </select>
          <p
            style={{
              display: "inline",
              paddingLeft: "10px",
              fontFamily: "Roboto-Regular",
            }}
          >
            Ngày chốt chỉ số:{" "}
          </p>
          <p style={{ display: "inline", fontFamily: "Roboto-Bold" }}>
            31/12/2020
          </p>
        </div>

        <div className="table">
          <table>
            {/* 2 hàng đầu */}
            <tbody>
              <tr>
                <th rowSpan={2}>
                  <p className="sort_text">Phòng</p>
                </th>
                <th rowSpan={2}>{/* trống */}</th>
                <th
                  colSpan={4}
                  style={{ textAlign: "center", fontSize: "20px" }}
                >
                  <p
                    style={{
                      display: "inline",
                      color: "#EE6F57",
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    ĐIỆN
                  </p>
                  <p style={{ display: "inline", fontFamily: "Roboto-Bold" }}>
                    /
                  </p>
                  <p
                    style={{
                      display: "inline",
                      color: "#1F3C88",
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    NƯỚC
                  </p>
                </th>
                <th rowSpan={2}>
                  <p>Dịch vụ khác</p>
                </th>
                <th rowSpan={2}>
                  <p>Tiền phòng</p>
                </th>
                <th rowSpan={2}>
                  <p>Tổng tiền</p>
                </th>
                <th rowSpan={2}>
                  <p>Thông tin thanh toán</p>
                </th>
              </tr>
              <tr>
                <th>Chỉ số đầu</th>
                <th>Chỉ số cuối</th>
                <th style={{ whiteSpace: "nowrap" }}>Sử dụng</th>
                <th style={{ whiteSpace: "nowrap" }}>Số tiền</th>
              </tr>
              {/* row */}
              <tr>
                <td rowSpan={2} style={{ fontSize: "14px" }}>
                  A1
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #ffffff",
                    color: "#4f4f4f",
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  Điện
                </td>
                <td style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                  14,283 Kw/h
                </td>
                <td>
                  <input
                    type="text"
                    style={{
                      width: "80px",
                      fontSize: "14px",
                      fontFamily: "Roboto-Bold",
                    }}
                    className="ghichu"
                  />
                </td>
                <td style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                  110 Kw/h
                </td>
                <td style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                  205,194 đ
                </td>
                <td
                  rowSpan={2}
                  style={{ whiteSpace: "nowrap", fontSize: "14px" }}
                >
                  <div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Wifi: </p>
                      <p className="chiso tien">150.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Vệ sinh: </p>
                      <p className="chiso tien">100.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">An ninh: </p>
                      <p className="chiso tien">50.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Gửi xe: </p>
                      <p className="chiso tien">70.000 đ đ</p>
                    </div>
                  </div>
                </td>
                <td
                  rowSpan={2}
                  style={{ whiteSpace: "nowrap", fontSize: "14px" }}
                >
                  4,000,000 đ
                </td>
                <td
                  rowSpan={2}
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "16px",
                    color: "#333333",
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  4,723,435 đ
                </td>
                <td rowSpan={2}>
                  <select value="Radish" className="dropdown-thongtinthanhtoan">
                    <option value="chưa" style={{ fontSize: "14px" }}>
                      Chưa
                    </option>
                    <option value="rồi" style={{ fontSize: "14px" }}>
                      Rồi
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td style={{ color: "#4f4f4f", fontFamily: "Roboto-Medium" }}>
                  Nước
                </td>
                <td style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                  3,041 Kw/h
                </td>
                <td>
                  <input
                    type="text"
                    style={{
                      width: "80px",
                      fontSize: "14px",
                      fontFamily: "Roboto-Bold",
                    }}
                    className="ghichu"
                  />
                </td>
                <td style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                  14 Kw/h
                </td>
                <td style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                  76,780 đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          marginTop: 20,
          width: 600,
          height: 640,
          backgroundColor: "white",
          borderRadius: 12,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thêm phòng trọ</p>
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            close
          </span>
        </div>

        <div
          className="row"
          style={{ justifyContent: "flex-start", paddingLeft: 25 }}
        >
          <div
            className={
              menu.general !== "none" ? "option option-click" : "option"
            }
            onClick={() => {
              setMenu({ general: "", service: "none" });
            }}
          >
            <h3
              className={
                menu.general !== "none"
                  ? "option-title option-title-click"
                  : "option-title"
              }
            >
              Thông tin chung
            </h3>
          </div>
          <div
            className={
              menu.service !== "none" ? "option option-click" : "option"
            }
            onClick={() => {
              setMenu({ general: "none", service: "" });
            }}
          >
            <h3
              className={
                menu.service !== "none"
                  ? "option-title option-title-click"
                  : "option-title"
              }
            >
              Dịch vụ
            </h3>
          </div>
        </div>

        <div className="model-box">
          <div style={{ display: menu.general === "" ? null : "none" }}>
            <div className="model-flex">
              <div className="model-column">
                <div className="input-box">
                  <input
                    type="text"
                    className="model-input"
                    placeholder="Tên phòng trọ"
                    name="name"
                    value={input.name}
                    onChange={onChange}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    meeting_room
                  </span>
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    className="model-input"
                    placeholder="Giá (VND)"
                    name="price"
                    value={input.price}
                    onChange={onChange}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    money{" "}
                  </span>
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    className="model-input"
                    placeholder="Diện tích (m2)"
                    name="area"
                    value={input.area}
                    onChange={onChange}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    store
                  </span>
                </div>
                <input
                  type="radio"
                  name="checkGacMai"
                  value={1}
                  checked={input.checkGacMai === "1"}
                  onChange={onChange}
                />
                <label
                  onClick={() => setInput({ ...input, checkGacMai: "1" })}
                  style={{ fontFamily: "Roboto-Regular" }}
                >
                  Có gác xếp
                </label>
                <br />
              </div>
              <div className="model-column">
                {location.state !== undefined ? (
                  <div className="input-box">
                    <input
                      className="model-input"
                      name="area"
                      value={location.state.name}
                      disabled
                      onChange={() => {}}
                    />
                    <span
                      className="material-icons icon"
                      style={{ fontSize: "22px", color: "#828282" }}
                    >
                      location_city
                    </span>
                  </div>
                ) : null}
                <div className="textarea-box">
                  <textarea
                    type="text"
                    className="model-textarea"
                    rows={5}
                    cols={60}
                    placeholder="Thiết bị"
                    name="device"
                    value={input.device}
                    onChange={onChange}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    kitchen
                  </span>
                </div>
                <input
                  type="radio"
                  name="checkGacMai"
                  value={0}
                  checked={input.checkGacMai === "0"}
                  onChange={onChange}
                />
                <label
                  onClick={() => setInput({ ...input, checkGacMai: "0" })}
                  style={{ fontFamily: "Roboto-Regular" }}
                >
                  Không có gác xếp
                </label>
                <br />
              </div>
            </div>

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
                        className="displayed-image"
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

            <div className="input-box">
              <div className="box-btn">
                <div className="btn2"></div>
                <button
                  className="btn"
                  onClick={() => {
                    setMenu({ general: "none", service: "" });
                  }}
                >
                  <i className="material-icons" id="icon-btn">
                    play_circle_filled
                  </i>
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: menu.service === "" ? null : "none" }}>
            <div style={{ display: "grid", marginTop: 10 }}>
              {loadService()}
            </div>

            {error === "" ? null : (
              <Notification type="error" content={error} />
            )}
            <div className="input-box">
              <p className="text-huy" onClick={() => closeModal()}>
                Hủy
              </p>
              <div className="box-btn">
                <div className="btn2"></div>
                <button className="btn" onClick={() => handleImageUpload(0)}>
                  <i className="material-icons" id="icon-btn">
                    add_circle
                  </i>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Rodal>

      <Rodal
        visible={modalEdit.status}
        animation={"slideUp"}
        customStyles={{
          marginTop: 20,
          width: 600,
          height: 640,
          backgroundColor: "white",
          borderRadius: 12,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Chỉnh sửa phòng trọ</p>
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModalEdit()}
          >
            close
          </span>
        </div>

        <div
          className="row"
          style={{ justifyContent: "flex-start", paddingLeft: 25 }}
        >
          <div
            className={
              menu.general !== "none" ? "option option-click" : "option"
            }
            onClick={() => {
              setMenu({ general: "", service: "none" });
            }}
          >
            <h3
              className={
                menu.general !== "none"
                  ? "option-title option-title-click"
                  : "option-title"
              }
            >
              Thông tin chung
            </h3>
          </div>
          <div
            className={
              menu.service !== "none" ? "option option-click" : "option"
            }
            onClick={() => {
              setMenu({ general: "none", service: "" });
            }}
          >
            <h3
              className={
                menu.service !== "none"
                  ? "option-title option-title-click"
                  : "option-title"
              }
            >
              Dịch vụ
            </h3>
          </div>
        </div>

        <div className="model-box">
          <div style={{ display: menu.general === "" ? null : "none" }}>
            <div className="model-flex">
              <div className="model-column">
                <div className="input-box">
                  <input
                    type="text"
                    className="model-input"
                    placeholder="Tên phòng trọ"
                    name="name"
                    value={modalEdit.content.name}
                    onChange={onChangeEdit}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    meeting_room
                  </span>
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    className="model-input"
                    placeholder="Giá (VND)"
                    name="price"
                    value={modalEdit.content.price}
                    onChange={onChangeEdit}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    money{" "}
                  </span>
                </div>
                <div className="input-box">
                  <input
                    type="number"
                    className="model-input"
                    placeholder="Diện tích (m2)"
                    name="area"
                    value={modalEdit.content.area}
                    onChange={onChangeEdit}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    store
                  </span>
                </div>
                <input
                  type="radio"
                  name="rooftop"
                  value={true}
                  checked={modalEdit.content.rooftop === true}
                  onChange={onChangeEdit}
                />
                <label
                  onClick={() =>
                    setModalEdit({
                      status: modalEdit.status,
                      content: { ...modalEdit.content, rooftop: true },
                    })
                  }
                  style={{ fontFamily: "Roboto-Regular" }}
                >
                  Có gác xếp
                </label>
                <br />
              </div>
              <div className="model-column">
                {location.state !== undefined ? (
                  <div className="input-box">
                    <input
                      className="model-input"
                      name="area"
                      value={location.state.name}
                      disabled
                      onChange={() => {}}
                    />
                    <span
                      className="material-icons icon"
                      style={{ fontSize: "22px", color: "#828282" }}
                    >
                      location_city
                    </span>
                  </div>
                ) : null}
                <div className="textarea-box">
                  <textarea
                    type="text"
                    className="model-textarea"
                    rows={5}
                    cols={60}
                    placeholder="Thiết bị"
                    name="device"
                    value={modalEdit.content.device}
                    onChange={onChangeEdit}
                  />
                  <span
                    className="material-icons icon"
                    style={{ fontSize: "22px", color: "#828282" }}
                  >
                    kitchen
                  </span>
                </div>
                <input
                  type="radio"
                  name="rooftop"
                  value={false}
                  checked={modalEdit.content.rooftop === false}
                  onChange={onChangeEdit}
                />
                <label
                  onClick={() =>
                    setModalEdit({
                      status: modalEdit.status,
                      content: { ...modalEdit.content, rooftop: false },
                    })
                  }
                  style={{ fontFamily: "Roboto-Regular" }}
                >
                  Không có gác xếp
                </label>
                <br />
              </div>
            </div>

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
                        className="displayed-image"
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

            <div className="input-box">
              <div className="box-btn">
                <div className="btn2"></div>
                <button
                  className="btn"
                  onClick={() => {
                    setMenu({ general: "none", service: "" });
                  }}
                >
                  <i className="material-icons" id="icon-btn">
                    play_circle_filled
                  </i>
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: menu.service === "" ? null : "none" }}>
            <div style={{ display: "grid", marginTop: 10 }}>
              {loadServiceEdit()}
            </div>

            {error === "" ? null : (
              <Notification type="error" content={error} />
            )}
            <div className="input-box">
              <p className="text-huy" onClick={() => closeModalEdit()}>
                Hủy
              </p>
              <div className="box-btn">
                <div className="btn2"></div>
                <button className="btn" onClick={() => handleImageUpload(1)}>
                  <i className="material-icons" id="icon-btn">
                    add_circle
                  </i>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Rodal>

      <Rodal
        visible={modalDelete.status}
        animation={"slideUp"}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="modal-title">
          Xóa phòng
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() =>
              setModalDelete({ id: "", content: { name: "", id: "" } })
            }
          >
            close
          </span>
        </div>

        <span className="modal-content">
          Bạn có chắc muốn xóa phòng {modalDelete.content.name} của dãy{" "}
          {location.state.name}?
        </span>

        <div className="input-box" style={{ marginTop: 70 }}>
          <p
            className="text-huy"
            onClick={() =>
              setModalDelete({ id: "", content: { name: "", id: "" } })
            }
          >
            Hủy
          </p>
          <div className="box-btn" onClick={() => deleteRoom()}>
            <button className="btn2"></button>
            <button className="btn">Xóa</button>
          </div>
        </div>
      </Rodal>

      <ModalLogin status={tokenStatus} />
    </div>
  );
}
