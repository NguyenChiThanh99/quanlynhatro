import React, { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

import ModalLogin from "../ModalLogin";

export default function YeuCau() {
  const [modal, setModal] = useState({ status: false, content: true, id: 0 });
  const [tokenStatus, setTokenStatus] = useState(false);

  return (
    <div className="yeucau">
      <div className="row">
        <h3>Yêu cầu</h3>
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
              <tr>
                <td>13:09 11/11/2020</td>
                <td>A1</td>
                <td>Cameron Williamson</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng ống nước vì chỉ số tăng
                  ống nước vì chỉ số tăng
                </td>
                <td>
                  <input type="text" className="ghichu" />
                </td>
                <td onClick={() => setModal({...modal, status: true})} style={{cursor: 'default'}}>
                  <span className="material-icons-round icon3">
                    check_circle
                  </span>
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>A1</td>
                <td>Cameron Williamson</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng ống nước vì chỉ số tăng
                  ống nước vì chỉ số tăng
                </td>
                <td>
                  <input type="text" className="ghichu" />
                </td>
                <td onClick={() => setModal({...modal, status: true})} style={{cursor: 'default'}}>
                  <span className="material-icons-round icon2">cancel</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Rodal
        visible={modal.status}
        animation={"slideUp"}
        showCloseButton={false}
        onClose={() => {}}
      >
        <div className="modal-title">
          Thay đổi trạng thái{" "}
          <span
            className="material-icons icon"
            style={{ fontSize: "22px", color: "#828282", cursor: "pointer" }}
            onClick={() => setModal({...modal, status: false})}
          >
            close
          </span>
        </div>

        <span className="modal-content">
          Bạn có chắc muốn thay đổi trang thái yêu cầu thành{" "}
          {modal.content ? '"Đã hoàn thành"' : '"Chưa hoàn thành"'} ?
        </span>

        <div className="input-box" style={{ marginTop: 70 }}>
          <p className="text-huy" onClick={() =>setModal({...modal, status: false})}>
            Hủy
          </p>
          <div className="box-btn" onClick={() => console.log("Click Yes")}>
            <button className="btn2"></button>
            <button className="btn">Đồng ý</button>
          </div>
        </div>
      </Rodal>
      <ModalLogin status={tokenStatus} />
    </div>
  );
}
