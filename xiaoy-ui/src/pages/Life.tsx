import { Link } from "react-router-dom"

function Life() {
  return (
    <div className="page life-page">
      <h1>🏠 生活帮手</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        校园生活一站式服务：食堂、图书馆、快递、校车等
      </p>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {[
          { icon: '🍜', title: '食堂信息', desc: '查看各食堂菜单和营业时间' , to: '/canteen'},
          { icon: '📖', title: '图书馆', desc: '座位预约、开放时间' , to: '/library'},
          { icon: '📦', title: '快递服务', desc: '快递点位置和取件' , to: '/express'},
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
