import React, { useState } from "react";
import axios from "axios";

function PasswordReset() {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/forgot-password`,
        { mail }
      );
      setMessage(response.data.message);
      window.location = `/reset-password?token=${response.data.resetToken}`;
    } catch (error) {
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordReset;
