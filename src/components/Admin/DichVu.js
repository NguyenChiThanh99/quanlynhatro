import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import Rodal from "rodal";
import axios from "axios";
import { useSelector } from "react-redux";
import qs from "qs";

import "react-dropdown/style.css";
import "rodal/lib/rodal.css";

import Notification from "../Notification";
import Global from "../Global";
import ModalLogin from "../ModalLogin";

export default function DichVu() {
  const user = useSelector((state) => state.ID);
  const [input, setInput] = useState({
    type: "",
    price: "",
    unit: "",
    name: "",
  });
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [modalEdit, setModalEdit] = useState({status: false, content: {name: "", price: "", calculate: ""}});

  useEffect(() => {
    if (user.length !== 0) {
      getService();
    }
  }, []);

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
    var value = target.value;
    setModalEdit({...modalEdit, content: {...modalEdit.content, price: value}})
  };

  const closeModal = () => {
    setInput({ type: "", price: "", unit: "", name: "" });
    setModal(false);
    setError("");
  };

  const closeModalEdit = () => {
    setModalEdit({status: false, content: {name: "", price: "", calculate: ""}});
    setError("");
  };

  const optionsDien = ["VND / kWh", "VND / Tháng"];
  const optionsNuoc = ["VND / m3", "VND / Tháng"];
  function onSelectDien(option) {
    setInput({ ...input, unit: option.value });
  }
  function onSelectNuoc(option) {
    setInput({ ...input, unit: option.value });
  }
  function onSelectEdit(option) {
    setModalEdit({...modalEdit, content: {...modalEdit.content, calculate: option.value}})
  }

  const optionsType = [
    [
      { value: "dien", label: "Điện" },
      { value: "nuoc", label: "Nước" },
      { value: "khac", label: "Khác" },
    ],
    [{ value: "khac", label: "Khác" }],
    [
      { value: "nuoc", label: "Nước" },
      { value: "khac", label: "Khác" },
    ],
    [
      { value: "dien", label: "Điện" },
      { value: "khac", label: "Khác" },
    ],
  ];
  const loadOptionType = () => {
    if (
      data.find((service) => service.name === "Điện") !== undefined &&
      data.find((service) => service.name === "Nước") !== undefined
    ) {
      return optionsType[1];
    } else if (data.find((service) => service.name === "Điện") !== undefined) {
      return optionsType[2];
    } else if (data.find((service) => service.name === "Nước") !== undefined) {
      return optionsType[3];
    } else {
      return optionsType[0];
    }
  };

  function onSelectType(option) {
    if (option.value !== "khac") {
      setInput({ type: option.value, name: option.label, unit: "", price: "" });
    } else {
      setInput({
        type: option.value,
        name: "",
        unit: "VND / Tháng",
        price: "",
      });
    }
  }

  const CreateService = () => {
    const data = {
      name: input.name,
      price: input.price,
      calculate: input.unit,
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "service/create";
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
          getService();
          closeModal();
        }
      })
      .catch((error) => {});
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
          }
        } else if (res.data.message === "Service rỗng") {
          setData([]);
        } else {
          setData(res.data.Service);
        }
      })
      .catch((error) => {});
  };

  const loadService = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((service, index) => {
        return (
          <tr key={index}>
            <td>
              <p>{service.name}</p>
            </td>
            <td>
              <p>{Global.currencyFormat(service.price)}</p>
            </td>
            <td>
              <p>{service.calculate}</p>
            </td>
            <td>
              <span
                className="material-icons icon"
                style={{ cursor: "default" }}
                onClick={() => {setModalEdit({status: true, content: service})}}
              >
                edit
              </span>
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  const editService = () => {
    const data = {
      serviceId: modalEdit.content._id,
      price: modalEdit.content.price,
      calculate: modalEdit.content.calculate,
    };
    const token = user.user.token;
    const url = Global.server + "service/updateservice";
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
            closeModalEdit();
          }
        } else {
          getService()
          closeModalEdit()
        }
      })
      .catch((error) => {});
  }

  return (
    <div className="dichvu">
      <div className="row">
        <h3>Dịch vụ</h3>
        <div className="row">
          {/* Compoent button */}
          <div className="box-btn" onClick={() => setModal(true)}>
            <div className="btn2" style={{ width: 160 }}></div>
            <button className="btn" style={{ width: 160 }}>
              <i className="material-icons-round" id="icon-btn">
                add_circle
              </i>
              Thêm dịch vụ mới
            </button>
          </div>
        </div>
      </div>
      <div className="body" style={{ height: "80vh", overflowY: "scroll" }}>
        <div className="table">
          <table>
            <tbody>
              <tr>
                <th>
                  <p>Dịch vụ</p>
                </th>
                <th>
                  <p>Giá tiền</p>
                </th>
                <th>
                  <p>Đơn vị tính</p>
                </th>
                <th>
                  <p />
                </th>
              </tr>

              {loadService()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          width: 333,
          height: 420,
          background: "white",
          borderRadius: 8,
          padding: 0,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thêm dịch vụ</p>
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            close
          </span>
        </div>
        <div className="model-box">
          <div className="input-box">
            <Dropdown
              placeholder="Loại dịch vụ"
              controlClassName="dropdown-modal"
              menuClassName="menu-modal"
              arrowClassName="arrow-modal"
              options={loadOptionType()}
              onChange={onSelectType}
              value={input.type}
            />
          </div>
          {input.type === "khac" ? (
            <div className="input-box">
              <input
                type="text"
                className="model-input"
                placeholder="Tên dịch vụ"
                name="name"
                value={input.name}
                onChange={onChange}
              />
              <span
                className="material-icons icon"
                style={{ fontSize: "22px", color: "#828282" }}
              >
                service
              </span>
            </div>
          ) : null}
          <div className="input-box">
            <input
              type="number"
              className="model-input"
              placeholder="Giá tiền"
              name="price"
              value={input.price}
              onChange={onChange}
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              monetization_on
            </span>
          </div>
          {input.type !== "khac" ? (
            <div className="input-box">
              <Dropdown
                placeholder="Đơn vị tính"
                controlClassName="dropdown-modal"
                menuClassName="menu-modal"
                arrowClassName="arrow-modal"
                options={input.type === "dien" ? optionsDien : optionsNuoc}
                onChange={input.type === "dien" ? onSelectDien : onSelectNuoc}
                value={input.unit}
              />
            </div>
          ) : null}

          {error === "" ? null : <Notification type="error" content={error} />}

          <div className="input-box">
            <p className="text-huy" onClick={() => closeModal()}>
              Hủy
            </p>
            <div className="box-btn">
              <div className="btn2"></div>
              <button className="btn" onClick={() => CreateService()}>
                <i className="material-icons" id="icon-btn">
                  add_circle
                </i>
                Thêm
              </button>
            </div>
          </div>
        </div>
      </Rodal>
      
      <Rodal
        visible={modalEdit.status}
        animation={"slideUp"}
        customStyles={{
          width: 333,
          height: 350,
          background: "white",
          borderRadius: 8,
          padding: 0,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Dịch vụ {modalEdit.content.name}</p>
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModalEdit()}
          >
            close
          </span>
        </div>
        <div className="model-box">
          <div className="input-box">
            <input
              type="number"
              className="model-input"
              placeholder="Giá tiền"
              name="price"
              value={modalEdit.content.price}
              onChange={onChangeEdit}
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              monetization_on
            </span>
          </div>
          {modalEdit.content.name === "Điện" || modalEdit.content.name === "Nước" ? (
            <div className="input-box">
              <Dropdown
                placeholder="Đơn vị tính"
                controlClassName="dropdown-modal"
                menuClassName="menu-modal"
                arrowClassName="arrow-modal"
                options={modalEdit.content.name === "Điện" ? optionsDien : optionsNuoc}
                onChange={onSelectEdit}
                value={modalEdit.content.calculate}
              />
            </div>
          ) : null}

          {error === "" ? null : <Notification type="error" content={error} />}

          <div className="input-box">
            <p className="text-huy" onClick={() => closeModalEdit()}>
              Hủy
            </p>
            <div className="box-btn">
              <div className="btn2"></div>
              <button className="btn" onClick={() => editService()}>
                <i className="material-icons" id="icon-btn">
                  save
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
