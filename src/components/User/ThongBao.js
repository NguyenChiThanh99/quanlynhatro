import React, {useState} from "react";

import ModalLogin from "../ModalLogin";

export default function ThongBao() {
  const [tokenStatus, setTokenStatus] = useState(false);
  return (
    <div className="yeucau">
      <div className="row">
        <h3>Thông báo</h3>
      </div>
      <div className="body" style={{ height: '80vh', overflowY: 'scroll' }}>
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
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
              <tr>
                <td>13:09 11/11/2020</td>
                <td>
                  Kiểm tra đường ống nước vì chỉ số tăng đường ống nước đường
                  ống nước đường ống nước đường ống nước đường ống nước đường
                  ống nước đường ống nước
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ModalLogin status={tokenStatus} />
    </div>
  );
}
