import './Home.css'
import { Link} from 'react-router-dom'
function Home() {
  return (
    <div className="home-page">
      {/* 欢迎区域 */}
      <section className="hero-section">
        <h1 className="hero-title">欢迎来到科大小Y ！</h1>
        <p className="hero-subtitle">
          一个基于 Agent 构建的校园智能体
        </p>
        <div className="hero-actions">
          <Link to="/chat">
            <button className="btn btn-primary">开始使用</button>
          </Link>
          <button className="btn btn-outline">了解更多</button>
        </div>
      </section>


      <section className="features-section">
        <h2 className="section-title">猜你想做</h2>
        <div className="features-grid">
          <Link to="/chat">
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>小Y对话</h3>
              <p>基于 Agent 构建，通过对话享受便捷服务</p>
            </div>
          </Link>
          <Link to="/courses">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>讲座查询</h3>
              <p>一键查询讲座，方便快捷</p>
            </div>
          </Link>
          <Link to="/life">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>生活帮手</h3>
              <p>探索中科大各个校区的美食</p>
            </div>
          </Link>
          <Link to="/reviews">
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>课程点评</h3>
              <p>基于用户评价，帮助你选择优质课程</p>
            </div>
          </Link>

          
        </div>
      </section>

      {/* 快速开始 */}
      {/* <section className="quickstart-section">
        <h2 className="section-title">快速开始</h2>
        <div className="code-block">
          <code>
            # 安装依赖{'\n'}
            npm install{'\n\n'}
            # 启动开发服务器{'\n'}
            npm run dev
          </code>
        </div>
      </section> */}
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
  )
}

export default Home
