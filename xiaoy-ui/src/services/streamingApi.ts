import type { ChatMessages } from "@/pages/ChatPage/ChatPage";
export const getStreamingSend = async (
  content: string,
  memoryId: string,
  Conservation: ChatMessages[],
  setConservation: React.Dispatch<React.SetStateAction<ChatMessages[]>>,
  token: string,
) => {
  if (!content.trim()) return;

  // 重置状态

  setConservation((prev) =>
    prev.map((c) => (c.memoryId === memoryId ? { ...c, AiResponse: "" } : c)),
  );

  // 取消之前的请求（避免多请求冲突）
  // if (abortControllerRef.current) {
  //   abortControllerRef.current.abort();
  // }
  // abortControllerRef.current = new AbortController();

  try {
    // 1. 发送POST请求（核心：支持流式）
    const response = await fetch(
      "http://localhost:8080/xiaoY/chatmessagebyuser/streaming-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // POST请求体格式
          Accept: "text/event-stream", // 声明接收SSE/流式数据
          Authorization: token,
        },
        body: JSON.stringify({ content, memoryId }), // 请求体（传给后端）
        // signal: abortControllerRef.current.signal, // 取消信号
      },
    );

    // 2. 检查响应是否正常
    if (!response.ok) {
      throw new Error(`请求失败：${response.status}`);
    }

    // 3. 获取流式读取器（关键：逐片读取）
    if (!response.body) {
      throw new Error("响应体为空");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8"); // 字节转字符串

    // 4. 循环读取流式数据
    while (true) {
      const { done, value } = await reader.read();
      // 流结束则退出循环
      if (done) break;
      // 字节转字符串
      let chunk = decoder.decode(value, { stream: true });
      chunk = chunk.replace(/data:\s*/g, "").trim();
      console.log(chunk);
      // 拼接并更新AI回复（核心：实时显示）
      setConservation((prev) =>
        prev.map((c) =>
          c.memoryId === memoryId
            ? { ...c, AiResponse: c.AiResponse + chunk }
            : c,
        ),
      );
    }
  } catch (error) {
    const err = error as Error;
    if (err.name !== "AbortError") {
      // 排除主动取消的错误
      console.error("流式请求失败：", error);
      setConservation((prev) =>
        prev.map((c) =>
          c.memoryId === memoryId
            ? { ...c, AiResponse: `请求失败：${err.message}` }
            : c,
        ),
      );
    }
  } finally {
    //   abortControllerRef.current = null;
  }
};
