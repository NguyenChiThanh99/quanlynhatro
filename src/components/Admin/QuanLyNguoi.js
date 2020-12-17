import React from "react";
import { useHistory } from "react-router-dom";

import avatar from "../../images/avatar.png";

export default function QuanLyNguoi() {
  let history = useHistory();
  return (
    <div className="quanlynguoithue">
        <div className="row">
          <h3>Tất cả người thuê</h3>
          <div className="row">
            <p className="dropdown">Mới nhất</p>
            <i className="material-icons-round" style={{padding: '0px 20px 0px 10px', color: '#828282', alignSelf: 'center'}}>arrow_drop_down</i>
            {/* Compoent button */}
            <div className="box-btn">
              <div className="btn2">
              </div>
              <button className="btn">
                <i className="material-icons-round" id="icon-btn">add_circle</i>
                Thêm người mới
              </button>
            </div>
          </div>
        </div>
        <div className="array-item">
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1a</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1a</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1a</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1a</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1a</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
          <div className="card">
            <img src={avatar} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Nguyễn Đoàn Duy Nhựt</h4>
              <span>Phòng 1</span>
            </div>
          </div>
        </div>
      </div>
    // <div>
    //   <h3>Quan ly Nguoi</h3>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/quanlydaytro/daytro/phongtro/nguoithue");
    //     }}
    //   >
    //     Nguoi thue
    //   </button>
    // </div>
  );
}
