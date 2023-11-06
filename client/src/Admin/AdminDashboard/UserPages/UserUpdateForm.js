import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import { styled } from "@mui/system";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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

const UserUpdateForm = ({
  handleSubmit,
  handleInputChange,
  handleRadioChange,
  values,
}) => {
  // destructure
  const { username, firstname, lastname, password, role, roles } = values;

  const isButtonDisabled = username.length < 3 || username.length > 24;

  return (
    <>
      <FormContainer>
        <TitleCon>
          <FormTitle>Update User</FormTitle>
          <div>
            <PersonAddAltIcon />
          </div>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            label="Password"
          />
        </FormControl>
        <br />
        <br />
        <FormControl>
          <div style={{ fontSize: "13px", fontWeight: "500" }}>Role</div>
          <FormGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={role}
            onChange={handleRadioChange}
          >
            {roles.map((r) => (
              <FormControlLabel
                key={r}
                value={r}
                checked={role === r}
                control={<Radio />}
                label={r}
              />
            ))}
          </FormGroup>
        </FormControl>
        <br />
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
          <Link to="/user" style={{ textDecoration: "none" }}>
            <p
              style={{ fontSize: "12px", fontWeight: "600", color: "#007bff" }}
            >
              Create <br /> a User?
            </p>
          </Link>
          <Button
            variant="outlined"
            sx={{ fontWeight: "600" }}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Submit
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

export default UserUpdateForm;
