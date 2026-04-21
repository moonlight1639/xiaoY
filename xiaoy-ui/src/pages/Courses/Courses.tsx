import { useEffect, useRef, useState } from 'react';

function Courses() {
  const ctaRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
          }
        }

        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 30px rgba(91, 91, 234, 0.4), inset 0 0 20px rgba(91, 91, 234, 0.1);
          }
          50% {
            box-shadow: 0 0 60px rgba(91, 91, 234, 0.8), inset 0 0 30px rgba(91, 91, 234, 0.2);
          }
          100% {
            box-shadow: 0 0 30px rgba(91, 91, 234, 0.4), inset 0 0 20px rgba(91, 91, 234, 0.1);
          }
        }

        .courses-page-enter {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        .card-enter {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .card-enter:nth-child(1) { animation-delay: 0.1s; }
        .card-enter:nth-child(2) { animation-delay: 0.2s; }
        .card-enter:nth-child(3) { animation-delay: 0.3s; }
        .card-enter:nth-child(4) { animation-delay: 0.4s; }
        .card-enter:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
      <div className="page courses-page" style={{ padding: '2rem' }}>
      <div className="courses-page-enter">
        <h1>科大小Y - AI 问答助手</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          基于 RAG 的智能问答平台，为您答疑解惑
        </p>
      </div>
      
      {/* 项目简介 */}
      <div className="card-enter" style={{ 
        background: 'var(--color-bg-card)', 
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0, color: 'var(--color-text-primary)' }}>📖 项目简介</h2>
        <p style={{ lineHeight: '1.8', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
          小Y 是一个基于 React + Java + LangChain4J 构建的智能 AI 问答系统。系统采用 RAG（检索增强生成）技术，
          通过动态管理知识库，实现精准的智能问答。用户可以灵活上传和编辑知识库内容，AI 根据最新的知识库信息
          提供准确回答。同时支持 Function Calling 技术，赋予 AI 调用外部工具的能力，并通过富有表现力的数据可视化
          展示问答统计和知识分布，为用户提供全面的学习和决策支持。
        </p>
      </div>

      {/* 技术栈 */}
      <div className="card-enter" style={{ 
        background: 'var(--color-bg-card)', 
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0, color: 'var(--color-text-primary)' }}>⚙️ 技术栈</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ 
            background: 'var(--color-bg-secondary)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#61dafb' }}>前端</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>⚛️ React</p>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>前端 UI 框架</p>
          </div>
          <div style={{ 
            background: 'var(--color-bg-secondary)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#f89820' }}>后端</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>☕ Java</p>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>后端服务框架</p>
          </div>
          <div style={{ 
            background: 'var(--color-bg-secondary)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#00d4ff' }}>AI 引擎</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>🧠 LangChain4J</p>
            <p style={{ margin: '0.25rem 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>大语言模型框架</p>
          </div>
        </div>
      </div>

      {/* 项目亮点 */}
      <div className="card-enter" style={{ 
        background: 'var(--color-bg-card)', 
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0, color: 'var(--color-text-primary)' }}>✨ 项目亮点</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>🗄️</span>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>RAG 知识库管理</h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                支持动态上传和编辑知识库内容，AI 能够根据最新的知识库信息提供准确的回答
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>🎯</span>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>精准问答</h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                基于检索增强生成（RAG）技术，确保回答与知识库内容高度相关
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>🔄</span>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>实时更新</h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                灵活的知识库管理界面，让您随时调整 AI 的知识来源和学习内容
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>💬</span>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>自然对话处理</h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                采用先进的自然语言处理技术，理解用户意图，提供流畅自然的对话体验
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>📊</span>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>数据可视化</h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                动态图表展示问题数据和问答统计，直观呈现知识库内容分布和热点话题
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem', minWidth: '2rem' }}>🔧</span>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Function Calling 支持</h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                支持 AI 自主调用外部接口和工具函数，扩展 AI 能力，实现更复杂的业务逻辑
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 信息来源 */}
      <div className="card-enter" style={{ 
        background: 'var(--color-bg-card)', 
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginTop: 0, color: 'var(--color-text-primary)' }}>📚 信息来源</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          我们的知识库来自以下权威信息来源：
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a 
            href="https://ustcguide.gitbook.io/admission" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              color: 'var(--color-primary, #5b5bea)',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-secondary)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>🔗</span>
            <div>
              <div style={{ fontWeight: '500' }}>USTC不完全入学指南</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                https://ustcguide.gitbook.io/admission
              </div>
            </div>
          </a>
          <a 
            href="https://www.wolai.com/ustcse/eNDbNZUnpVc7ZwRL9EWbHd" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              color: 'var(--color-primary, #5b5bea)',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-secondary)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>🔗</span>
            <div>
              <div style={{ fontWeight: '500' }}>woali-中国科学技术大学软件学院冒险者指南</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                https://www.wolai.com/ustcse/eNDbNZUnpVc7ZwRL9EWbHd
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* 快速开始 */}
      <div 
        ref={ctaRef}
        style={{ 
          background: 'linear-gradient(135deg, var(--color-primary, #5b5bea) 0%, var(--color-secondary, #7b68ee) 100%)',
          borderRadius: '1rem',
          padding: '4rem 2rem',
          minHeight: '300px',
          color: 'white',
          textAlign: 'center',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: isVisible ? 'slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
          boxShadow: isVisible ? '0 20px 60px rgba(91, 91, 234, 0.3)' : '0 10px 30px rgba(91, 91, 234, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* 背景动画球 */}
        {isVisible && (
          <>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-10%',
              width: '300px',
              height: '300px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              animation: 'glowPulse 4s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-10%',
              width: '250px',
              height: '250px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
              animation: 'glowPulse 5s ease-in-out infinite 0.5s'
            }}></div>
          </>
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 'bold' }}>🚀 开始使用</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.95, fontSize: '1.1rem' }}>
            前往 AI 问答页面，体验智能问答的强大功能
          </p>
        <a 
          href="/chat"
          style={{
            display: 'inline-block',
            padding: '1.2rem 3rem',
            background: 'white',
            color: 'var(--color-primary, #5b5bea)',
            textDecoration: 'none',
            borderRadius: '0.8rem',
            fontWeight: '700',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: 'pointer',
            animation: isVisible ? 'pulse 2s infinite 0.5s' : 'none',
            boxShadow: isVisible ? '0 10px 30px rgba(255, 255, 255, 0.3)' : '0 5px 15px rgba(255, 255, 255, 0.2)',
            fontSize: '1.1rem',
            letterSpacing: '0.5px',
            border: 'none',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.3)';
          }}
        >
          去提问 →
        </a>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 科大小Y. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">隐私政策</a>
            <a href="#">服务条款</a>
            <a href="#">联系我们</a>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}

export default Courses
