import React from "react";
import { useHistory } from "react-router-dom";

export default function QuanLyPhongTro() {
  let history = useHistory();
  return (
    <div>
      <h3>Quan ly Phong tro</h3>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/quanlydaytro/daytro/phongtro");
        }}
      >
        Phong tro
      </button>
    </div>
  );
}
