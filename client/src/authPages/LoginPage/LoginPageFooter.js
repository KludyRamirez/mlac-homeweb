import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  return (
    <div>
      <CustomPrimaryButton
        label="Log in"
        additionalStyles={{ marginTop: "30px" }}
        disabled={!isFormValid}
        onClick={handleLogin}
      />
    </div>
  );
};

export default LoginPageFooter;
