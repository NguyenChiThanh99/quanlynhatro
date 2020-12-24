import React, { useState } from "react";
import Rodal from "rodal";
import Dropdown from "react-dropdown";

import "react-dropdown/style.css";
import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";

export default function ThongBao() {
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    content: "",
    type: "day",
    destination: "daya",
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
    setInput({ content: "", type: "day", destination: "daya" });
    setModal(false);
  };

  const optionsType = [
    { value: "day", label: "Dãy" },
    { value: "phong", label: "Phòng" },
    { value: "nguoi", label: "Người" },
  ];
  const optionsDestination = [
    { value: "daya", label: "Dãy A" },
    { value: "dayb", label: "Dãy B" },
  ];
  function onSelectType(option) {
    setInput({ ...input, type: option.value });
  }
  function onSelectDestination(option) {
    setInput({ ...input, destination: option.value });
  }

  return (
    <div className="yeucau">
      <div className="row">
        <h3>Thông báo</h3>
        <div className="row">
          {/* Compoent button */}
          <div className="box-btn" onClick={() => setModal(true)}>
            <div className="btn2"></div>
            <button className="btn">
              <i className="material-icons-round" id="icon-btn">
                add_circle
              </i>
              Thêm thông báo
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
                  <p className="sort_text">Thời gian</p>
                  <span className="material-icons-round icon">
                    arrow_downward
                  </span>
                </th>
                <th>
                  <p>Nội dung</p>
                </th>
                <th style={{ whiteSpace: "nowrap" }}>
                  <p>Người nhận</p>
                </th>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Dãy A</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Phòng A1</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Tất cả</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Phòng A1</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Tất cả</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Phòng A1</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Tất cả</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Phòng A1</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Tất cả</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Phòng A1</td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Tất cả</td>
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
          marginTop: 80,
          width: 400,
          height: 360,
          backgroundColor: "white",
          borderRadius: 12,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thêm thông báo</p>
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "default" }}
            onClick={() => closeModal()}
          >
            close
          </span>
        </div>

        <div className="model-box">
          <div className="textarea-box">
            <textarea
              className="model-textarea"
              rows={5}
              cols={60}
              name="content"
              value={input.content}
              type="text"
              onChange={onChange}
              placeholder="Nội dung"
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              edit
            </span>
          </div>
          <div className="model-flex">
            <div className="model-column">
              <div className="input-box">
                <Dropdown
                  controlClassName="dropdown-medium"
                  menuClassName="menu-medium"
                  arrowClassName="arrow-medium"
                  options={optionsType}
                  onChange={onSelectType}
                  value={input.type}
                />
              </div>
            </div>
            <div className="model-column">
              <div className="input-box">
                <Dropdown
                  controlClassName="dropdown-medium"
                  menuClassName="menu-medium"
                  arrowClassName="arrow-medium"
                  options={optionsDestination}
                  onChange={onSelectDestination}
                  value={input.destination}
                />
              </div>
            </div>
          </div>
          <div className="input-box">
            <p className="text-huy" onClick={() => closeModal()}>
              Hủy
            </p>
            <div className="box-btn">
              <button className="btn2"></button>
              <button className="btn">Thêm</button>
            </div>
          </div>
        </div>
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
