import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type {
  ChatMessageTitle,
  SingleChatMessage
} from "@/types";
import {getStreamingSend} from "@/services/streamingApi"
import { xiaoY_chat, getList, getMessages , getNewMemoryId } from "@/services";
import "./ChatPage.css";
import doubapImg from "@/assets/doubao1.jpg";
import stuImg from "@/assets/avator/stu.jpg";
import { useAuthStore } from "@/store";

/**
 * 自动闭合流式输出中未完成的 Markdown 标记，
 * 避免 ReactMarkdown 在标记未闭合/闭合瞬间产生 DOM 重建导致的视觉闪烁。
 */
function closeOpenMarkdownTokens(text: string): string {
  if (!text) return text;
  let result = text;

  // 闭合未配对的代码块 ```
  // const codeBlockCount = (result.match(/```/g) || []).length;
  // if (codeBlockCount % 2 !== 0) {
  //   result += '\n```';
  // }

  // 闭合未配对的加粗 **
  const boldCount = (result.match(/\*\*/g) || []).length;
  if (boldCount % 2 !== 0) {
    result += '**';
  }

  // 闭合未配对的行内代码 `
  // 排除已被 ``` 匹配的反引号
  const strippedCodeBlocks = result.replace(/```[\s\S]*?```/g, '');
  const inlineCodeCount = (strippedCodeBlocks.match(/`/g) || []).length;
  if (inlineCodeCount % 2 !== 0) {
    result += '`';
  }

  // 闭合未配对的斜体 * (排除 ** 已处理的)
  const strippedBold = result.replace(/\*\*/g, '');
  const italicCount = (strippedBold.match(/\*/g) || []).length;
  if (italicCount % 2 !== 0) {
    result += '*';
  }

  return result;
}


export interface ChatMessages {
  memoryId: string;
  title: string;
  createTime?: string;
  isLoaded: boolean;
  isLoading: boolean;
  Messages: SingleChatMessage[]
  AiResponse: string;
}
function ChatPage() {
  const [conversations, setConversations] = useState<ChatMessages[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [inputValue, setInputValue] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { token, user } = useAuthStore();
  const [isNewPage , setIsNewPage] = useState(true);
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getList();
      if(res.success === true && res.data){
        setConversations(res.data.map((item:ChatMessageTitle) => ({ 
          ...item, 
          Messages: [],
          isLoaded: false,
          isLoading: false,
          AiResponse: ''
        })));
      }
    }
    fetchMessages().then(() => {
      // scrollToBottom();
      setConversations(prev =>{
        console.log("运行到这了", prev);
        return prev;
      })
    });
  },[])
  
  /*

{
    memoryId: '1',
    title: '今天有什么课？',
    messages: [{
      type: 'user',
      content: '今天有什么课？',
      createTime: '2024-06-01 10:00:00',
    },{
      type: 'assistant',
      content: '今天你有以下课程安排：\n- 周一：高等数学 (8:00-9:40)\n- 周二：大学英语 (10:00-11:40)\n- 周三：程序设计 (14:00-15:40)',
      createTime: '2024-06-01 10:01:00',
    }],
    createTime: '2024-06-01 10:00:00',
  }


  */
  // 获取当前对话

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // 对话内容变化后自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [conversations , activeConversationId]);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const res = await getList();
  //     if (res.success === true && res.data) {
  //       setConversations(res.data);
  //     }
  //   };
  //   fetchMessages().then(() => {
  //     scrollToBottom();
  //   });
  //   console.log("activeConversationId:", activeConversationId);
  // }, [activeConversationId]);

  // useEffect(() => {
  //   if (
  //     activeConversation.messages.length > 0 &&
  //     activeConversation.messages[activeConversation.messages.length - 1]
  //       .type === "user"
  //   ) {
  //     setIsLoading((prev) => true);
  //   } else {
  //     setIsLoading((prev) => false);
  //   }
  //   scrollToBottom();
  //   console.log("activeConversation", activeConversation);
  // }, [activeConversation]);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [isLoading]);
  // 创建新对话
  const handleNewChat = async () => {
    setIsNewPage(true);
    setActiveConversationId(null);
    setInputValue("");
    console.log("新对话activeConversationId:", activeConversationId);
  };

  // 输入框回车发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 删除对话
  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) => prev.filter((c) => c.memoryId !== id));
    if (activeConversationId === id) {
      setActiveConversationId(null);
    }
    // const fetchMessages = async () => {
    //   const res =  await getList();
    //   if(res.success === true && res.data){
    //     setConversations(res.data);
    //     // setConversations(prev => prev.filter(c => c.memoryId !== id))
    //   }
    // }
  };

  //选中对话
  const handleClickTitle = async (memoryId: string) => {
    setActiveConversationId(memoryId);
    setIsNewPage(false);
    const fetchMessages = async () => {
      const res = await getMessages(memoryId);
      if (res.success === true && res.data) {
        setConversations(prev => prev.map(c => (c.memoryId === memoryId && c.isLoaded == false) ? { ...c, isLoaded: true , Messages: res.data?.messages || [] } : c));
        console.log("消息记录加载成功", res.data);
        // console.log("选中activeConversationId:", activeConversationId);
      } 
    };
    if (conversations.find((c) => c.memoryId === memoryId)?.isLoaded == false) {
        await fetchMessages();
    }
  };

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    if(activeConversationId != null && conversations.find(c => c.memoryId === activeConversationId)?.isLoading == true) return;
    if(token == null){
      alert("请先登录！");
      return;
    }
    let defaultMemoryId = activeConversationId
    if(activeConversationId == null){
      let flag = false;
      const fetchMemoryId = async () => {
          const res =  await getNewMemoryId({content: inputValue.trim()});
          if(res.success == true && res.data){
            console.log("获取新的memoryId成功", res.data);
            setConversations(prev => [
                // 新元素：如果 res.data 存在，就创建新会话对象；否则可能是 undefined
                ...(res.data ? [{
                  memoryId: res.data.memoryId,
                  title: res.data.title,
                  createTime: res.data.createTime,
                  isLoaded: true,
                  isLoading: false,
                  Messages: [],
                  AiResponse: ""
                }] : []),
                // 扩展运算符：把原数组 prev 的所有元素追加到新数组中
                ...prev
              ])
            setConversations(prev =>{
              console.log("获取新的memoryId后更新会话列表", prev);
              return prev;
            })
            setActiveConversationId(res.data.memoryId);
            setIsNewPage(false);
            defaultMemoryId = res.data.memoryId;
            flag = true;
          }
      }
      await fetchMemoryId();
      if(flag == false) return;
    }
    
    console.log("获取新的activeConversationId:", activeConversationId);
    // setIsNewPage(true);
    setConversations(prev => prev.map(c => c.memoryId === defaultMemoryId ? { ...c, Messages:[...c.Messages , 
      {
        type:'user',
        content: inputValue.trim(),
        createTime: new Date().toISOString()
      },
      
    ] , isLoading:true,} : c));
    setInputValue("");
    const memoryId = defaultMemoryId || "";
    await getStreamingSend(inputValue.trim(), memoryId, conversations  , setConversations , token).finally(
      () => {
        let aiContent = "";
        setConversations(prev => {
          aiContent = prev.find(c => c.memoryId === memoryId)?.AiResponse || "";
          return prev;
        })
        setConversations(prev => prev.map(c => c.memoryId === memoryId ? { ...c, isLoading: false
          ,
          AiResponse: ''
          ,Messages: [...c.Messages , {
            type:'assistant',
            content: aiContent,
            createTime: new Date().toISOString()
          }]

          } : c));
        
      }
    )

    // console.log("运行到这了", assistantMessage);
    // 如果没有活动对话，创建新对话

    // 添加到现有对话

    // console.log("运行到这了2", assistantMessage);

    // 模拟 AI 响应

    // setIsLoading(false)
    // console.log("运行到这了3", assistantMessage);
  };

  // 模拟回复
  //  const generateResponse = (question: string) => {
  //   const responses: Record<string, string> = {
  //     '课程': '📚 本学期你有以下课程安排：\n- 周一：高等数学 (8:00-9:40)\n- 周二：大学英语 (10:00-11:40)\n- 周三：程序设计 (14:00-15:40)',
  //     '食堂': '🍜 推荐食堂：\n1. 一食堂：早餐推荐豆浆油条\n2. 二食堂：午餐推荐红烧肉套餐\n3. 三食堂：晚餐推荐麻辣烫',
  //     '图书馆': '📖 图书馆开放时间：\n- 周一至周五：7:30 - 22:30\n- 周末：8:00 - 22:00\n- 节假日：9:00 - 18:00',
  //   }

  //   for (const [key, value] of Object.entries(responses)) {
  //     if (question.includes(key)) return value
  //   }
  //   return `你好！我是科大小Y，很高兴为你服务。\n\n你问的是："${question}"\n\n这是一个模拟回复，实际使用时会连接后端 AI 接口为你提供更准确的答案。`
  // }
  //  const generateResponse = async(question: string):Promise<string> => {
  //     const result = await chatApi.sendMessage({memoryId: activeConversationId || "23412345" , content: question} );

  //     return result;

  //  }

  return (
    <div className="chat-page-outer">
      <div className="chat-page">
        {/* 左侧边栏 */}
        <aside
          className={`chat-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}
        >
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "展开侧边栏" : "收起侧边栏"}
          >
            <svg
              className="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="19314"
              width="24"
              height="24"
            >
              <path
                d="M866.8672 257.024H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z m0 307.2H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z m0 307.2H157.184c-30.208 0-54.6304-22.8864-54.6304-51.2 0-28.2624 24.4736-51.2 54.6304-51.2H866.816c30.208 0 54.6304 22.9376 54.6304 51.2 0 28.3136-24.4736 51.2-54.6304 51.2z"
                fill="#333333"
                p-id="19315"
              ></path>
            </svg>
          </button>
          <button className="new-chat-btn" onClick={handleNewChat}>
            <span>
              <svg
                className="icon"
                viewBox="0 0 1025 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7361"
                id="mx_n_1769086529222"
                width="21"
                height="21"
              >
                <path
                  d="M352.376267 760.009763C350.834511 761.551537 344.542685 764.999821 342.477506 765.457002L180.527334 801.308566 222.635043 843.416258 258.486607 681.466086C258.968311 679.290121 262.315961 673.185192 263.933828 671.567325L802.537066 132.964087C816.326621 119.17455 816.326621 96.817276 802.537066 83.027721 788.747511 69.238184 766.390237 69.238184 752.6007 83.027721L213.997462 621.630958C202.867871 632.76055 192.923842 650.894883 189.535232 666.202041L153.683668 828.152232C148.102938 853.36177 170.581839 875.840671 195.791378 870.259924L357.74155 834.40836C372.932502 831.045473 391.255217 821.003546 402.312651 809.94613L940.915871 271.34291C954.705426 257.553355 954.705426 235.196081 940.915871 221.406543 927.126334 207.616989 904.769059 207.616989 890.979505 221.406543L352.376267 760.009763ZM414.64915 72.685568 51.729426 72.685568C23.157654 72.685568 0 95.845588 0 124.414994L0 972.214166C0 1000.785938 23.16002 1023.943592 51.729426 1023.943592L899.528598 1023.943592C928.10037 1023.943592 951.258041 1000.783572 951.258041 972.214166L951.258041 609.294442 951.258041 427.83458C951.258041 408.333224 935.449053 392.524235 915.947697 392.524235 896.446323 392.524235 880.637352 408.333224 880.637352 427.83458L880.637352 609.294442 880.637352 972.214166C880.637352 961.782466 889.096033 953.322902 899.528598 953.322902L51.729426 953.322902C62.161143 953.322902 70.62069 961.781601 70.62069 972.214166L70.62069 124.414994C70.62069 134.846711 62.162008 143.306258 51.729426 143.306258L414.64915 143.306258 596.109012 143.306258C615.610386 143.306258 631.419357 127.497269 631.419357 107.995913 631.419357 88.494539 615.610386 72.685568 596.109012 72.685568L414.64915 72.685568ZM1008.873949 203.384814C1029.040658 183.218105 1029.030682 150.678581 1008.912031 130.559929L951.147855 72.795754 893.383662 15.031561C873.350038-5.002063 840.660092-5.031671 820.558777 15.069643L752.6007 83.027721C738.811145 96.817276 738.811145 119.17455 752.6007 132.964087 766.390237 146.753642 788.747511 146.753642 802.537066 132.964087L870.495144 65.006009C862.997098 72.504055 850.972531 72.49318 843.447296 64.967927L901.211489 122.73212 958.975665 180.496296C951.522074 173.042706 951.518349 160.867699 958.937582 153.448448L890.979505 221.406543C877.18995 235.196081 877.18995 257.553355 890.979505 271.34291 904.769059 285.132447 927.126334 285.132447 940.915871 271.34291L1008.873949 203.384814Z"
                  fill="#0057ff"
                  p-id="7362"
                ></path>
              </svg>
            </span>
            <span className="btn-text">新对话</span>
          </button>

          <div className="conversations-list">
            <div className="conversations-title">聊天记录</div>
            {conversations.length === 0 ? (
              <div className="no-conversations">暂无聊天记录</div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.memoryId}
                  className={`conversation-item ${activeConversationId === conv.memoryId ? "active" : ""}`}
                  onClick={() => {
                    handleClickTitle(conv.memoryId);
                  }}
                >
                  <svg
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="18052"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M507.904 60.416q93.184-1.024 175.104 33.792t143.872 94.72 97.792 141.312 36.864 174.592q1.024 88.064-30.208 165.888t-87.04 137.728-131.072 98.816-162.304 48.128q-22.528 3.072-48.128 5.12t-56.832 3.072-69.632 0-86.528-6.144q-106.496-10.24-158.208-26.624t-41.472-18.432q54.272-9.216 93.184-29.696 20.48-11.264 16.896-32.256t-19.968-39.424q-52.224-57.344-84.48-133.632t-34.304-164.352q-1.024-93.184 33.792-175.104t95.232-143.36 142.336-97.28 175.104-36.864zM707.584 510.976q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568-18.944-45.056-45.568-18.432-45.056 18.432-18.432 45.056zM450.56 510.976q0 26.624 19.456 46.08t46.08 19.456q27.648 0 46.592-19.456t18.944-46.08q0-27.648-18.944-46.592t-46.592-18.944q-26.624 0-46.08 18.944t-19.456 46.592zM196.608 509.952q0 26.624 18.944 46.08t45.568 19.456q27.648 0 46.592-19.456t18.944-46.08-18.944-45.568-46.592-18.944q-26.624 0-45.568 18.944t-18.944 45.568z"
                      p-id="18053"
                      fill="#bfbfbf"
                    ></path>
                  </svg>
                  <span className="conversation-title">{conv.title}</span>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteConversation(conv.memoryId, e)}
                    title="删除对话"
                  >
                    <svg
                      className="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="9595"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M814.29 136.567H207.664c-55.752 0-101.274 13.3-101.274 56.776v26.086h808.663v-26.086c0.511-42.965-45.011-56.776-100.763-56.776"
                        p-id="9596"
                        fill="#707070"
                      ></path>
                      <path
                        d="M723.245 191.808l-19.948-140.66c-3.58-27.62-29.667-50.125-57.287-50.125H376.456c-28.132 0-53.707 22.505-57.799 50.126l-19.948 141.17c-3.58 27.621 15.856 22.506 43.477 22.506h337.07c28.133-0.511 47.57 4.604 43.989-23.017z m-360.6-28.643L377.99 51.66h265.463l15.344 111.505H362.645zM831.17 282.342H190.785c-36.827 0-64.959 30.177-61.378 67.005l55.24 607.648c3.58 36.827 36.316 67.005 73.655 67.005h505.35c36.828 0 70.074-30.178 73.655-67.005l55.24-607.137c3.58-36.827-24.04-67.516-61.378-67.516zM376.456 953.415H245.514l-43.476-592.816h174.418v592.816z m221.474 0H423.512V360.599H597.93v592.816z m177.487 0H646.01V360.599h172.883l-43.476 592.816z"
                        p-id="9597"
                        fill="#707070"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* 右侧主区域 */}
        <main className="chat-main">
          {/* 没有对话时的欢迎界面 */}
          {isNewPage ? (
            <div className="chat-welcome">
              <div className="welcome-content">
                <img src={doubapImg} alt="科大小Y" />
                <h1>科大小Y</h1>
                <p>你的智能校园助手，有什么可以帮助你的吗？</p>

                <div className="quick-actions">
                  <button onClick={() => setInputValue("今天有什么课？")}>
                    📚 今天有什么讲座？
                  </button>
                  <button onClick={() => setInputValue("食堂推荐")}>
                    🍜 食堂推荐
                  </button>
                  <button onClick={() => setInputValue("图书馆开放时间")}>
                    📖 图书馆开放时间
                  </button>
                  <button onClick={() => setInputValue("校车时刻表")}>
                    🚌 校车时刻表
                  </button>
                </div>
              </div>

              {/* 输入框 - 欢迎界面 */}
              <div className="welcome-input-area">
                <div className="input-container">
                  <textarea
                    ref={inputRef}
                    className="chat-input"
                    placeholder="输入消息开始对话..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={1}
                  />
                  <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 对话界面 */
            <div className="chat-conversation">
              {/* 对话标题 */}
              <div className="conversation-header">
                <h2>{conversations.find(c => c.memoryId === activeConversationId)?.title || "新对话"}</h2>
              </div>

              {/* 消息列表 */}
              <div className="messages-container">
                {activeConversationId && conversations.find(c => c.memoryId === activeConversationId) && conversations.find(c => c.memoryId === activeConversationId)?.Messages.map((msg, index) => (
                  <div
                    className={`message ${msg.type === "user" ? "user" : "assistant"}`}
                    key={ conversations.find(c => c.memoryId === activeConversationId)?.memoryId + index + 1}
                  >
                    <div className="message-avatar">
                      {msg.type === "user" ? (
                        <img src={user?.avatar || stuImg} alt="用户" />
                      ) : (
                        <img src={doubapImg} alt="科大小Y" />
                      )}
                    </div>
                    <div className="message-body">
                      <div className="message-role">
                        {msg.type === "user" ? "你" : "科大小Y"}
                      </div>
                      <div className="message-content">
                        {/* {msg.content.split("\n").map((line, i) => (
                          <p key={i}>{line}</p>
                        ))} */}
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}

                {conversations.find(c => c.memoryId === activeConversationId)?.isLoading && (
                  <div className="message assistant">
                    <div className="message-avatar">
                      <img src={doubapImg} alt="科大小Y" />
                    </div>
                    <div className="message-body">
                      <div className="message-role">科大小Y</div>
                      <div className="message-content">
                        <ReactMarkdown>
                          {closeOpenMarkdownTokens(
                            conversations.find(c => c.memoryId === activeConversationId)?.AiResponse || ''
                          )}
                        </ReactMarkdown>
                        <div className="typing-indicator">
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
              <div className="chat-input-area">
                <div className="input-container">
                  <textarea
                    className="chat-input"
                    placeholder="继续对话..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={conversations.find(c => c.memoryId === activeConversationId)?.isLoading}
                    rows={1}
                  />
                  <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || conversations.find(c => c.memoryId === activeConversationId)?.isLoading}
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ChatPage;
