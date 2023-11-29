import React from "react";
import { Box, IconButton } from "@mui/material";
import { BsCheckLg, BsXLg } from "react-icons/bs";

const InvitationDecisionButtons = ({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        style={{ color: "#007bff" }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <BsCheckLg />
      </IconButton>
      <IconButton
        style={{ color: "#007bff" }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <BsXLg />
      </IconButton>
    </Box>
  );
};

export default InvitationDecisionButtons;
