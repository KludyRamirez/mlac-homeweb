import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct username and password should contain between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press To Login";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
    </>
  );
};

export default LoginPageFooter;
