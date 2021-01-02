import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import Dropdown from "react-dropdown";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";

import "react-dropdown/style.css";
import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";
import Global from "../Global";
import Notification from "../Notification";

export default function ThongBao() {
  useEffect(() => {
    if (user.length !== 0) {
      getNotification();
    }
  }, []);

  const user = useSelector((state) => state.ID);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [optionsDestinationBlock, setOptionsDestinationBlock] = useState([]);
  const [optionsDestinationRoom, setOptionsDestinationRoom] = useState([]);
  const [input, setInput] = useState({
    content: "",
    type: "all",
    destination: "Tất cả",
  });
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [error, setError] = useState("");

  const CreateNotification = () => {
    var type = "All";
    if (input.type === "block") {
      type = "Block";
    } else if (input.type === "room") {
      type = "Room";
    }

    var data = {};
    if (input.type !== "all") {
      data = {
        type: type,
        deliveryId: input.destination,
        content: input.content,
        userId: user.user.user._id,
      };
    } else {
      data = {
        type: type,
        content: input.content,
        userId: user.user.user._id,
      };
    }
    const token = user.user.token;
    const url = Global.server + "notification/create";
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
          //getNotification();
          closeModal();
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

  const closeModal = () => {
    setInput({ content: "", type: "all", destination: "Tất cả" });
    setError("");
    setModal(false);
  };

  const optionsType = [
    { value: "all", label: "Tất cả" },
    { value: "block", label: "Dãy" },
    { value: "room", label: "Phòng" },
  ];

  var optionsDestination = [];
  if (input.type === "block") {
    optionsDestination = optionsDestinationBlock;
  } else if (input.type === "room") {
    optionsDestination = optionsDestinationRoom;
  }

  function onSelectType(option) {
    if (option.value === "all") {
      setInput({ ...input, destination: "Tất cả" });
    } else if (option.value === "room") {
      getRoom();
    }
    setInput({ ...input, type: option.value, destination: "" });
  }

  function onSelectDestination(option) {
    setInput({ ...input, destination: option.value });
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
          setOptionsDestinationBlock(newBlock);
        }
      })
      .catch((error) => {});
  };

  const getRoom = () => {
    const data = {
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "room/getallroombyuserid";
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
            for (let j = 0; j < res.data.Room[index].length; j++) {
              newRoom.push({
                label: res.data.Room[index][j].name,
                value: res.data.Room[index][j]._id,
              });
            }
          }
          setOptionsDestinationRoom(newRoom);
        }
      })
      .catch((error) => {});
  };

  const getNotification = () => {
    const data = {
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "notification/getnotibyadminid";
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
          setData(res.data.Notification);
          setName(res.data.Name);
        }
      })
      .catch((error) => {});
  };

  const loadNotification = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((notification, index) => {
        return (
          <tr key={index}>
            <td>{Global.formatFullDate(notification.createdAt)}</td>
            <td>
              {notification.content}
            </td>
            <td>{notification.type === "All" ? "Tất cả" : name.length > 0 ? name[index].name : ""}</td>
          </tr>
        );
      });
    }
    return result;
  };

  return (
    <div className="yeucau">
      <div className="row">
        <h3>Thông báo</h3>
        <div className="row">
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
              {loadNotification()}
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
          height: 430,
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
                  controlClassName="dropdown-modal-medium"
                  menuClassName="menu-modal-medium"
                  arrowClassName="arrow-modal-short"
                  options={optionsType}
                  onChange={onSelectType}
                  value={input.type}
                />
              </div>
            </div>
            <div className="model-column">
              <div className="input-box">
                <Dropdown
                  controlClassName="dropdown-modal-medium"
                  menuClassName="menu-modal-medium dropdown-menu-medium"
                  arrowClassName="arrow-modal-short"
                  options={optionsDestination}
                  onChange={onSelectDestination}
                  value={input.type === "all" ? "Tất cả" : input.destination}
                  disabled={input.type === "all" ? true : false}
                />
              </div>
            </div>
          </div>
          {error === "" ? null : <Notification type="error" content={error} />}
          <div className="input-box">
            <p className="text-huy" onClick={() => closeModal()}>
              Hủy
            </p>
            <div className="box-btn" onClick={() => CreateNotification()}>
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
