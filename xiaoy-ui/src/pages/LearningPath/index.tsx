import './LearningPath.css'
import { Link } from 'react-router-dom'

// Java 学习路线
const javaPath = {
  title: 'Java 后端开发',
  icon: '☕',
  color: '#f89820',
  description: '从零基础到架构师的完整学习路径',
  stages: [
    {
      name: '第一阶段：Java 基础',
      duration: '1-2个月',
      items: [
        'Java 语法基础（变量、流程控制、数组）',
        '面向对象编程（类、对象、继承、多态）',
        '集合框架（List、Set、Map）',
        '异常处理与 IO 流',
        '多线程基础',
        'Java 8+ 新特性（Lambda、Stream）'
      ]
    },
    {
      name: '第二阶段：数据库与持久化',
      duration: '1个月',
      items: [
        'MySQL 数据库基础',
        'SQL 语句编写与优化',
        'JDBC 原生操作',
        'MyBatis 框架',
        'MyBatis-Plus 增强',
        '数据库设计与范式'
      ]
    },
    {
      name: '第三阶段：Web 开发',
      duration: '1-2个月',
      items: [
        'HTTP 协议与 Servlet',
        'Spring Framework 核心概念',
        'Spring Boot 快速开发',
        'Spring MVC 请求处理',
        'RESTful API 设计',
        '参数校验与异常处理'
      ]
    },
    {
      name: '第四阶段：企业级开发',
      duration: '2-3个月',
      items: [
        'Spring Security 安全框架',
        'Redis 缓存应用',
        '消息队列（RabbitMQ/Kafka）',
        'Spring Cloud 微服务',
        'Docker 容器化部署',
        'Linux 服务器运维'
      ]
    },
    {
      name: '第五阶段：架构与优化',
      duration: '持续学习',
      items: [
        '分布式系统设计',
        '高并发解决方案',
        'JVM 调优',
        '数据库性能优化',
        '系统架构设计',
        '领域驱动设计（DDD）'
      ]
    }
  ]
}

// 推荐资源
const resources = [
  { name: 'JavaGuide', url: 'https://javaguide.cn/', desc: 'Java 学习面试指南', icon: '☕', highlight: true },
  { name: '小林 Coding', url: 'https://www.xiaolincoding.com/', desc: '图解计算机网络/操作系统', icon: '📚', highlight: true },
  { name: 'GitHub', url: 'https://github.com/', desc: '开源项目与代码托管', icon: '🐙', highlight: true },
  { name: 'ChatGPT', url: 'https://chatgpt.com/', desc: 'AI 辅助学习与问答', icon: '🤖', highlight: true },
  { name: 'LeetCode', url: 'https://leetcode.cn/', desc: '算法刷题平台', icon: '💻' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/', desc: '技术问答社区', icon: '❓' },
  { name: 'Maven 中央仓库', url: 'https://mvnrepository.com/', desc: '依赖查找', icon: '📦' },
  { name: 'Baeldung', url: 'https://www.baeldung.com/', desc: 'Java 技术教程', icon: '📖' }
]

// 推荐书籍
const books = [
  { name: '《Java 核心技术》', desc: 'Java 基础入门经典', level: '入门' },
  { name: '《Effective Java》', desc: 'Java 最佳实践', level: '进阶' },
  { name: '《深入理解 Java 虚拟机》', desc: 'JVM 原理详解', level: '高级' },
  { name: '《Java 并发编程实战》', desc: '多线程与并发', level: '进阶' },
  { name: '《Spring 实战》', desc: 'Spring 框架学习', level: '进阶' },
  { name: '《高性能 MySQL》', desc: '数据库优化', level: '高级' }
]

function LearningPath() {
  return (
    <div className="learning-path-page">
      {/* 头部 */}
      <header className="lp-header">
        <h1>📖 学习路线</h1>
        <p className="lp-subtitle">系统化的技术学习路径，助你从入门到精通</p>
      </header>

      {/* Java 学习路线 */}
      <section className="lp-main-path">
        <div className="path-card featured">
          <div className="path-header">
            <span className="path-icon">{javaPath.icon}</span>
            <div className="path-title-wrap">
              <h2>{javaPath.title}</h2>
              <p className="path-desc">{javaPath.description}</p>
            </div>
          </div>

          <div className="java-stages">
            {javaPath.stages.map((stage, index) => (
              <div key={index} className="java-stage">
                <div className="stage-header">
                  <span className="stage-number">{index + 1}</span>
                  <div className="stage-title">
                    <h3>{stage.name}</h3>
                    <span className="stage-duration">{stage.duration}</span>
                  </div>
                </div>
                <ul className="stage-items">
                  {stage.items.map((item, i) => (
                    <li key={i}>
                      <span className="item-dot">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                {index < javaPath.stages.length - 1 && (
                  <div className="stage-arrow">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 推荐资源 */}
      <section className="lp-resources">
        <h2>🔗 推荐资源</h2>
        <div className="resources-grid">
          {resources.map((res) => (
            <a
              key={res.name}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`resource-card ${res.highlight ? 'highlight' : ''}`}
            >
              <span className="resource-icon">{res.icon}</span>
              <div className="resource-info">
                <h3>{res.name}</h3>
                <p>{res.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 推荐书籍 */}
      <section className="lp-books">
        <h2>📚 推荐书籍</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.name} className="book-card">
              <div className="book-info">
                <h3>{book.name}</h3>
                <p>{book.desc}</p>
              </div>
              <span className={`book-level ${book.level}`}>{book.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 学习建议 */}
      <section className="lp-tips">
        <h2>💡 学习建议</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>🎯 循序渐进</h3>
            <p>按阶段学习，打好基础再进阶，不要急于求成</p>
          </div>
          <div className="tip-card">
            <h3>📝 动手实践</h3>
            <p>每学一个知识点都要写代码验证，做小项目巩固</p>
          </div>
          <div className="tip-card">
            <h3>📖 阅读源码</h3>
            <p>进阶阶段多阅读优秀开源项目源码，学习设计思想</p>
          </div>
          <div className="tip-card">
            <h3>🤝 交流分享</h3>
            <p>参与技术社区，写博客分享学习心得，教学相长</p>
          </div>
        </div>
      </section>

      {/* 模拟面试入口 */}
      <section className="lp-interview">
        <div className="interview-banner">
          <div className="interview-content">
            <span className="interview-icon">🎯</span>
            <div className="interview-info">
              <h2>AI 模拟面试</h2>
              <p>AI 出题、回答评估与改进建议，助你面试通关</p>
            </div>
          </div>
          <Link to="/interview" className="interview-btn">
            开始模拟
          </Link>
        </div>
        <div className="interview-features">
          <div className="feature-item">
            <span className="feature-icon">📝</span>
            <span>自定义题目方向</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span>AI 智能评分</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💡</span>
            <span>详细改进建议</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>回答记录追踪</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LearningPath
