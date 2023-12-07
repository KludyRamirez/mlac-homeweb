import React, { useRef, useEffect } from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { connect } from "react-redux";
import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
import Message from "./Message";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessagesHeader username={chosenChatDetails?.username} />
      {DUMMY_MESSAGES.map((message, index) => {
        return (
          <Message
            key={message._id}
            content={message.content}
            username={message.author.username}
            sameAuthor={message.sameAuthor}
            date={message.date}
            sameDay={message.sameDay}
          />
        );
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messages);
