import React from "react";

export default function ThanhToan() {
  return (
    <div className="thanhtoan">
      <div className="row">
        <h3>Thanh toán</h3>
      </div>
      <div className="body">
        <div className="table">
          <table>
            <tbody>
              <tr>
                <th className="sort">
                  <p className="sort_text">Tháng</p>
                  <span className="material-icons icon">arrow_downward</span>
                </th>
                <th>
                  <p>Ngày chốt chỉ số</p>
                </th>
                <th>
                  <p>Chỉ số điện</p>
                </th>
                <th>
                  <p>Chỉ số nước</p>
                </th>
                <th style={{ whiteSpace: "nowrap" }}>
                  <p>Tiền phòng</p>
                </th>
                <th>
                  <p>Thông tin thanh toán</p>
                </th>
              </tr>
              {/* 1 hàng */}
              <tr className="text-top">
                <td className="month" rowSpan={2}>11/2020</td>
                <td className="chotchiso" rowSpan={2}>30/10/2020</td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu: </p>
                      <p className="chiso colorblack">14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối: </p>
                      <p className="chiso colorblack">14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng: </p>
                      <p className="chiso colorblack">110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền: </p>
                      <p className="chiso tien">205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu: </p>
                      <p className="chiso colorblack">14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối: </p>
                      <p className="chiso colorblack">14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng: </p>
                      <p className="chiso colorblack">110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền: </p>
                      <p className="chiso tien">205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td rowSpan={2} className="tien">
                  4.000.000 đ
                </td>
                <td rowSpan={2}>
                  <p className="thanhtoan-status">Chưa thanh toán</p>
                  <div className="box-btn">
                    <div className="btn2"></div>
                    <button className="btn">Thanh toán online</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div>
                    <p
                      className="chiso colorblack"
                      style={{ fontSize: "18px", marginRight: "24px" }}
                    >
                      Tổng cộng: 
                    </p>
                    <p
                      className="chiso"
                      style={{
                        fontSize: "20px",
                        color: "#EE6F57",
                        fontFamily: "Roboto-Bold",
                      }}
                    >
                      4.281.984 đ
                    </p>
                  </div>
                </td>
              </tr>
              {/* hết 1 hàng */}
              {/* 1 hàng */}
              <tr className="text-top">
                <td className="month" rowSpan={2}>11/2020</td>
                <td className="chotchiso" rowSpan={2}>30/10/2020</td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu: </p>
                      <p className="chiso colorblack">14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối: </p>
                      <p className="chiso colorblack">14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng: </p>
                      <p className="chiso colorblack">110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền: </p>
                      <p className="chiso tien">205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu: </p>
                      <p className="chiso colorblack">14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối: </p>
                      <p className="chiso colorblack">14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng: </p>
                      <p className="chiso colorblack">110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền: </p>
                      <p className="chiso tien">205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td rowSpan={2} className="tien">
                  4.000.000 đ
                </td>
                <td rowSpan={2}>
                  <p className="thanhtoan-status">Đã thanh toán</p>
                  <div className="box-btn" style={{ display: "none" }}>
                    <div className="btn2"></div>
                    <button className="btn">Thanh toán online</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div>
                    <p
                      className="chiso colorblack"
                      style={{ fontSize: "18px", marginRight: "24px" }}
                    >
                      Tổng cộng: 
                    </p>
                    <p
                      className="chiso"
                      style={{
                        fontSize: "20px",
                        color: "#EE6F57",
                        fontFamily: "Roboto-Bold",
                      }}
                    >
                      4.281.984 đ
                    </p>
                  </div>
                </td>
              </tr>
              {/* hết 1 hàng */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
