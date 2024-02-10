import React from "react";
import CustomPrimaryButton from "../../../shared/components/CustomPrimaryButton";
import { useHistory } from "react-router-dom";

const WaitListFooter = ({ handleWaitList, isFormValid }) => {
  const history = useHistory();

  return (
    <>
      <div>
        <CustomPrimaryButton
          label="WaitList"
          additionalStyles={{ marginTop: "30px" }}
          disabled={!isFormValid}
          onClick={handleWaitList}
        />
      </div>
    </>
  );
};

export default WaitListFooter;
