import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import ReactLoading from "react-loading";

import ModalLogin from "../ModalLogin";
import Global from "../Global";

import dolar from "../../images/dollar.png";

export default function ThongKe() {
  useEffect(() => {
    if (user.length !== 0) {
      getDoanhthu();
    }
  }, []);

  const user = useSelector((state) => state.ID);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [doanhthuLabel, setDoanhthuLabel] = useState([]);
  const [doanhthuValue, setDoanhthuValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dien, setDien] = useState([]);
  const [nuoc, setNuoc] = useState([]);
  const [total, setTotal] = useState(0);

  const data = {
    labels: doanhthuLabel,
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: doanhthuValue,
        fill: false,
        borderColor: "#9B51E0", //Màu đường
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    title: {
      display: false,
      text: "DOANH THU",
    },
    legend: {
      display: false,
      position: "bottom",
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
      ],
    },
  };

  const data2 = {
    labels: doanhthuLabel,
    datasets: [
      {
        label: "Điện (VND)",
        data: dien,
        fill: false,
        borderColor: "#EE6F57", //Màu đường
        yAxisID: "y-axis-1",
      },
      {
        label: "Nước (VND)",
        data: nuoc,
        fill: false,
        borderColor: "#1F3C88", //Màu đường
        yAxisID: "y-axis-2",
      },
    ],
  };

  const options2 = {
    legend: {
      display: true,
      position: "bottom",
    },
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

  const getDoanhthu = () => {
    setLoading(true)
    const data = {
      userId: user.user.user._id,
    };
    const token = user.user.token;
    const url = Global.server + "payment/totalpaymentsixmonth";
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
        console.log(res.data);
        if (res.data.status === false) {
          if (res.data.message === "Unauthorized user!") {
            setTokenStatus(true);
            setLoading(false)
          }
        } else {
          var doanhthu = res.data.Payment;
          var label = [];
          var value = [];
          var dien = [];
          var nuoc = [];
          var total = 0;
          for (let index = 0; index < doanhthu.length; index++) {
            label.push("Tháng " + doanhthu[index].month);
            value.push(doanhthu[index].total);
            dien.push(doanhthu[index].totalelec);
            nuoc.push(doanhthu[index].totalwater);
            total += doanhthu[index].total;
          }
          setDoanhthuLabel(label.reverse());
          setDoanhthuValue(value.reverse());
          setDien(dien.reverse());
          setNuoc(nuoc.reverse());
          setTotal(total);
          setLoading(false)
        }
      })
      .catch((error) => {});
  };

  var date = new Date();

  return (
    <div className="yeucau">
      <div className="row">
        <h3>Thống kê</h3>
      </div>

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
        <div className="body" style={{ height: "80vh", overflowY: "scroll" }}>
          <div>
            <div className="chartCard" style={{ width: "50vw", float: "left" }}>
              <div className="chart-border-title">
                <span className="chartTitle">DOANH THU</span>
              </div>
              <div style={{ marginTop: 20 }}>
                <Line data={data} options={options} />
              </div>
            </div>

            <div
              className="chartCard"
              style={{ width: "16vw", float: "left", display: "grid" }}
            >
              <div className="chart-border-title">
                <span className="chartTitle">TỔNG DOANH THU</span>
                <br />
                <span style={{ fontFamily: "Roboto-Light" }}>
                  Năm {date.getFullYear()}
                </span>
              </div>
              <img src={dolar} style={{ width: "4vw" }} alt="dolar" />
              <span
                style={{
                  fontFamily: "Roboto-Light",
                  color: "#4f4f4f",
                  fontSize: 26,
                }}
              >
                {Global.currencyFormat(total.toString())} VND
              </span>
            </div>
          </div>

          <div
            className="chartCard"
            style={{ width: "75vw", marginTop: 640, marginBottom: 20 }}
          >
            <div className="chart-border-title">
              <span className="chartTitle">ĐIỆN NƯỚC</span>
            </div>
            <div style={{ marginTop: 20 }}>
              <Line data={data2} options={options2} />
            </div>
          </div>
        </div>
      )}

      <ModalLogin status={tokenStatus} />
    </div>
  );
}
