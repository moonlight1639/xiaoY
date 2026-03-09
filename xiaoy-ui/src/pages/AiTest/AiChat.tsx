import { useState, useRef } from 'react';

const AiChat = () => {
  // 状态管理
  const [content, setMessage] = useState(''); // 用户输入
  const [aiReply, setAiReply] = useState(''); // AI流式回复
  const [loading, setLoading] = useState(false); // 加载状态
  const abortControllerRef = useRef<AbortController | null>(null); // 用于取消请求
  const [memoryId] = useState<string | null>("65ea10db-ea8b-479a-a790-66e9a1e9443f"); // 会话ID（可选）
  // 发送POST请求，获取Flux<String>流式响应
  const handleSend = async () => {
    if (!content.trim() || loading) return;

    // 重置状态
    setAiReply('');
    setLoading(true);
    // 取消之前的请求（避免多请求冲突）
    // if (abortControllerRef.current) {
    //   abortControllerRef.current.abort();
    // }
    // abortControllerRef.current = new AbortController();

    try {
      // 1. 发送POST请求（核心：支持流式）
      const response = await fetch('http://localhost:8080/xiaoY/chatmessagebyuser/streaming-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // POST请求体格式
          'Accept': 'text/event-stream', // 声明接收SSE/流式数据
          'Authorization':'xiaoY:login:user:token:0f9470d6-600d-4a08-a3b0-f7c5c30d0941'
        },
        body: JSON.stringify({ content, memoryId }), // 请求体（传给后端）
        // signal: abortControllerRef.current.signal, // 取消信号
      });

      // 2. 检查响应是否正常
      if (!response.ok) {
        throw new Error(`请求失败：${response.status}`);
      }

      // 3. 获取流式读取器（关键：逐片读取）
      if (!response.body) {
        throw new Error('响应体为空');
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8'); // 字节转字符串

      // 4. 循环读取流式数据
      while (true) {
        const { done, value } = await reader.read();
        // 流结束则退出循环
        if (done) break;
        // 字节转字符串
        const chunk = decoder.decode(value, { stream: true });
        // 拼接并更新AI回复（核心：实时显示）
        setAiReply(prev => prev + chunk);
      }

    } catch (error) {
      const err = error as Error;
      if (err.name !== 'AbortError') { // 排除主动取消的错误
        console.error('流式请求失败：', error);
        setAiReply(`请求失败：${err.message}`);
      }
    } finally {
      setLoading(false);
    //   abortControllerRef.current = null;
    }
  };

  // 取消请求
  const handleCancel = () => {
    if (abortControllerRef.current) {
    //   abortControllerRef.current.abort();
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: 20 }}>
      {/* 用户输入 */}
      <div>
        <textarea
          value={content}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="请输入你的问题..."
          style={{ width: '100%', height: 100, padding: 10, marginBottom: 10 }}
          disabled={loading}
          />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{ padding: "8px 16px", marginRight: 10, backgroundColor: '#1677ff', color: 'white', border: 'none', borderRadius: 4 }}
        >
        {loading ? '思考中...' : '发送'}
      </button>
      <button
        onClick={handleCancel}
        disabled={!loading}
        style={{ padding: "8px 16px", backgroundColor: '#f5222d', color: 'white', border: 'none', borderRadius: 4 }}
      >
      取消
    </button>
    </div>

    {/* AI流式回复 */}
  <div style={{ marginTop: 20, padding: 15, border: '1px solid #e8e8e8', borderRadius: 4, minHeight: 150 }}>
        {aiReply || '等待AI回复...'}
      </div>
    </div>
  );
};

export default AiChat;