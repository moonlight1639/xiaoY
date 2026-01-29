import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '0.5rem' }}>页面未找到</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        您访问的页面不存在
      </p>
      <Link to="/" className="btn btn-primary">
        返回首页
      </Link>
    </div>
  )
}

export default NotFound
