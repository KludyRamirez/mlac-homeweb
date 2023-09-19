import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const LoginPageInputs = ({ username, setUsername, password, setPassword }) => {
  return (
    <>
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="[User] name"
        type="text"
        placeholder="Enter [user] name"
      ></InputWithLabel>
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      ></InputWithLabel>
    </>
  );
};

export default LoginPageInputs;
