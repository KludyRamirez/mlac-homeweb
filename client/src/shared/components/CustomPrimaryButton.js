import React from "react";
import { styled } from "@mui/material/styles";

const CustomPrimaryButton = ({ label, disabled, onClick }) => {
  const Button = styled("button")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    width: "88px",
    height: "40px",
    background: "#fefefe",
    border: "1px solid rgba(0, 123, 255, 0.6)",
    borderRadius: "36px",

    cursor: "pointer",
    color: "#122c8e",
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    willChange: "box-shadow, transform",
    transition:
      "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.16s ease-in-out",
    ":hover": {
      border: "none",
      color: "white",
      transform: "translateY(-1px)",
      background: "#33f641",
      backgroundImage:
        "radial-gradient(at 16.0% 15.0%, hsl(55, 99%, 44%) 0px, transparent 50%),radial-gradient(at 12.0% 94.0%, hsl(74, 34%, 61%) 0px, transparent 50%),radial-gradient(at 98.0% 29.0%, hsl(90, 60%, 24%) 0px, transparent 50%),radial-gradient(at 1.0% 16.0%, hsl(105, 10%, 31%) 0px, transparent 50%),radial-gradient(at 28.0% 88.0%, hsl(148, 67%, 56%) 0px, transparent 50%)",
    },
    ":active": {
      transform: "translateY(3px)",
    },
  });
  return (
    <Button disabled={disabled} onClick={onClick}>
      <div style={{ fontFamily: "Poppins, sans-serif" }}>{label}</div>
    </Button>
  );
};

export default CustomPrimaryButton;
