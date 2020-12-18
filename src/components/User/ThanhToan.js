import React from "react";

export default function ThanhToan() {
  return (
    <div className="thanhtoan">
      <div className="row">
        <h3>Thanh toán</h3>
      </div>
      <div className="body" style={{ height: "80vh", overflowY: "scroll" }}>
        <div className="table">
          <table>
            {/* tiêu đề */}
            <tbody>
              <tr>
                <th className="sort" rowSpan={2}>
                  <p className="sort_text">Tháng</p>
                  <span className="material-icons icon">arrow_downward</span>
                </th>
                <th rowSpan={2}>
                  <p>Ngày chốt chỉ số</p>
                </th>
                <th colSpan={3} style={{ textAlign: "center" }}>
                  <p>Dịch vụ</p>
                </th>
                <th rowSpan={2}>
                  <p>Tiền phòng</p>
                </th>
                <th rowSpan={2}>
                  <p>Thông tin thanh toán</p>
                </th>
              </tr>
              <tr>
                <th>
                  <p>Điện</p>
                </th>
                <th>
                  <p>Nước</p>
                </th>
                <th style={{ whiteSpace: "nowrap" }}>
                  <p>Dịch vụ khác</p>
                </th>
              </tr>
              {/* hết tiêu đề */}
              {/* 1 hàng */}
              <tr className="text-top">
                <td rowSpan={2}>
                  <p className="colorblack">12/2020</p>
                </td>
                <td rowSpan={2} className="ngaychot">
                  30/10/2020
                </td>
                <td>
                  <div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso">Chỉ số đầu:</p>
                      <p className="chiso colorblack"> 14283 Kw/h</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso">Chỉ số cuối:</p>
                      <p className="chiso colorblack"> 14393 Kw/h</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso">Sử dụng:</p>
                      <p className="chiso colorblack"> 110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền:</p>
                      <p className="chiso tien"> 205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso">Chỉ số đầu:</p>
                      <p className="chiso colorblack"> 14283 Kw/h</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso">Chỉ số cuối:</p>
                      <p className="chiso colorblack"> 14393 Kw/h</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso">Sử dụng:</p>
                      <p className="chiso colorblack"> 110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền:</p>
                      <p className="chiso tien"> 205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Wifi:</p>
                      <p className="chiso tien"> 150.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Vệ sinh:</p>
                      <p className="chiso tien"> 100.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">An ninh:</p>
                      <p className="chiso tien"> 50.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Gửi xe:</p>
                      <p className="chiso tien"> 70.000 đ</p>
                    </div>
                  </div>
                </td>
                <td rowSpan={2}>
                  <p className="chiso tien" style={{ whiteSpace: "nowrap" }}>
                    4.000.000 đ
                  </p>
                </td>
                <td rowSpan={2}>
                  <p style={{ whiteSpace: "nowrap" }} className="status">
                    Chưa thanh toán
                  </p>
                  <div className="box-btn">
                    <div className="btn2"></div>
                    <button className="btn">Thanh toán online</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="tongcong">
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
                <td rowSpan={2}>
                  <p className="colorblack">11/2020</p>
                </td>
                <td rowSpan={2} className="ngaychot">
                  30/10/2020
                </td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu:</p>
                      <p className="chiso colorblack"> 14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối:</p>
                      <p className="chiso colorblack"> 14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng:</p>
                      <p className="chiso colorblack"> 110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền:</p>
                      <p className="chiso tien"> 205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu:</p>
                      <p className="chiso colorblack"> 14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối:</p>
                      <p className="chiso colorblack"> 14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng:</p>
                      <p className="chiso colorblack"> 110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền:</p>
                      <p className="chiso tien"> 205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Wifi:</p>
                      <p className="chiso tien"> 150.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Vệ sinh:</p>
                      <p className="chiso tien"> 100.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">An ninh:</p>
                      <p className="chiso tien"> 50.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Gửi xe:</p>
                      <p className="chiso tien"> 70.000 đ</p>
                    </div>
                  </div>
                </td>
                <td rowSpan={2}>
                  <p className="chiso tien" style={{ whiteSpace: "nowrap" }}>
                     4.000.000 đ
                  </p>
                </td>
                <td rowSpan={2}>
                  <p className="status">Đã thanh toán</p>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
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
                <td rowSpan={2}>
                  <p className="colorblack">10/2020</p>
                </td>
                <td rowSpan={2} className="ngaychot">
                  30/10/2020
                </td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu:</p>
                      <p className="chiso colorblack"> 14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối:</p>
                      <p className="chiso colorblack"> 14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng:</p>
                      <p className="chiso colorblack"> 110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền:</p>
                      <p className="chiso tien"> 205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số đầu:</p>
                      <p className="chiso colorblack"> 14283 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Chỉ số cuối:</p>
                      <p className="chiso colorblack"> 14393 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso">Sử dụng:</p>
                      <p className="chiso colorblack"> 110 Kw/h</p>
                    </div>
                    <div className="padbot4px">
                      <p className="chiso colorblack">Số tiền:</p>
                      <p className="chiso tien"> 205.194 đ</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Wifi:</p>
                      <p className="chiso tien"> 150.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Vệ sinh:</p>
                      <p className="chiso tien"> 100.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">An ninh:</p>
                      <p className="chiso tien"> 50.000 đ</p>
                    </div>
                    <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                      <p className="chiso colorblack">Gửi xe:</p>
                      <p className="chiso tien"> 70.000 đ</p>
                    </div>
                  </div>
                </td>
                <td rowSpan={2}>
                  <p className="chiso tien" style={{ whiteSpace: "nowrap" }}>
                     4.000.000 đ
                  </p>
                </td>
                <td rowSpan={2}>
                  <p className="status">Đã thanh toán</p>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
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
