import React, { useState } from "react";

export default function DichVu() {
  const [input, setInput] = useState({ dien: "vnd/kWh", nuoc: "vnd/m3" });

  const onChange = (event) => {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    setInput({
      ...input,
      [name]: value,
    });
  };

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
                  <select
                    value={input.dien}
                    onChange={onChange}
                    className="dropdown-diennuoc"
                    name="dien"
                  >
                    <option value="vnd/kWh">VND / kWh</option>
                    <option value="vnd/thang">VND / Tháng</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Nước</p>
                </td>
                <td>
                  <input type="text" className="ghichu" disabled />
                  <select
                    value={input.nuoc}
                    onChange={onChange}
                    className="dropdown-diennuoc"
                    name="nuoc"
                    disabled
                  >
                    <option value="vnd/m3">VND / m3</option>
                    <option value="vnd/thang">VND / Tháng</option>
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
