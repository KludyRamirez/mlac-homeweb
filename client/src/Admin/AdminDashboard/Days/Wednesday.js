import React from "react";
import { styled } from "@mui/material/styles";

const WednesdayWrapper = styled("div")({
  width: "600px",
  height: "100%",
});

const FormTitle = styled("h2")({
  margin: "0px",
  backgroundColor: "white",
  backgroundImage: "radial-gradient(100% 100% at 100% 0, white 0, white 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  display: "flex",
  justifyContent: "flex-start",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "inherit",
  height: "inherit",
  gap: "20px",
});

const Permanent = styled("div")({
  height: "91%",
  width: "30%",
  display: "flex",
  justifyContent: "center",
});

const Temporary = styled("div")({
  height: "91%",
  width: "60%",
  display: "flex",
  justifyContent: "center",
});

const CellCon = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  gap: "10px",
  padding: "0px 10px",
  borderLeft: "0.5px solid #f1feef",
});

const CellCon2 = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  padding: "0px 10px",
});

const Cell = styled("div")({
  background: "rgba(255, 255, 255, 0.25)",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  backdropFilter: "blur(3px)",
  WebkitBackdropFilter: "blur(3px)",
  borderRadius: "5px",
  width: "160px",
  height: "80px",
  margin: "0",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  padding: "10px",
});

const Cell2 = styled("div")({
  background: "rgba(255, 255, 255, 0.25)",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  backdropFilter: "blur(3px)",
  WebkitBackdropFilter: "blur(3px)",
  borderRadius: "5px",
  width: "160px",
  height: "80px",
  margin: "0",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  padding: "10px",
});

const Wednesday = () => {
  return (
    <WednesdayWrapper>
      <FormTitle>
        <span>Wednesday</span>
      </FormTitle>
      <br />
      <Flexer>
        <Permanent>
          <CellCon2>
            <Cell2>Kludy</Cell2>
          </CellCon2>
        </Permanent>

        <Temporary>
          <CellCon>
            <Cell>Kludy</Cell>
            <Cell>Kludy</Cell>
          </CellCon>
        </Temporary>
      </Flexer>
    </WednesdayWrapper>
  );
};

export default Wednesday;
