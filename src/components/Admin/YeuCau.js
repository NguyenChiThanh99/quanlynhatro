import React from "react";

export default function YeuCau() {
  return (
    <div className="yeucau">
      <div className="row">
        <h3>Yêu cầu</h3>
      </div>
      <div className="body">
        <div className="table">
          <table>
            <tbody>
              <tr>
                <th className="sort">
                  <p className="sort_text">Thời gian</p>
                  <span className="material-icons icon">arrow_downward</span>
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
                <th>
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
                <td>
                  <span className="material-icons icon2">cancel</span>
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
                <td>
                  <span className="material-icons icon2">cancel</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
