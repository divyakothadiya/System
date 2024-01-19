import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  VoiceCallButton,
  Message,
  MessageInput,
  VideoCallButton,
  InfoButton,
  MessageSeparator,
  TypingIndicator,
  MessageList
} from "@chatscope/chat-ui-kit-react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ChatListItems from './components/chatListItems';

export default function Main() {
  // Set initial message input value to empty string
  const [messageInputValue, setMessageInputValue] = useState("");

  return (
    <div
      style={{
        height: "600px",
        position: "relative"
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ChatListItems/>
          {/* <ConversationList>
            
          </ConversationList> */}
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={PhotoCamera} name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="wednesday, 16 Jan 2024" />

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single"
              }}
            >
              <Avatar src={PhotoCamera} name="Zoe" />
            </Message>

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single"
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first"
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal"
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "normal"
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last"
              }}
            >
              <Avatar src={PhotoCamera} name="Zoe" />
            </Message>

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "first"
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal"
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "normal"
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "last"
              }}
            />

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "first"
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "last"
              }}
            >
              <Avatar src={PhotoCamera} name="Zoe" />
            </Message>
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => setMessageInputValue("")}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
