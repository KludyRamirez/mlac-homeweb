import React from "react";
import { useDispatch } from "react-redux";
import { FaCircleXmark } from "react-icons/fa6";

const AbsentScheduleCard = ({ s }) => {
  const absentReasons = [
    "Busy",
    "Sickness",
    "No Transportation",
    "Family Matter",
    "Tiredness",
    "Conflict of Schedule",
    "Bad Weather",
  ];

  let dispatch = useDispatch();

  const handleAbsentReasonChange = (e) => {
    console.log("Reason changed", e.target.value);

    let con = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("con")) {
        con = JSON.parse(localStorage.getItem("con"));
      }

      con.map((schedule, i) => {
        if (schedule._id === s._id) {
          con[i].absentReason = e.target.value;
        }
      });

      localStorage.setItem("con", JSON.stringify(con));
      dispatch({
        type: "ADD_TO_CON",
        payload: con,
      });
    }
  };

  const handleRemove = () => {
    let con = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("con")) {
        con = JSON.parse(localStorage.getItem("con"));
      }

      con.map((schedule, i) => {
        if (schedule._id === s._id) {
          con.splice(i, 1);
        }
      });

      localStorage.setItem("con", JSON.stringify(con));
      dispatch({
        type: "ADD_TO_CON",
        payload: con,
      });
    }
  };

  return (
    <>
      <div
        style={{
          width: "200px",
          height: "200px",
          background: "#fff",
          color: "black",
          borderRadius: "20px",
        }}
      >
        <div>
          <div style={{ background: "#408cfc", fontSize: "14px" }}>
            {s.nameOfStudent}
          </div>
        </div>

        <div>
          <div style={{ background: "#FFBF00", fontSize: "12px" }}>
            {s.schedType}
          </div>
          <div className="fw-bolder  px-3" style={{ fontSize: "12px" }}>
            {s.day}
          </div>
          <div className="fw-bolder  px-3" style={{ fontSize: "12px" }}>
            {s.timing}
          </div>
          <div className=" d-flex justify-content-end pe-2 pb-2">
            <FaCircleXmark onClick={handleRemove} />
          </div>
        </div>
      </div>
      <br />
      <div>
        <div>
          <select onChange={handleAbsentReasonChange} name="absentReason">
            {s.absentReason ? (
              <option value={s.absentReason}>{s.absentReason}</option>
            ) : (
              <option>Select</option>
            )}
            {absentReasons
              .filter((a) => a !== s.absentReason)
              .map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default AbsentScheduleCard;
