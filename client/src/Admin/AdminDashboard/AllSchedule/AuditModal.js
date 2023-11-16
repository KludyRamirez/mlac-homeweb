import React from "react";
import { styled } from "@mui/material/styles";
import { BsDashLg } from "react-icons/bs";

const AsCard = styled("div")({
  width: "100%",
  height: "430px",
  background: "#122C8E",
  color: "black",
  borderRadius: "20px",

  "@media (max-width: 767px)": {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
  },
});

const MainContainer = styled("div")({
  padding: "50px 60px",
  color: "white",

  "@media (max-width: 767px)": { padding: "60px 36px" },
});

const ModalTitle = styled("div")({
  paddingBottom: "24px",
  fontSize: "36px",
  fontWeight: "400",
  color: "#FAFAFA",
  marginLeft: "-2px",

  "@media (max-width: 767px)": {},
});

const ModalSubTitle = styled("div")({
  width: "100%",
  fontSize: "16px",
  fontWeight: "400",
  color: "rgba(255, 255, 255, 0.4)",

  "@media (max-width: 767px)": {},
});

const MeshGradientCard = styled("div")({
  border: "none",
  padding: "30px 34px 0px 34px",
  width: "81%",
  height: "290px",
  borderRadius: "20px",
  backgroundColor: "#FFFFFF",
  backgroundImage:
    "url(data:image/png;base64,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)",
  outline: "none",
  "@media (max-width: 767px)": {
    width: "80%",
    padding: "28px 26px 10px 26px",
  },
});

const NextButton = styled("div")({
  padding: "0",
  border: "none",
  background: "#ff3131",
  color: "white",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "84px",
  height: "38px",
  borderRadius: "10px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const AuditModal = ({ handleCloseSecModal, handleConfirmSetActiveToFalse }) => {
  const handleCloseSet = () => {
    handleConfirmSetActiveToFalse();
    handleCloseSecModal();
  };
  return (
    <>
      <AsCard>
        <MainContainer>
          <ModalTitle>Terms and Conditions</ModalTitle>
          <ModalSubTitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
            ante fermentum enim mattis ullamcorper a vitae ligula. Cras blandit
            urna iaculis, interdum velit at, dictum ligula.
          </ModalSubTitle>
        </MainContainer>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            background: "transparent",
            borderRadius: "20px",
          }}
        >
          <MeshGradientCard>
            <h1
              style={{
                color: "#122C8E",
                margin: "0",
                padding: "0px 0px 30px 0px",
                fontWeight: "600",
              }}
            >
              Confirmation
            </h1>

            <br />

            <div
              style={{
                // border: "1px solid #122C8E",
                width: "100%",
                padding: "0px",
                borderRadius: "20px",
              }}
            >
              <p style={{ fontSize: "14px", margin: "0", color: "#007bff" }}>
                dolor sit amet, consectetur adipiscing elit. Maecenas a ante
                fermentum enim mattis ullamcorper a vitae ligula. Cras blandit
                urna iaculis, interdum velit at, dictum ligula.
              </p>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                paddingTop: "46px",
              }}
            >
              <NextButton onClick={handleCloseSet}>
                <BsDashLg style={{ fontSize: "14px", marginLeft: "-2px" }} />
                <span style={{ letterSpacing: "0.4px", fontSize: "12px" }}>
                  Absent
                </span>
              </NextButton>
            </div>
          </MeshGradientCard>
        </div>
      </AsCard>
    </>
  );
};

export default AuditModal;
