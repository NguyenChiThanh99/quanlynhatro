import React from "react";
import { useHistory } from "react-router-dom";

export default function PhongTro() {
  let history = useHistory();
  return (
    <div>
      <h3>Phong tro</h3>
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
