import React from "react";
import { DropdownButton, Dropdown } from 'react-bootstrap';

export default function DichVu() {
  return (
    <div className="dichvu">
      <div className="row">
        <h3>Dịch vụ</h3>
        <div className="row">
          {/* Compoent button */}
          <div className="box-btn">
            <div className="btn2"></div>
            <button className="btn">
              <i className="material-icons-round" id="icon-btn">
                edit
                {/* check_circle */}
              </i>
              {/* Thay đổi */}
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div className="body" style={{ height: "80vh", overflowY: "scroll" }}>
        <div className="table">
          <table>
            <tbody>
              <tr>
                <th>
                  <p>Dịch vụ</p>
                </th>
                <th>
                  <p>Giá / tháng</p>
                </th>
              </tr>
              <tr>
                <td>
                  <p>Điện</p>
                </td>
                <td>
                  <input type="text" className="ghichu" />
                  <select value="Radish" className="dropdown-diennuoc">
                    <option value="vnd / kWh">VND / kWh</option>
                    <option value="vnd / thang">VND / Tháng</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Nước</p>
                </td>
                <td>
                  <input type="text" className="ghichu" disabled />
                  <select value="Radish" className="dropdown-diennuoc" disabled>
                    <option value="vnd / kWh">VND / kWh</option>
                    <option value="vnd / thang">VND / Tháng</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" className="ghichu" disabled />
                </td>
                <td>
                  <input type="text" className="ghichu" disabled />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
