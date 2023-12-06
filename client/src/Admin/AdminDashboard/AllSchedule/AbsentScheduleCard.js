import React from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { FaArrowRight } from "react-icons/fa6";

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
  background: "#122C8E",
  color: "white",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "38px",
  borderRadius: "12px",
  userSelect: "none",
  cursor: "pointer",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const CustomSelect = styled("select")`
  cursor: pointer;
  width: 100%;
  background: #f7fff7;
  border: none;
  outline: 1px solid rgba(0, 123, 255, 0.6);
  border-radius: 12px;
  height: 44px;
  padding: 0px 0px 0px 20px;
  font-size: 12px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  color: #122c8e;
  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #007bff;
    border: none;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const AbsentScheduleCard = ({ s, saveOrderedSchedToDb }) => {
  const absentReasons = [
    "Busy",
    "Sickness",
    "No Transportation",
    "Family Matter",
    "Tiredness",
    "Conflict of Schedule",
    "Bad Weather",
  ];

  let dispatch = useDispatch();

  const handleAbsentReasonChange = (e) => {
    console.log("Reason changed", e.target.value);

    let con = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("con")) {
        con = JSON.parse(localStorage.getItem("con"));
      }

      con.map((schedule, i) => {
        if (schedule._id === s._id) {
          con[i].absentReason = e.target.value;
        }
      });

      localStorage.setItem("con", JSON.stringify(con));
      dispatch({
        type: "ADD_TO_CON",
        payload: con,
      });
    }
  };

  return (
    <>
      <AsCard>
        <MainContainer>
          <ModalTitle>Be gone for a day</ModalTitle>
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
            marginTop: "-5px",
          }}
        >
          <MeshGradientCard>
            <h1
              style={{
                color: "#122C8E",
                margin: "0",
                padding: "0px 0px 26px 0px",
                fontWeight: "600",
              }}
            >
              Tell us the reason
            </h1>
            <div
              style={{
                borderRadius: "10px",
              }}
            >
              <CustomSelect
                name="absentReason"
                onChange={handleAbsentReasonChange}
                value={s.absentReason}
              >
                {s.absentReason ? (
                  <option value={s.absentReason}>{s.absentReason}</option>
                ) : (
                  <option>Select</option>
                )}
                {absentReasons
                  .filter((a) => a !== s.absentReason)
                  .map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
              </CustomSelect>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "20px",
                paddingTop: "26px",
              }}
            >
              <p style={{ fontSize: "14px", margin: "0", color: "#007bff" }}>
                {s.nameOfStudent} dolor sit amet, consectetur adipiscing elit.
                Maecenas a ante fermentum enim mattis ullamcorper a vitae
                ligula. Cras blandit urna iaculis, interdum velit at, dictum
                ligula.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                paddingTop: "26px",
              }}
            >
              <NextButton onClick={saveOrderedSchedToDb}>
                <FaArrowRight />
              </NextButton>
            </div>
          </MeshGradientCard>
        </div>
      </AsCard>
    </>
  );
};

export default AbsentScheduleCard;
