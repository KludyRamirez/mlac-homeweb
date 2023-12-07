import React, { useEffect } from "react";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { styled } from "@mui/system";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContentNew = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput chosenChatDetails={chosenChatDetails} />
    </Wrapper>
  );
};

export default MessengerContentNew;
