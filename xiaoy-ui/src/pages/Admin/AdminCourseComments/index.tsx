import React, { useEffect, useState } from "react";
import type { UpdateCourseComment , InsertCourseComment} from "@/types";
import { Pagination } from 'antd';
import defaultAvatar from "@/assets/avator/defaultAvator1.jpg";
import "./AdminCourseComments.css";
import {getUpdateCoursesCommmentList , updateCourseComment} from "@/services";
const userInfoitem: UpdateCourseComment[] = [
  {
    id: 1,
    courseId: 1,
    userId: 1,
    userName: "用户A",
    content: "这本书非常有趣，学到了很多组合数学的知识！",
    userAvatar: "",
    isDeleted: 0,
    likeNum:10,
    dislikeNum:2,
  },
  {
    id: 2,
    courseId: 1,
    userId: 2,
    userName: "用户B",
    content: "内容详实，适合初学者入门。",
    userAvatar: "",
    isDeleted: 0,
    likeNum:10,
    dislikeNum:2,
  },
  {
    id: 3,
    courseId: 1,
    userId: 3,
    userName: "用户C",
    content: "讲解清晰，但例题稍显简单。",
    userAvatar: "",
    isDeleted: 0,
    likeNum:10,
    dislikeNum:2,
  },
];

const isDeletedItems = [
  { value: 0, label: "正常", style: { backgroundColor: "#d4edda", color: "#155724" } },
  { value: 1, label: "已删除", style: { backgroundColor: "#f8d7da", color: "#721c24" } },
];


