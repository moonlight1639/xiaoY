import { useState, useRef, useEffect } from "react";
import doubapImg from "@/assets/doubao1.jpg";
import stuImg from "@/assets/avator/stu.jpg";
import "./ChatView.css";
// import type {ChatMessage ,ChatForm , ChatMessageList , ChatMessageTitle } from '@/types';

interface ChatMessageList {
  type: string;
  content: string;
  createTime?: string;
}

interface ChatViewProps {
  // 父组件传的「参数」（数据）
  Conversation?: ChatMessageList[]; // 消息内容
  AvatorSize?: number;
  ContainerSize?: number;

  // 父组件传的「事件回调函数」（子组件触发）
  handleSend?: (msg: string) => void; // 发送消息事件
}

const ChatView: React.FC<ChatViewProps> = (props) => {
  const { Conversation, handleSend , AvatorSize , ContainerSize } = props;
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [activeConversationList, setActiveConversationList] = useState<
    ChatMessageList[]
  >(Conversation || [{
    type: "assistant",
    content: "你好呀，我是科大小Y，很高兴为你服务！",
    createTime: new Date().toISOString(),
  },{
    type: "user",
    content: "你好！",
    createTime: new Date().toISOString(),
  }]);

  //发送消息或者接收消息后滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [activeConversationList]);

  //滑到消息列表的底部
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    console.log("按下前焦点:", document.activeElement?.tagName, document.activeElement?.id);
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation(); 
      handleOnClick();
      console.log("按下后焦点:", document.activeElement?.tagName, document.activeElement?.id);
      console.log("滚动位置:", window.scrollY);
    }
  };

  const handleOnClick = () => {

    if (inputValue.trim()) {
      if (handleSend) handleSend(inputValue);
      else defaultHandleSend();
    }


  };
  const defaultHandleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    
    setActiveConversationList((prev) => [
      ...prev,
      {
        type: "user",
        content: inputValue.trim(),
        createTime: new Date().toISOString(),
      },
    ]);
    setIsLoading(true);
    setTimeout(() => {
      setActiveConversationList((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "你好呀，我是科大小Y，很高兴为你服务！",
          createTime: new Date().toISOString(),
        },
      ]);

      setInputValue("");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="chatview-chat-conversation" style = {{fontSize : '12px'}}>
      {/* 消息列表 */}
      <div
        className="chatview-messages-container"
        ref={messagesContainerRef}
        style={{ ...(ContainerSize && { maxHeight: `${ContainerSize}px` }) }}
      >
        {activeConversationList.map((msg, index) => (
          <div
            className={`chatview-message ${msg.type === "user" ? "user" : "assistant"}`}
            key={index}
          >
            <div className="chatview-message-avatar" style={{  ...(AvatorSize && {width: `${AvatorSize}px`, height: `${AvatorSize}px`})  }}>
              {msg.type === "user" ? (
                <img src={stuImg} alt="用户" />
              ) : (
                <img src={doubapImg} alt="科大小Y" />
              )}
            </div>
            <div className="chatview-message-body">
              <div className="chatview-message-role">
                {msg.type === "user" ? "你" : "科大小Y"}
              </div>
              <div className="chatview-message-content">
                {msg.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chatview-message assistant">
            <div className="chatview-message-avatar" style={{...(AvatorSize && {width: `${AvatorSize}px`, height: `${AvatorSize}px`})}}>
              <img src={doubapImg} alt="科大小Y" />
            </div>
            <div className="chatview-message-body">
              <div className="chatview-message-role">科大小Y</div>
              <div className="chatview-message-content">
                <div className="chatview-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 - 对话界面 */}
      <div className="chatview-input-area">
        <div className="chatview-input-container">
          <textarea
            className="chatview-chat-input"
            placeholder="继续对话..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            rows={1}
          />
          <button
            className="chatview-send-btn"
            onClick={handleOnClick}
            disabled={!inputValue.trim() || isLoading}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
