import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

import ModalLogin from "../ModalLogin";
import Global from "../Global";

export default function ThanhToan() {
  const [tokenStatus, setTokenStatus] = useState(false);
  const user = useSelector((state) => state.ID);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    if (user.length !== 0) {
      getPayment();
    }
  }, []);

  const getPayment = () => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoading2(true);
    }
    const dataPost = {
      roomId: user.user.user.room,
      page: page,
    };
    const token = user.user.token;
    const url = Global.server + "payment/getpaymentroomsixmonth";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Bearer ${token}`,
      },
      url,
      data: qs.stringify(dataPost),
    };
    axios(options)
      .then((res) => {
        if (res.data.status === false) {
          if (res.data.message === "Unauthorized user!") {
            setTokenStatus(true);
            if (page === 1) {
              setLoading(false);
            } else {
              setLoading2(false);
            }
          }
        } else {
          var newPayment = data.concat(res.data.PaymentRoomSixMonth);
          setData(newPayment);
          setPage(page + 1);
          if (page === 1) {
            setLoading(false);
          } else {
            setLoading2(false);
          }
        }
      })
      .catch((error) => {});
  };

  const loadPayment = () => {
    var result = null;
    if (data.length > 0) {
      result = data.map((payment, index) => {
        var useElec = parseInt(payment.elec[1]) - parseInt(payment.elec[0]);
        var useWater = parseInt(payment.water[1]) - parseInt(payment.water[0]);
        var monneyElec =
          payment.elec[3] !== "VND / Tháng"
            ? useElec * parseInt(payment.elec[2])
            : parseInt(payment.elec[2]);
        var monneyWater =
          payment.water[3] !== "VND / Tháng"
            ? useWater * parseInt(payment.water[2])
            : parseInt(payment.water[2]);
        var total =
          parseInt(monneyElec) +
          parseInt(monneyWater) +
          parseInt(payment.price);
        var newService = [];
        if (payment.service !== null) {
          for (let index = 0; index < payment.service.length; index += 2) {
            total += parseInt(payment.service[index + 1]);
            newService.push({
              name: payment.service[index],
              price: payment.service[index + 1],
            });
          }
        }

        var serviceJSX = newService.map((service, index) => {
          return (
            <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
              <p className="chiso colorblack">{service.name}: </p>
              <p className="chiso tien">
                {Global.currencyFormat(service.price.toString())} đ
              </p>
            </div>
          );
        });

        var JSX1 = (
          <tr className="text-top">
            <td rowSpan={2}>
              <p className="colorblack">{payment.month + "/" + payment.year}</p>
            </td>
            <td rowSpan={2} className="ngaychot">
              {Global.formatDate(payment.date)}
            </td>
            <td>
              <div>
                <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                  <p className="chiso">Chỉ số đầu: </p>
                  <p className="chiso colorblack">
                    {Global.currencyFormat(payment.elec[0])} kWh
                  </p>
                </div>
                <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                  <p className="chiso">Chỉ số cuối: </p>
                  <p className="chiso colorblack">
                    {" "}
                    {Global.currencyFormat(payment.elec[1])} kWh
                  </p>
                </div>
                <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                  <p className="chiso">Sử dụng: </p>
                  <p className="chiso colorblack">
                    {Global.currencyFormat(useElec.toString())} kWh
                  </p>
                </div>
                <div className="padbot4px">
                  <p className="chiso colorblack">Số tiền: </p>
                  <p className="chiso tien">
                    {Global.currencyFormat(monneyElec.toString())} đ
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div>
                <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                  <p className="chiso">Chỉ số đầu: </p>
                  <p className="chiso colorblack">
                    {Global.currencyFormat(payment.water[0])} m3
                  </p>
                </div>
                <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                  <p className="chiso">Chỉ số cuối: </p>
                  <p className="chiso colorblack">
                    {Global.currencyFormat(payment.water[1])} m3
                  </p>
                </div>
                <div className="padbot4px" style={{ whiteSpace: "nowrap" }}>
                  <p className="chiso">Sử dụng: </p>
                  <p className="chiso colorblack">
                    {Global.currencyFormat(useWater.toString())} m3
                  </p>
                </div>
                <div className="padbot4px">
                  <p className="chiso colorblack">Số tiền: </p>
                  <p className="chiso tien">
                    {Global.currencyFormat(monneyWater.toString())} đ
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div>{serviceJSX}</div>
            </td>
            <td rowSpan={2}>
              <p className="chiso tien" style={{ whiteSpace: "nowrap" }}>
                {Global.currencyFormat(payment.price.toString())} đ
              </p>
            </td>
            <td rowSpan={2}>
              <p style={{ whiteSpace: "nowrap" }} className="status">
                {payment.status ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </td>
          </tr>
        );
        var JSX2 = (
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
                  {Global.currencyFormat(total.toString())} đ
                </p>
              </div>
            </td>
          </tr>
        );
        return [JSX1, JSX2];
      });
    }
    return result;
  };

  return (
    <div className="thanhtoan">
      <div className="row">
        <h3>Thanh toán</h3>
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
              {/* tiêu đề */}
              <tbody>
                <tr>
                  <th className="sort" rowSpan={2}>
                    <p className="sort_text">Tháng</p>
                    <span className="material-icons icon" style={{display: 'none'}}>arrow_downward</span>
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
                {loadPayment()}
                {/* hết 1 hàng */}
                <tr>
                  <td colSpan={7} className="tongcong">
                    {loading2 ? (
                      <div className="loading2" style={{ marginBottom: 5 }}>
                        <ReactLoading
                          type={"spin"}
                          color={"#EE6F57"}
                          height={"2%"}
                          width={"2%"}
                        />
                      </div>
                    ) : null}
                    <div
                      className="btn4"
                      onClick={() => {
                        getPayment();
                      }}
                    >
                      Xem thêm
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ModalLogin status={tokenStatus} />
    </div>
  );
}
