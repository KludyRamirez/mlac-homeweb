// RegisterPageInputs.js
import React from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/system";

const RadioG = styled(RadioGroup)({
  color: "#b9bbbe",
  textTransform: "sentencecase",
  fontWeight: "600",
  fontSize: "16px",
});

const RegisterPageInputs = (props) => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
  } = props;

  return (
    <>
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="[User] Name"
        type="text"
        placeholder="Enter username"
      />
      <InputWithLabel
        value={firstname}
        setValue={setFirstname}
        label="[First] Name"
        type="text"
        placeholder="Enter [first] name"
      />
      <InputWithLabel
        value={lastname}
        setValue={setLastname}
        label="[Last] Name"
        type="text"
        placeholder="Enter [last] name"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
      <RadioG
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <FormControlLabel
          value="parent"
          checked={role === "parent"}
          control={<Radio />}
          label="Parent"
        />
        <FormControlLabel
          value="therapist"
          checked={role === "therapist"}
          control={<Radio />}
          label="Therapist"
        />
        <FormControlLabel
          value="admin"
          checked={role === "admin"}
          control={<Radio />}
          label="Admin"
        />
      </RadioG>
    </>
  );
};

export default RegisterPageInputs;