const AdminCourseComments: React.FC = () => {
  const [items, setItems] = useState<UpdateCourseComment[]>(userInfoitem);
  const [columns] = useState([
    { title: "课程ID", dataIndex: "courseId" },
    { title: "用户ID", dataIndex: "userId" },
    { title: "用户名", dataIndex: "userName" },
    { title: "用户头像", dataIndex: "userAvatar" },
    { title: "内容", dataIndex: "content" },
    { title: "点赞量", dataIndex: "likeNum" },
    { title: "不喜欢量", dataIndex: "dislikeNum" },
    { title: "是否删除", dataIndex: "isDeleted" },
    { title: "创建时间", dataIndex: "createTime" },
    { title: "更新时间", dataIndex: "updateTime" },
  ]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(500);
  const [pageSize , setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  // 批量操作状态
  const [batchMode, setBatchMode] = useState<'none' | 'add' | 'delete'>('none');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [batchModalOpen, setBatchModalOpen] = useState(false);

  //提交表单
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<InsertCourseComment>(
    {
      courseId: 0,
      userId: 0,
      userName: "",
      userAvatar: "",
      content: "",
      likeNum: 0,
      dislikeNum: 0,
      isDeleted: 0,

    }
  );

  // 打开页面的时候自动加载数据
  useEffect(() => {
    // Fetch user info list from API
    const fetchUserInfoList = async () => {
      const res = await getUpdateCoursesCommmentList(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        // setTotal(res.total || 100);
      }
    };
    fetchUserInfoList();
  }, [page, pageSize]);



  // const openCreate = () => {
  //   setEditing(null);
  //   setForm({
  //     courseId: 0,
  //     userId: 0,
  //     userName: "",
  //     userAvatar: "",
  //     content: "",
  //     likeNum: 0,
  //     dislikeNum: 0,
  //     isDeleted: 0,
  //   });
  //   setModalOpen(true);
  // };

  const openEdit = (item: UpdateCourseComment) => {
    setEditing(item.id);
    setForm({
      courseId: item.courseId,
      userId: item.userId,
      userName: item.userName,
      userAvatar: item.userAvatar,
      content: item.content,
      likeNum: item.likeNum,
      dislikeNum: item.dislikeNum,
      isDeleted: item.isDeleted,
    });


    setModalOpen(true);
  };

  const onSave = () => {
    // if (!form.nickname.trim() || !form.email.trim()) return;
    const fetchUserInfoList = async () => {
      const res = await getUpdateCoursesCommmentList(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        console.log("更新列表成功" , res.data , items);
        setModalOpen(false);
      }
      
    };
    if (editing) {
      const updateuseInfo = async () => {
        
        const res = await updateCourseComment({ id: editing, ...form });
        if (res.success == true) {
          console.log("更新成功");
          fetchUserInfoList();
          setPage(1);
        }
      };
      updateuseInfo();
      
    } 
    // else {
    
    // }
    
    
    
  };

  const onDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="CourseCommentsAdmin-page">
      <div className="CourseCommentsAdmin-page-header">
        <h1>💬 评论管理</h1>
      </div>

      <div className="CourseCommentsAdmin-toolbar">
        <div className="CourseCommentsAdmin-filters">
          <input
            className="CourseCommentsAdmin-input"
            placeholder="搜索评论ID / 用户名"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="CourseCommentsAdmin-actions">
          {batchMode === 'none' && (
            <>
              <button className="CourseCommentsAdmin-btn primary" style={{ marginRight: 12 }} onClick={() => setBatchMode('add')}>
                批量增加
              </button>
              <button className="CourseCommentsAdmin-btn danger" onClick={() => setBatchMode('delete')}>
                批量删除
              </button>
            </>
          )}
        </div>
      </div>

      <div className="CourseCommentsAdmin-card">
        <div className="CourseCommentsAdmin-table-wrap">
        <table className="CourseCommentsAdmin-table">
          <thead>
            <tr>
              <th style={{ width: 40, textAlign: 'center' }}>
                <input
                  type="checkbox"
                  style={{ cursor: 'pointer', width: 16, height: 16 }}
                  checked={items.length > 0 && selectedIds.length === items.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(items.map(item => item.id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.dataIndex}
                  style={{
                    // width: col.dataIndex === "userName" ? "200px" : undefined,
                    ...(col.dataIndex === "content" && { width: "400px" }),
                  }}
                >
                  {col.title}
                </th>
              ))}

              <th style={{ width: 160 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ backgroundColor: selectedIds.includes(item.id) ? '#f4f6ff' : '' }}>
                <td style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    style={{ cursor: 'pointer', width: 16, height: 16 }}
                    checked={selectedIds.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds([...selectedIds, item.id]);
                      } else {
                        setSelectedIds(selectedIds.filter(id => id !== item.id));
                      }
                    }}
                  />
                </td>
                <td>{item.courseId}</td>
                <td>{item.userId}</td>
                <td>{item.userName}</td>
                <td><img src={item.userAvatar || defaultAvatar} alt="用户头像" className="CourseCommentsAdmin-avatar" /></td>
                <td>
                  <div className="CourseCommentsAdmin-scroll-cell">
                    {item.content}
                  </div>
                  </td>
                <td>{item.likeNum}</td>
                <td>{item.dislikeNum}</td>
                <td>
                  <span className="CourseCommentsAdmin-tag" style={isDeletedItems[item.isDeleted]?.style}>
                    {isDeletedItems[item.isDeleted]?.label || item.isDeleted}
                  </span>
                </td>
                <td>{item.createTime}</td>
                <td>{item.updateTime}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'nowrap' }}>
                    <button
                      className="CourseCommentsAdmin-btn ghost"
                      onClick={() => openEdit(item)}
                    >
                      编辑
                    </button>
                    <button
                      className="CourseCommentsAdmin-btn danger"
                      onClick={() => onDelete(item.id)}
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div className="CourseCommentsAdmin-pagination" style={{ width: '100%', borderTop: 'none' }}>
            <span>共 {total} 条</span>
            <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }} />
          </div>
        </div>
      </div>

      {/* 固定在页面左下角的批量操作面板 */}
      {batchMode !== 'none' && (
        <div style={{
          position: 'fixed',
          left: '260px', /* 假设侧边栏宽度，根据您实际情况可能需要调整 */
          bottom: '40px',
          background: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 90,
          animation: 'maskIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <span style={{ fontSize: '0.95rem', color: '#555', fontWeight: 500 }}>
            已选择 <strong style={{ color: '#4361ee', fontSize: '1.1rem' }}>{selectedIds.length}</strong> 项
          </span>
          <div style={{ width: '1px', height: '24px', background: '#eee' }}></div>
          <button 
            className={`CourseCommentsAdmin-btn ${batchMode === 'delete' ? 'danger' : 'primary'}`}
            disabled={selectedIds.length === 0}
            style={{ opacity: selectedIds.length === 0 ? 0.5 : 1, cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer' }}
            onClick={() => setBatchModalOpen(true)}
          >
            确定{batchMode === 'delete' ? '删除' : '增加'}
          </button>
          <button 
            className="CourseCommentsAdmin-btn ghost" 
            onClick={() => { setBatchMode('none'); setSelectedIds([]); }}
          >
            退出选择
          </button>
        </div>
      )}

      {batchModalOpen && (
        <div className="CourseCommentsAdmin-modal-mask" onClick={() => setBatchModalOpen(false)}>
          <div className="CourseCommentsAdmin-modal" style={{ width: 400 }} onClick={e => e.stopPropagation()}>
            <div className="CourseCommentsAdmin-modal-header">
              <h3>提示</h3>
              <button className="CourseCommentsAdmin-modal-close" onClick={() => setBatchModalOpen(false)}>✕</button>
            </div>
            <div className="CourseCommentsAdmin-modal-body" style={{ minHeight: '60px', display: 'flex', alignItems: 'center' }}>
              <p style={{ fontSize: '1.05rem', color: '#333', margin: 0 }}>
                确定要执行批量<strong style={{ color: batchMode === 'delete' ? '#e63946' : '#4361ee', margin: '0 4px' }}>{batchMode === 'delete' ? '删除' : '增加'}</strong>操作吗？<br/>
                <span style={{ fontSize: '0.9rem', color: '#888', marginTop: '12px', display: 'inline-block' }}>共选中 {selectedIds.length} 项</span>
              </p>
            </div>
            <div className="CourseCommentsAdmin-modal-footer">
              <button className="CourseCommentsAdmin-btn ghost" onClick={() => setBatchModalOpen(false)}>取消</button>
              <button 
                className={`CourseCommentsAdmin-btn ${batchMode === 'delete' ? 'danger' : 'primary'}`} 
                onClick={() => {
                  console.log(`执行批量${batchMode}，IDs: `, selectedIds);
                  setBatchModalOpen(false);
                  setBatchMode('none');
                  setSelectedIds([]);
                  // 此处可以加入刷新列表的逻辑
                }}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="CourseCommentsAdmin-modal-mask" onClick={() => setModalOpen(false)}>
          <div className="CourseCommentsAdmin-modal" onClick={e => e.stopPropagation()}>
            <div className="CourseCommentsAdmin-modal-header">
              <h3>{editing ? "编辑评论" : "新增评论"}</h3>
              <button className="CourseCommentsAdmin-modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="CourseCommentsAdmin-modal-body">
              <div className="CourseCommentsAdmin-form-group">
                <label className="CourseCommentsAdmin-form-label">课程 ID</label>
                <input
                  className="CourseCommentsAdmin-input"
                  type="number"
                  min={0}
                  placeholder="关联的课程ID"
                  value={form.courseId}
                  onChange={(e) => setForm((v) => ({ ...v, courseId: e.target.value ? Number(e.target.value) : 0 }))}
                />
              </div>
              <div className="CourseCommentsAdmin-form-group">
                <label className="CourseCommentsAdmin-form-label">用户 ID</label>
                <input
                  className="CourseCommentsAdmin-input"
                  type="number"
                  min={0}
                  placeholder="评论用户ID"
                  value={form.userId}
                  onChange={(e) => setForm((v) => ({ ...v, userId: e.target.value ? Number(e.target.value) : 0 }))}
                />
              </div>
              <div className="CourseCommentsAdmin-form-group">
                <label className="CourseCommentsAdmin-form-label">用户名</label>
                <input
                  className="CourseCommentsAdmin-input"
                  placeholder="请输入用户名"
                  value={form.userName}
                  onChange={(e) => setForm((v) => ({ ...v, userName: e.target.value }))}
                />
              </div>
              <div className="CourseCommentsAdmin-form-group">
                <label className="CourseCommentsAdmin-form-label">评论内容</label>
                <textarea
                  className="CourseCommentsAdmin-form-textarea"
                  placeholder="请输入评论内容..."
                  value={form.content}
                  onChange={(e) => setForm((v) => ({ ...v, content: e.target.value }))}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="CourseCommentsAdmin-form-group">
                  <label className="CourseCommentsAdmin-form-label">点赞量</label>
                  <input
                    className="CourseCommentsAdmin-input"
                    type="number"
                    min={0}
                    value={form.likeNum}
                    onChange={(e) => setForm((v) => ({ ...v, likeNum: e.target.value ? Number(e.target.value) : 0 }))}
                  />
                </div>
                <div className="CourseCommentsAdmin-form-group">
                  <label className="CourseCommentsAdmin-form-label">不喜欢量</label>
                  <input
                    className="CourseCommentsAdmin-input"
                    type="number"
                    min={0}
                    value={form.dislikeNum}
                    onChange={(e) => setForm((v) => ({ ...v, dislikeNum: e.target.value ? Number(e.target.value) : 0 }))}
                  />
                </div>
              </div>
              <div className="CourseCommentsAdmin-form-group">
                <label className="CourseCommentsAdmin-form-label">状态</label>
                <select
                  className="CourseCommentsAdmin-select"
                  value={form.isDeleted}
                  onChange={(e) => setForm((v) => ({ ...v, isDeleted: Number(e.target.value) as UpdateCourseComment["isDeleted"] }))}
                >
                  {isDeletedItems.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="CourseCommentsAdmin-modal-footer">
              <button className="CourseCommentsAdmin-btn ghost" onClick={() => setModalOpen(false)}>取消</button>
              <button className="CourseCommentsAdmin-btn primary" onClick={onSave}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseComments;
