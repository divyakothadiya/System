import React from 'react';
import Conversations from '../conversations';
import {
  Conversation,
  Avatar
} from "@chatscope/chat-ui-kit-react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ChatListItems = () => {
  return (
    <div>
          {Conversations.map((conversations) => (
            <Conversation
            name={conversations.name}
            lastSenderName=""
            info={conversations.info}
            style={{ justifyContent: "start" }}
          >
            <Avatar
              src={conversations.src}
              alt="User Avatar"
              status={conversations.status}
            />
            </Conversation>
          ))}
    </div>
  )
}

export default ChatListItems