import React from "react";
import { styled } from "@mui/material/styles";
import InputWithLabel from "../../shared/components/InputWithLabel";

const InputTitles = styled("div")({
  width: "200px",
  height: "20px",
  fontSize: "14px",
  margin: "0px",
  color: "#122c8e",
  fontWeight: "500",
  letterSpacing: "0.4px",
});

const LoginPageInputs = ({ username, setUsername, password, setPassword }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <InputTitles>Username</InputTitles>
          <InputWithLabel
            value={username}
            setValue={setUsername}
            label="[User] name"
            type="text"
            placeholder="Enter [user] name"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <InputTitles>Password</InputTitles>
          <InputWithLabel
            value={password}
            setValue={setPassword}
            label="Password"
            type="password"
            placeholder="Enter password"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPageInputs;
