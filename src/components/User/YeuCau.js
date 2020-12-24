import React, { useState } from "react";
import Rodal from "rodal";

import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";

export default function YeuCau() {
  const [tokenStatus, setTokenStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    content: '',
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
    setInput({
      content: '',
    });
    setModal(false);
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
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đã fix</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td></td>
                <td>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đang sửa chữa</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đã fix</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td></td>
                <td>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đang sửa chữa</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đã fix</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td></td>
                <td>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đang sửa chữa</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đã fix</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td></td>
                <td>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đang sửa chữa</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đã fix</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td></td>
                <td>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đang sửa chữa</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đã fix</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td></td>
                <td>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đang sửa chữa</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đã fix</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td></td>
                <td>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
                <td>Đang sửa chữa</td>
                <td>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Rodal
        visible={modal}
        animation={"slideUp"}
        customStyles={{
          marginTop: 50,
          width: 425,
          height: 300,
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
