import React from "react";
import { useHistory } from "react-router-dom";

export default function DayTro() {
  let history = useHistory();
  return (
    <div>
      <h3>Day tro</h3>
      <button
        type="button"
        class="btn btn-dark"
        onClick={() => {
          history.push("/admin/quanlydaytro/daytro/daytrodetail");
        }}
      >
        Day tro Detail
      </button>
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
