import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../../shared/components/Avatar";
import { Typography } from "@mui/material";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MessagesHeader = ({ username = "" }) => {
  return (
    <MainContainer>
      <Avatar username={username} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "white",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        {username}
      </Typography>
      <Typography
        sx={{
          color: "#b9bbbe",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        This is the beginning of your conversation with {username}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
