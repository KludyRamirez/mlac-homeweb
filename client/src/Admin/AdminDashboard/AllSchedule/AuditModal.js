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
  backgroundColor: "#F0FFFF",
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

const AuditModal = ({
  handleCloseSecModal,
  handleConfirmSetActiveToFalse,
  handleConfirmSetPlusAbsentCounter,
}) => {
  const handleCloseSet = async () => {
    try {
      await handleConfirmSetPlusAbsentCounter();
      await handleConfirmSetActiveToFalse();
    } catch (err) {
      console.error(err);
    } finally {
      try {
        await handleCloseSecModal();
      } catch (err) {
        console.error(err);
      }
    }
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
