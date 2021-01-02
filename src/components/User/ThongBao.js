import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

import ModalLogin from "../ModalLogin";
import Global from "../Global";

export default function ThongBao() {
  const [tokenStatus, setTokenStatus] = useState(false);
  const user = useSelector((state) => state.ID);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.length !== 0) {
      getNotification();
    }
  }, []);

  const getNotification = () => {
    setLoading(true)
    const data = {
      roomId: user.user.user.room,
      blockId: user.user.user.block,
    };
    const token = user.user.token;
    const url = Global.server + "notification/getnotibyblockandroomid";
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
          }
        } else {
          setData(res.data.Notification);
          setLoading(false)
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
            <td>{notification.content}</td>
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
                    <p className="sort_text">Ngày thông báo</p>
                    <span className="material-icons-round icon">
                      arrow_downward
                    </span>
                  </th>
                  <th>
                    <p>Nội dung</p>
                  </th>
                </tr>
                {loadNotification()}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalLogin status={tokenStatus} />
    </div>
  );
}
