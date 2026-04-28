import { Link } from "react-router-dom"

function Life() {
  return (
    <div className="page life-page" style={{ padding: '2rem' }}>
      <h1>🏠 生活帮手</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        校园生活一站式服务：食堂、图书馆、校医院、校车等
      </p>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {[
          { icon: '🍜', title: '食堂信息', desc: '查看各食堂菜单和营业时间' , to: '/canteen'},
          { icon: '📖', title: '学习路线', desc: '系统化的技术学习路径' , to: '/learning'},
          { icon: '🎯', title: '面试模拟问答', desc: 'AI 出题、回答评估与改进建议' , to: '/interview'},
          { icon: '🏥', title: '校医院', desc: '校医院科室介绍和就诊指南' , to: '/hospital'},
          { icon: '🚌', title: '校车时刻', desc: '校园巴士线路和时间' , to: '/bus'},
        ].map(item => (
          <Link to={item.to} key={item.title} style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '1rem',
            padding: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>{item.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Life
