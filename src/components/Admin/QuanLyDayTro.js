import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import Dropzone from "react-dropzone";
import { Avatar } from "@material-ui/core";

import building from '../../images/building.jpg';

export default function QuanLyDayTro() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);
  const [file, setFile] = useState(null);
  let history = useHistory();

  const handleImageUpload = () => {
    // const { files } = document.querySelector('input[type="file"]')
    var f = file;
    const formData = new FormData();
    formData.append("file", f);
    // replace this with your upload preset name
    formData.append("upload_preset", "slibdzgy");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      "https://api.Cloudinary.com/v1_1/dep0t5tcf/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.secure_url);
        setImageAlt(`An image of ${res.original_filename}`);
        console.log(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };
  return (
    <div className="quanlydaytro">
        <div className="row">
          <h3 style={{color: '#151515'}}>Tất cả dãy trọ</h3>
          <div className="row">
            <p className="dropdown">Mới nhất</p>
            <i className="material-icons" style={{padding: '0px 20px 0px 10px', color: '#333333', alignSelf: 'center'}}>arrow_drop_down</i>
            {/* Compoent button */}
            <div className="box-btn">
              <div className="btn2">
              </div>
              <button className="btn">
                <i className="material-icons" id="icon-btn">add_circle</i>
                Thêm dãy trọ
              </button>
            </div>
          </div>
        </div>
        <div className="array-item">
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
          <div className="card">
            <img src={building} alt="IMG" id="img-card" />
            <div className="box-name">
              <h4>Dãy trọ A</h4>
              <span>Dãy trọ này xấu vcl ra</span>
            </div>
          </div>
        </div>
      </div>
    // <div>
    //   <h3>Quan ly Day tro</h3>
    //   <button
    //     type="button"
    //     class="btn btn-dark"
    //     onClick={() => {
    //       history.push("/admin/quanlydaytro/daytro");
    //     }}
    //   >
    //     Day tro
    //   </button>

    //   <Dropzone onDrop={handleDrop}>
    //     {({ getRootProps, getInputProps }) => (
    //       <div {...getRootProps({ className: "dropzone" })}>
    //         <input {...getInputProps()} />
    //         <p>Drag'n'drop files, or click to select files</p>
    //       </div>
    //     )}
    //   </Dropzone>
    //   <button type="button" className="btn" onClick={handleImageUpload}>
    //     Submit
    //   </button>
    //   <img src={imageUrl} alt={imageAlt} className="displayed-image" />
    // </div>
  );
}
