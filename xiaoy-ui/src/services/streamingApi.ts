import type { ChatMessages } from "@/pages/ChatPage/ChatPage";

const SSE_EVENT_DELIMITER = /\r?\n\r?\n/;
const SSE_LINE_DELIMITER = /\r?\n/;

/**
 * 从单个 SSE 事件文本中提取 data 字段内容。
 * SSE 规范：多个 data 行用 \n 连接（服务端用多行 data: 编码换行符）。
 */
function extractSSEData(event: string): string {
  const lines = event.split(SSE_LINE_DELIMITER);
  const dataLines: string[] = [];
  for (const line of lines) {
    if (line.startsWith("data:")) {
      // SSE 规范：冒号后第一个空格为可选格式空格，应跳过
      const content = line[5] === " " ? line.slice(5) : line.slice(5);
      dataLines.push(content);
    }
    // 忽略其他 SSE 字段（id:, event:, retry: 等）
  }
  return dataLines.join("\n");
}

export const getStreamingSend = async (
  content: string,
  memoryId: string,
  _conservation: ChatMessages[],
  setConservation: React.Dispatch<React.SetStateAction<ChatMessages[]>>,
  token: string,
) => {
  if (!content.trim()) return;

  // 重置状态
  setConservation((prev) =>
    prev.map((c) => (c.memoryId === memoryId ? { ...c, AiResponse: "" } : c)),
  );

  try {
    // 1. 发送POST请求（核心：支持流式）
    const response = await fetch(
      "http://localhost:8080/xiaoY/chatmessagebyuser/streaming-chat",
      // "/api/xiaoY/chatmessagebyuser/streaming-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          Authorization: token,
        },
        body: JSON.stringify({ content, memoryId }),
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
    const decoder = new TextDecoder("utf-8");

    // 4. 循环读取流式数据（使用 buffer 缓冲不完整的 SSE 事件）
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // 流结束时处理 buffer 中可能残余的最后一个事件
        if (buffer.trim()) {
          const text = extractSSEData(buffer);
          if (text) {
            setConservation((prev) =>
              prev.map((c) =>
                c.memoryId === memoryId
                  ? { ...c, AiResponse: c.AiResponse + text }
                  : c,
              ),
            );
          }
        }
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      // SSE 事件以空行分隔，兼容 \n\n 和 \r\n\r\n
      const parts = buffer.split(SSE_EVENT_DELIMITER );
      // 最后一段可能不完整，留在 buffer 等待下次 read
      buffer = parts.pop() || "";

      let chunk = "";
      for (const event of parts) {
        chunk += extractSSEData(event);
      }

      if (chunk) {
        setConservation((prev) =>
          prev.map((c) =>
            c.memoryId === memoryId
              ? { ...c, AiResponse: c.AiResponse + chunk }
              : c,
          ),
        );
      }
    }
  } catch (error) {
    const err = error as Error;
    if (err.name !== "AbortError") {
      console.error("流式请求失败：", error);
      setConservation((prev) =>
        prev.map((c) =>
          c.memoryId === memoryId
            ? { ...c, AiResponse: `请求失败：${err.message}` }
            : c,
        ),
      );
    }
  }
};
