import {
  useContext,
  useEffect,
  useRef,
  useState,
  FormEvent,
  RefObject,
} from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SockerContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChatData, Message } from "../../types/ChatTypes";

interface ChatProps {
  chats: ChatData[];
}

const Chat: React.FC<ChatProps> = ({ chats }) => {
  const [chat, setChat] = useState<ChatData | null>(null);
  const [chatList, setChatList] = useState<ChatData[]>(chats);
  const auth = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const currentUser = auth?.user;
  const messageEndRef: RefObject<HTMLDivElement> = useRef(null);

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id: string, receiver: ChatData["receiver"]) => {
    try {
      const res = await apiRequest(`/chats/${id}`);
      if (!res.data.seenBy.includes(currentUser?.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text") as string;

    if (!text || !chat) return;

    try {
      const res = await apiRequest.post(`/messages/${chat.id}`, { text });
      const newMessage: Message = res.data;
      setChat((prev) =>
        prev ? { ...prev, messages: [...prev.messages, newMessage] } : prev
      );
      e.currentTarget.reset();
      socket?.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: newMessage,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      if (chat) {
        try {
          await apiRequest.put(`/chats/read/${chat.id}`);
        } catch (err) {
          console.log(err);
        }
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data: Message) => {
        if (chat.id === data.chatId) {
          setChat((prev) =>
            prev ? { ...prev, messages: [...prev.messages, data] } : prev
          );
          read();
        }
      });
    }

    return () => {
      socket?.off("getMessage");
    };
  }, [socket, chat]);

  const handleDeleteChat = async (id: string) => {
    try {
      await apiRequest.delete(`/chats/${id}`);
      setChatList(chatList.filter((c) => c.id !== id));
      setChat(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chatList?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser?.id || "") || chat?.id === c.id
                  ? "white"
                  : "#d0e7ff",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <div className="message-content">
              <img
                src={c.receiver?.avatar || "/noavatar.jpg"}
                alt="User Avatar"
              />
              <span>{c.receiver?.username || "Unknown User"}</span>

              <p>{c.lastMessage}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteChat(c.id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.avatar || "/noavatar.jpg"}
                alt="User Avatar"
              />
              {chat.receiver?.username || "Unknown User"}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === currentUser?.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser?.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
