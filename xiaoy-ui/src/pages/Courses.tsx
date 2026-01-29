function Courses() {
  return (
    <div className="page courses-page">
      <h1>📚 课程查询</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        查询您的课程安排、教室信息和考试时间
      </p>
      
      <div style={{ 
        background: 'var(--color-bg-card)', 
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
        <p style={{ color: 'var(--color-text-secondary)' }}>课程查询功能开发中...</p>
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
    </div>
  )
}

export default Courses
