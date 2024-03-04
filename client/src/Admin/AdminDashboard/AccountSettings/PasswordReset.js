import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function PasswordReset() {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/forgot-password`,
        { mail }
      );

      if (res.data.Status === "Success") {
        setMessage(res.data.message);
        history.push("/login");
      } else {
        console.log("Unexpected res status:", res.data.Status);
      }
    } catch (error) {
      console.error("Failed to send reset email.", error);
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default PasswordReset;
