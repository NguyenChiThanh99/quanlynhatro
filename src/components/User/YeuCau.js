import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";
import Notification from "../Notification";
import Global from "../Global";

export default function YeuCau() {
  useEffect(() => {
    if (user.length !== 0) {
      getRequest();
    }
  }, []);

  const user = useSelector((state) => state.ID);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

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
      content: "",
    });
    setError("");
    setModal(false);
  };

  const CreateRequest = () => {
    setLoading2(true)
    const data = {
      content: input.content,
      userId: user.user.user._id,
      blockId: user.user.user.block,
    };
    const token = user.user.token;
    const url = Global.server + "request/create";
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
          getRequest();
          setLoading2(false)
          closeModal();
        }
      })
      .catch((error) => {});
  };

  const getRequest = () => {
    setLoading(true)
    const data = {
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "request/getrequestbyuserid";
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
            setLoading(false)
          }
        } else {
          setData(res.data.Request);
          setLoading(false)
        }
      })
      .catch((error) => {});
  };

  const loadRequest = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((request, index) => {
        return (
          <tr key={index}>
            {/* <td>13:09 11/11/2020</td> */}
            <td>{Global.formatFullDate(request.createdAt)}</td>
            <td>{request.content}</td>
            <td>{request.note}</td>
            <td>
              <span
                className={
                  request.isSolved
                    ? "material-icons-round icon3"
                    : "material-icons-round icon2"
                }
              >
                {request.isSolved ? "check_circle" : "cancel"}
              </span>
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  return (
    <div className="yeucau">
      <div className="row">
        <h3>Danh sách yêu cầu</h3>
        <div className="row">
          {/* Compoent button */}
          <div className="box-btn" onClick={() => setModal(true)}>
            <div className="btn2"></div>
            <button className="btn">
              <i className="material-icons-round" id="icon-btn">
                add_circle
              </i>
              Thêm yêu cầu
            </button>
          </div>
        </div>
      </div>

      <div className="body" style={{ height: "80vh", overflowY: "scroll" }}>
        {loading ? (
          <div className="loading">
            <ReactLoading
              type={"spin"}
              color={"#EE6F57"}
              height={"4%"}
              width={"4%"}
            />
          </div>
        ) : (
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <th className="sort">
                    <p className="sort_text">Ngày yêu cầu</p>
                    <span className="material-icons-round icon">
                      arrow_downward
                    </span>
                  </th>
                  <th>
                    <p>Nội dung</p>
                  </th>
                  <th style={{ whiteSpace: "nowrap" }}>
                    <p>Ghi chú</p>
                  </th>
                  <th style={{ whiteSpace: "nowrap" }}>
                    <p>Trạng thái</p>
                  </th>
                </tr>
                {loadRequest()}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          marginTop: 100,
          width: 450,
          height: 340,
          backgroundColor: "white",
          borderRadius: 12,
        }}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="title-box">
          <p className="title-text">Thêm yêu cầu</p>
          <span
            onClick={() => closeModal()}
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "default" }}
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

          {error === "" ? null : <Notification type="error" content={error} />}
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
            <div
              className="box-btn"
              onClick={() => {
                CreateRequest();
              }}
            >
              <button className="btn2"></button>
              <button className="btn">Gửi</button>
            </div>
          </div>
        </div>
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
