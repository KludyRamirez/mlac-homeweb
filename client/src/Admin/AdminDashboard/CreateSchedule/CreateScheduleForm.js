import React from "react";

const CreateScheduleForm = ({
  handleSubmit,
  handleChange,
  handleParentChange,
  values,
}) => {
  // destructure
  const {
    title,
    timings,
    days,
    day,
    parents,
    parent,
    schedTypes,
    schedType,
    studentTypes,
    studentType,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="fw-bold pb-1">Student Name</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter Student Name"
          value={title}
          onChange={handleChange}
          style={{ fontSize: "13px", height: "40px" }}
        />
      </div>

      <div className="form-group">
        <label className="fw-bold pb-1 pt-2">Student Type</label>
        <select
          name="studentType"
          className="form-control"
          value={studentType}
          onChange={handleChange}
          style={{ fontSize: "13px", height: "40px" }}
        >
          <option>Please Select</option>
          {studentTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="fw-bold pb-1 pt-2">Schedule Type</label>
        <select
          name="schedType"
          className="form-control"
          value={schedType}
          onChange={handleChange}
          style={{ fontSize: "13px", height: "40px" }}
        >
          <option>Please Select</option>
          {schedTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="fw-bold pb-1 pt-2">Day of Schedule</label>
        <select
          name="day"
          className="form-control"
          value={day}
          onChange={handleChange}
          style={{ fontSize: "13px", height: "40px" }}
        >
          <option>Please Select</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="fw-bold pb-1 pt-2">Timings</label>
        <input
          type="time"
          name="timings"
          className="form-control"
          value={timings}
          onChange={handleChange}
          style={{ fontSize: "13px", height: "40px" }}
        />
      </div>

      <div className="form-group">
        <label className="fw-bold pb-1 pt-2">Parent</label>
        <select
          name="parent"
          className="form-control"
          value={parent}
          onChange={handleParentChange}
          style={{ fontSize: "13px", height: "40px" }}
        >
          <option>Please Select</option>
          {parents.map((p) => (
            <option key={p._id} value={p._id}>
              {p.email}
            </option>
          ))}
        </select>
      </div>

      <br />
      <button className="btn btn-primary btn-raised">Submit</button>
    </form>
  );
};

export default CreateScheduleForm;
