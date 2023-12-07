import React from "react";
import { connect } from "react-redux";
import { Typography } from "@mui/material";

const ChosenOptionLabel = ({ username }) => {
  return (
    <Typography
      sx={{ fontSize: "16px", color: "black", fontWeight: "600" }}
    >{`${username ? ` Chosen Conversation: ${username}` : ""}`}</Typography>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    username: state.chat.chosenChatDetails?.username,
  };
};

export default connect(mapStoreStateToProps)(ChosenOptionLabel);
