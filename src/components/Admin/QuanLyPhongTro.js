import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import Rodal from "rodal";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import Dropdown from "react-dropdown";
import ReactLoading from "react-loading";

import "rodal/lib/rodal.css";
import "react-dropdown/style.css";

import Notification from "../Notification";
import Global from "../Global";
import ModalLogin from "../ModalLogin";

export default function QuanLyPhongTro() {
  let history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.ID);

  useEffect(() => {
    if (user.length !== 0) {
      if (location.state !== undefined) {
        getRoom();
      } else {
        getAllRoom();
      }
    }
  }, []);

  const [menu, setMenu] = useState({
    general: "",
    service: "none",
  });
  const [tokenStatus, setTokenStatus] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [person, setPerson] = useState([]);
  const [Block, setBlock] = useState([]);
  const [Service, setService] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);
  const [file, setFile] = useState({ name: "*PNG, JPG, JPEG" });
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [input, setInput] = useState({
    name: "",
    price: "",
    area: "",
    block: location.state !== undefined ? location.state._id : "",
    device: "",
    checkGacMai: "1",
  });
  const [ServiceInput, setServiceInput] = useState({});

  const CreateRoom = (image) => {
    setLoading2(true)
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
            setTokenStatus(true);
            setLoading2(false)
          } else {
            setError(res.data.message);
            setLoading2(false)
          }
        } else {
          closeModal();
          setLoading2(false)
          if (location.state !== undefined) {
            getRoom();
          } else {
            getAllRoom();
          }
        }
      })
      .catch((error) => {});
  };

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

  function onSelectType(option) {
    setInput({ ...input, block: option.value });
  }

  const getRoom = () => {
    setLoading(true)
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
            setLoading(false)
            closeModal();
          }
        } else {
          setData(res.data.Room);
          setPerson(res.data.Person);
          setLoading(false)
        }
      })
      .catch((error) => {});
  };

  const getAllRoom = () => {
    setLoading(true)
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
            setLoading(false)
          }
        } else {
          setData(res.data.Room);
          setPerson(res.data.Person);
          setLoading(false)
        }
      })
      .catch((error) => {});
  };

  const loadRoom = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((room, index) => {
        return (
          <div
            className="card"
            key={index}
            onClick={() => {
              history.push({
                pathname: "/admin/quanlynguoi",
                state: { room: room },
              });
            }}
          >
            <img src={room.image} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>{room.name}</h4>
              <span>Phòng trọ có {person[index]} thành viên</span>
            </div>
          </div>
        );
      });
    }
    return result;
  };

  const loadAllRoom = () => {
    var result = null;
    if (data.length > 0 && person.length > 0) {
      result = data.map((block, index) => {
        return block.map((room, indexRoom) => {
          return (
            <div
              className="card"
              key={index * block.length + indexRoom}
              onClick={() => {
                history.push({
                  pathname: "/admin/quanlynguoi",
                  state: { room: room },
                });
              }}
            >
              <img src={room.image} alt="IMG" id="img-card" />
              <div className="box-name">
                <h4>{room.name}</h4>
                <span>Phòng trọ có {person[index][indexRoom]} thành viên</span>
              </div>
            </div>
          );
        });
      });
    }
    return result;
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

  const onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
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
        CreateRoom(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    const objectUrl = URL.createObjectURL(acceptedFiles[0]);
    setImageUrl(objectUrl);
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
          setService([]);
        } else {
          setService(res.data.Service);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="quanlydaytro">
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
              className="block"
              onClick={() => {
                history.push({
                  pathname: "/admin/quanlydaytro/daytrodetail",
                  state: location.state,
                });
              }}
            >
              {location.state.name}
            </h3>
          </div>
        ) : (
          <h3 style={{ color: "#151515" }}>Tất cả phòng trọ</h3>
        )}

        <div className="row">
          <p className="dropdown" style={{display: 'none'}}>Mới nhất</p>
          <i
            className="material-icons-round"
            style={{
              padding: "0px 20px 0px 10px",
              color: "#333333",
              alignSelf: "center",
              display: "none"
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
      
      {loading ? (
        <div className="loading">
          <ReactLoading
            type={"spin"}
            color={"#EE6F57"}
            height={"4%"}
            width={"4%"}
          />
        </div>
      ) : null}
      <div className="array-item">
        {location.state !== undefined ? loadRoom() : loadAllRoom()}
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
                    />
                    <span
                      className="material-icons icon"
                      style={{ fontSize: "22px", color: "#828282" }}
                    >
                      location_city
                    </span>
                  </div>
                ) : (
                  <div className="input-box">
                    <Dropdown
                      placeholder="Dãy trọ"
                      controlClassName="dropdown-modal-them-phong"
                      menuClassName="menu-modal"
                      arrowClassName="arrow-modal"
                      options={Block}
                      onChange={onSelectType}
                      value={input.block}
                    />
                  </div>
                )}
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
            {loading2 ? (
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
              <p className="text-huy" onClick={() => closeModal()}>
                Hủy
              </p>
              <div className="box-btn">
                <div className="btn2"></div>
                <button className="btn" onClick={handleImageUpload}>
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
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
