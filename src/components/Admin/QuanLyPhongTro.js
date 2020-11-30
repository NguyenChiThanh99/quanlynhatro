import React from "react";
import { useHistory } from "react-router-dom";

import building from '../../images/building.jpg';

export default function QuanLyPhongTro() {
  let history = useHistory();
  return (
    <div className="quanlydaytro">
        <div className="row">
          <h3 style={{color: '#151515'}}>Tất cả phòng trọ</h3>
          <div className="row">
            <p className="dropdown">Mới nhất</p>
            <i className="material-icons" style={{padding: '0px 20px 0px 10px', color: '#333333', alignSelf: 'center'}}>arrow_drop_down</i>
            {/* Compoent button */}
            <div className="box-btn">
              <div className="btn2">
              </div>
              <button className="btn">
                <i className="material-icons" id="icon-btn">add_circle</i>
                Thêm phòng mới
              </button>
            </div>
          </div>
        </div>
        <div className="array-item">
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Phòng trọ A</h4>
              <span>Phòng trọ này xấu vcl ra</span>
            </div>
          </div>
        </div>
      </div>
    // <div>
    //   <h3>Quan ly Phong tro</h3>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/quanlydaytro/daytro/phongtro");
    //     }}
    //   >
    //     Phong tro
    //   </button>
    // </div>
  );
}
