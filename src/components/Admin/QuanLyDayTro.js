import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import Rodal from "rodal";
import { useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";

import "../../App.css";
import "rodal/lib/rodal.css";

import Notification from "../Notification";
import Global from "../Global";
import ModalLogin from "../ModalLogin";

export default function QuanLyDayTro() {
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [room, setRoom] = useState([]);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);
  const [file, setFile] = useState({ name: "*PNG, JPG, JPEG" });
  const [input, setInput] = useState({ daytro: "" });
  let history = useHistory();
  const user = useSelector((state) => state.ID);

  useEffect(() => {
    if (user.length !== 0) {
      getBlock();
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
        CreateBlock(res.secure_url);
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
    setInput({ daytro: "" });
    setModal(false);
    setError("");
  };

  const CreateBlock = (image) => {
    const data = {
      name: input.daytro,
      image: image,
      contact: "ChiThanh",
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "block/create";
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
          getBlock();
          closeModal();
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
            closeModal();
            setTokenStatus(true);
          }
        } else {
          setData(res.data.Block);
          setRoom(res.data.Room)
        }
      })
      .catch((error) => {});
  };

  const loadBlock = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((block, index) => {
        return (
          <div
            className="card"
            key={index}
            onClick={() => {
              history.push({ pathname: "/admin/quanlyphongtro", state: block });
            }}
          >
            <img src={block.image} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>{block.name}</h4>
              <span>Dãy trọ có {room[index]} phòng trọ</span>
            </div>
          </div>
        );
      });
    }
    return result;
  };

  return (
    <div className="quanlydaytro">
      <div className="row">
        <h3 style={{ color: "#151515" }}>Tất cả dãy trọ</h3>
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
          <div className="box-btn" onClick={() => setModal(true)}>
            <div className="btn2"></div>
            <button className="btn">
              <i className="material-icons-round" id="icon-btn">
                add_circle
              </i>
              Thêm dãy mới
            </button>
          </div>
        </div>
      </div>
      <div className="array-item">{loadBlock()}</div>

      {/* Modal */}
      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          width: 425,
          height: 475,
          background: "white",
          borderRadius: 8,
          padding: 0,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thêm dãy trọ</p>
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
            <input
              className="model-input"
              placeholder="Tên dãy trọ"
              name="daytro"
              value={input.daytro}
              onChange={onChange}
            />
            <span
              className="material-icons icon"
              style={{ fontSize: "22px", color: "#828282" }}
            >
              location_city
            </span>
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

          {error === "" ? null : <Notification type="error" content={error} />}

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
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
