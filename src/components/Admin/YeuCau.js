import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";
import Global from "../Global";

export default function YeuCau() {
  const user = useSelector((state) => state.ID);
  const [modal, setModal] = useState({ status: false, content: null });
  const [tokenStatus, setTokenStatus] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.length !== 0) {
      getRequest();
    }
  }, []);

  const closeModal = () => {
    setModal(false);
    setModal({ status: false, content: null });
  };

  const getRequest = () => {
    setLoading(true)
    const data = {
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "request/getrequestbyadminid";
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
          setData(res.data.Request);
          var req = res.data.Request;
          var result = {};
          for (let i = 0; i < req.length; i++) {
            for (let j = 0; j < req[i].length; j++) {
              var key = req[i][j]._id;
              result = { ...result, [key]: req[i][j].note };
            }
          }
          setInput(result);
          setLoading(false)
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

  const loadRequest = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((block, index) => {
        return block.map((request, indexRequest) => {
          var id = request._id;
          return (
            <tr key={index * block.length + indexRequest}>
              <td>{Global.formatFullDate(request.createdAt)}</td>
              <td>{request.userId.room.name}</td>
              <td>{request.userId.name}</td>
              <td>{request.content}</td>
              <td>
                <input
                  type="text"
                  className="ghichu"
                  name={id}
                  value={input[id]}
                  onChange={onChange}
                  onBlur={() => changeNote(id)}
                />
              </td>
              <td
                onClick={() => {
                  if (!request.isSolved) {
                    setModal({ status: true, content: request });
                  }
                }}
                style={{ cursor: "default" }}
              >
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
      });
    }
    return result;
  };

  const changeStatus = () => {
    const data = {
      requestId: modal.content._id,
      isSolved: true,
    };
    const token = user.user.token;
    const url = Global.server + "request/updaterequest";
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
          getRequest();
          closeModal();
        }
      })
      .catch((error) => {});
  };

  const changeNote = (id) => {
    const data = {
      requestId: id,
      note: input[id],
    };
    const token = user.user.token;
    const url = Global.server + "request/updaterequest";
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
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="yeucau">
      <div className="row">
        <h3>Yêu cầu</h3>
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
                    <p className="sort_text">Thời gian</p>
                    <span className="material-icons-round icon">
                      arrow_downward
                    </span>
                  </th>
                  <th>
                    <p>Phòng</p>
                  </th>
                  <th>
                    <p>Người tạo</p>
                  </th>
                  <th>
                    <p>Nội dung</p>
                  </th>
                  <th>
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
        visible={modal.status}
        animation={"slideUp"}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="modal-title">
          Thay đổi trạng thái yêu cầu
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => closeModal()}
          >
            close
          </span>
        </div>

        <span className="modal-content">
          Bạn có chắc muốn thay đổi trạng thái yêu cầu thành "Đã xử lý"?
        </span>

        
        <div className="input-box" style={{ marginTop: 70 }}>
          <p
            className="text-huy"
            onClick={() => setModal({ ...modal, status: false })}
          >
            Hủy
          </p>
          <div className="box-btn" onClick={() => changeStatus()}>
            <button className="btn2"></button>
            <button className="btn">Đồng ý {true ? (
              <div className="loading2">
                <ReactLoading
                  type={"spin"}
                  color={"#EE6F57"}
                  height={"5%"}
                  width={"5%"}
                />
              </div>
            ) : null}</button>
          </div>
        </div>
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
