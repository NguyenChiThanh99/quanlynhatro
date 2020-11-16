import React from "react";
import { useHistory } from "react-router-dom";

export default function QuanLyNguoi() {
  let history = useHistory();
  return (
    <div>
      <h3>Quan ly Nguoi</h3>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/quanlydaytro/daytro/phongtro/nguoithue");
        }}
      >
        Nguoi thue
      </button>
    </div>
  );
}
