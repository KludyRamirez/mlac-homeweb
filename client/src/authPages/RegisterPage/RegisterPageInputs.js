import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/system";
import { StyledButton } from "../../Admin/AdminDashboard/AllSchedule/AllSchedule";
import { FormControl, TextField, Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const RadioG = styled(RadioGroup)({
  color: "#b9bbbe",
  textTransform: "sentencecase",
  fontWeight: "600",
  fontSize: "16px",
});

const FormContainer = styled("div")({
  boxShadow:
    "rgba(0, 123, 255, 0.15) 0px 1px 0px, rgba(0, 123, 255, 0.15) 0px 8px 24px, rgba(0, 123, 255, 0.15) 0px 16px 48px",
  padding: "40px",
  backgroundColor: "#fdfdfd",
  color: "gray",
  borderRadius: "5px",
  border: "2px solid #007bff",
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
});

const FormTitle = styled("h1")({
  margin: "0px",
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  paddingBottom: "20px",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
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
    isFormValid,
    handleRegister,
  } = props;

  return (
    <>
      <FormContainer>
        <TitleCon>
          <FormTitle>Create User</FormTitle>
          <StyledButton>
            <PersonAddAltIcon />
          </StyledButton>
        </TitleCon>
        <FormControl
          sx={{
            border: "2px solid #007bff",
            padding: "10px",
            borderRadius: "5px",
            width: "55%",
          }}
        >
          <TextField
            id="standard-basic"
            name="username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="[User] Name"
          />
        </FormControl>
        <br />
        <br />
        <FormControl
          sx={{
            width: "70%",
            padding: "0 10px",
          }}
        >
          <TextField
            id="standard-basic"
            name="firstname"
            variant="standard"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            label="[First] Name"
          />
        </FormControl>
        <br />
        <br />
        <FormControl
          sx={{
            border: "2px solid #007bff",
            padding: "10px",
            borderRadius: "5px",
            width: "85%",
          }}
        >
          <TextField
            id="standard-basic"
            name="lastname"
            variant="standard"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            label="[Last] Name"
          />
        </FormControl>
        <br />
        <br />
        <FormControl
          sx={{
            padding: "0 10px",
          }}
        >
          <TextField
            id="standard-basic"
            name="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
        </FormControl>
        <br />
        <br />
        <RadioG
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <FormControlLabel
            value="Parent"
            checked={role === "Parent"}
            control={<Radio />}
            label="Parent"
          />
          <FormControlLabel
            value="Therapist"
            checked={role === "Therapist"}
            control={<Radio />}
            label="Therapist"
          />
          <FormControlLabel
            value="Administrator"
            checked={role === "Administrator"}
            control={<Radio />}
            label="Administrator"
          />
        </RadioG>
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "40px",
          }}
        >
          <Link to="/schedule" style={{ textDecoration: "none" }}>
            <p
              style={{ fontSize: "12px", fontWeight: "600", color: "#007bff" }}
            >
              Create <br /> Permanent Schedule?
            </p>
          </Link>
          <Button
            variant="outlined"
            sx={{ fontWeight: "600" }}
            onClick={handleRegister}
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

export default RegisterPageInputs;
