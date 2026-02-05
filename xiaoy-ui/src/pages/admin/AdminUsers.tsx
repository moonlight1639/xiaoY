import React, { useMemo, useState } from 'react';

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: '管理员' | '运营' | '访客';
  status: '启用' | '停用';
  createdAt: string;
};

const seed: UserItem[] = [
  { id: 1001, name: '张三', email: 'zhangsan@corp.com', role: '管理员', status: '启用', createdAt: '2024-01-12' },
  { id: 1002, name: '李四', email: 'lisi@corp.com', role: '运营', status: '启用', createdAt: '2024-02-01' },
  { id: 1003, name: '王五', email: 'wangwu@corp.com', role: '访客', status: '停用', createdAt: '2024-02-18' }
];

const pageSize = 5;

const AdminUsers: React.FC = () => {
  const [items, setItems] = useState<UserItem[]>(seed);
  const [keyword, setKeyword] = useState('');
  const [role, setRole] = useState<'全部' | UserItem['role']>('全部');
  const [status, setStatus] = useState<'全部' | UserItem['status']>('全部');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<UserItem | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: '运营' as UserItem['role'], status: '启用' as UserItem['status'] });

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return items.filter(i => {
      const matchKw = !kw || i.name.toLowerCase().includes(kw) || i.email.toLowerCase().includes(kw);
      const matchRole = role === '全部' || i.role === role;
      const matchStatus = status === '全部' || i.status === status;
      return matchKw && matchRole && matchStatus;
    });
  }, [items, keyword, role, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', email: '', role: '运营', status: '启用' });
    setModalOpen(true);
  };

  const openEdit = (item: UserItem) => {
    setEditing(item);
    setForm({ name: item.name, email: item.email, role: item.role, status: item.status });
    setModalOpen(true);
  };

  const onSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...form } : i));
    } else {
      setItems(prev => [
        { id: Date.now(), createdAt: new Date().toISOString().slice(0, 10), ...form },
        ...prev
      ]);
    }
    setModalOpen(false);
  };

  const onDelete = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h3>用户管理</h3>
        <p>企业级用户账户维护与权限运营</p>
      </div>

      <div className="admin-toolbar">
        <div className="admin-filters">
          <input
            className="admin-input"
            placeholder="搜索姓名 / 邮箱"
            value={keyword}
            onChange={e => { setKeyword(e.target.value); setPage(1); }}
          />
          <select className="admin-select" value={role} onChange={e => { setRole(e.target.value as any); setPage(1); }}>
            <option>全部</option>
            <option>管理员</option>
            <option>运营</option>
            <option>访客</option>
          </select>
          <select className="admin-select" value={status} onChange={e => { setStatus(e.target.value as any); setPage(1); }}>
            <option>全部</option>
            <option>启用</option>
            <option>停用</option>
          </select>
        </div>
        <div className="admin-actions">
          <button className="admin-btn primary" onClick={openCreate}>+ 新增用户</button>
        </div>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>状态</th>
              <th>创建时间</th>
              <th style={{ width: 160 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td><span className={`tag role-${item.role}`}>{item.role}</span></td>
                <td><span className={`tag status-${item.status}`}>{item.status}</span></td>
                <td>{item.createdAt}</td>
                <td>
                  <button className="admin-btn ghost" onClick={() => openEdit(item)}>编辑</button>
                  <button className="admin-btn danger" onClick={() => onDelete(item.id)}>删除</button>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="empty">暂无数据</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="admin-pagination">
          <span>共 {filtered.length} 条</span>
          <div className="pager">
            <button className="admin-btn ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>上一页</button>
            <span>{page} / {totalPages}</span>
            <button className="admin-btn ghost" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>下一页</button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="admin-modal-mask">
          <div className="admin-modal">
            <h4>{editing ? '编辑用户' : '新增用户'}</h4>
            <div className="admin-form">
              <label>姓名</label>
              <input className="admin-input" value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} />
              <label>邮箱</label>
              <input className="admin-input" value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} />
              <label>角色</label>
              <select className="admin-select" value={form.role} onChange={e => setForm(v => ({ ...v, role: e.target.value as any }))}>
                <option>管理员</option>
                <option>运营</option>
                <option>访客</option>
              </select>
              <label>状态</label>
              <select className="admin-select" value={form.status} onChange={e => setForm(v => ({ ...v, status: e.target.value as any }))}>
                <option>启用</option>
                <option>停用</option>
              </select>
            </div>
            <div className="admin-modal-actions">
              <button className="admin-btn ghost" onClick={() => setModalOpen(false)}>取消</button>
              <button className="admin-btn primary" onClick={onSave}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
