import React from "react";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("div")({
  color: "#b9bbbe",
  textTransform: "sentencecase",
  fontWeight: "600",
  fontSize: "16px",
});

const Input = styled("input")({
  width: "100%",
  background: "#fefefe",
  outline: "1px solid rgba(0, 123, 255, 0.6)",
  border: "none",
  borderRadius: "24px",
  height: "44px",
  padding: "0px 20px 0px 20px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#122c8e",
  letterSpacing: "0.2px",
  position: "relative",
  fontFamily: "Poppins, sans-serif",

  "&:focus": {
    outline: "2px solid #007bff",
    border: "none",
  },
  "&::placeholder": {
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "12px",
    fontWeight: "500",
  },
});

const InputWithLabel = (props) => {
  const { value, setValue, type } = props;

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Input value={value} onChange={handleValueChange} type={type} />
    </Wrapper>
  );
};

export default InputWithLabel;
