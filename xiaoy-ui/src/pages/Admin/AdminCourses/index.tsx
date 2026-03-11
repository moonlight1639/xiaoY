import React, { useEffect, useState } from "react";
import type { UpdateCourse, InsertCourse } from "@/types";
import { Pagination } from "antd";
import "./AdminCourses.css";
import { getUpdateCourses, updateCourse } from "@/services";
import { UpLoad } from "@/components";
const userInfoitem: UpdateCourse[] = [
  {
    id: 1001,
    courseName: "前端入门",
    teacher: "张三",
    description: "学习前端基础知识",
    avatar: "",
    readCount: 150,
    likeCount: 30,
    commentCount: 10,
    collectCount: 20,
    isDeleted: 0,
    createTime: "2023-01-01 10:00:00",
    updateTime: "2023-01-05 12:00:00",
  },
  {
    id: 1002,
    courseName: "后端开发",
    teacher: "李四",
    description: "掌握后端开发技术",
    avatar: "",
    readCount: 200,
    likeCount: 50,
    commentCount: 15,
    collectCount: 25,
    isDeleted: 0,
    createTime: "2023-02-01 11:00:00",
    updateTime: "2023-02-06 13:00:00",
  },
  {
    id: 1003,
    courseName: "数据库设计",
    teacher: "王五",
    description: "学习数据库设计原理",
    avatar: "",
    readCount: 180,
    likeCount: 40,
    commentCount: 12,
    collectCount: 22,
    isDeleted: 0,
    createTime: "2023-03-01 09:30:00",
    updateTime: "2023-03-05 14:00:00",
  },
];

const isDeletedItems = [
  {
    value: 0,
    label: "正常",
    style: { backgroundColor: "#d4edda", color: "#155724" },
  },
  {
    value: 1,
    label: "已删除",
    style: { backgroundColor: "#f8d7da", color: "#721c24" },
  },
];

const AdminCourses: React.FC = () => {
  const [items, setItems] = useState<UpdateCourse[]>(userInfoitem);
  const [columns] = useState([
    { title: "课程名称", dataIndex: "courseName" },
    { title: "指导老师", dataIndex: "teacher" },
    { title: "描述", dataIndex: "description" },
    { title: "头像", dataIndex: "avatar" },
    { title: "阅读量", dataIndex: "readCount" },
    { title: "点赞量", dataIndex: "likeCount" },
    { title: "评论量", dataIndex: "commentCount" },
    { title: "收藏量", dataIndex: "collectCount" },
    { title: "状态", dataIndex: "isDeleted" },
    { title: "创建时间", dataIndex: "createTime" },
    { title: "更新时间", dataIndex: "updateTime" },
  ]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(500);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  // 批量操作状态
  const [batchMode, setBatchMode] = useState<'none' | 'add' | 'delete'>('none');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [batchModalOpen, setBatchModalOpen] = useState(false);

  //提交表单
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<InsertCourse>({
    courseName: "",
    teacher: "",
    description: "",
    avatar: "",
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    collectCount: 0,
    isDeleted: 0,
  });

  // 打开页面的时候自动加载数据
  useEffect(() => {
    // Fetch user info list from API
    const fetchUserInfoList = async () => {
      const res = await getUpdateCourses(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        // setTotal(res.total || 100);
      }
    };
    fetchUserInfoList();
  }, [page, pageSize]);

  const openCreate = () => {
    setEditing(null);
    setForm({
      courseName: "",
      teacher: "",
      description: "",
      avatar: "",
      readCount: 0,
      likeCount: 0,
      commentCount: 0,
      collectCount: 0,
      isDeleted: 0,
    });
    setModalOpen(true);
  };

  const openEdit = (item: UpdateCourse) => {
    setEditing(item.id);
    setForm({
      courseName: item.courseName,
      teacher: item.teacher,
      description: item.description,
      avatar: item.avatar,
      readCount: item.readCount,
      likeCount: item.likeCount,
      commentCount: item.commentCount,
      collectCount: item.collectCount,
      isDeleted: item.isDeleted,
    });

    setModalOpen(true);
  };

  const onSave = () => {
    // if (!form.courseName.trim() || !form.teacher.trim()) return;
    const fetchUserInfoList = async () => {
      const res = await getUpdateCourses(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        console.log("更新列表成功", res.data, items);
        setModalOpen(false);
      }
    };
    if (editing) {
      const updateuseInfo = async () => {
        const res = await updateCourse({ id: editing, ...form });
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

  const handleAvatarChange = (src: string, item: UpdateCourse) => {
    // console.log("新的头像URL：" , src);
    // 可以在这里将新的头像URL更新到对应用户的信息中，或者直接调用接口更新用户信息
    const updateuseInfo = async () => {
      const res = await updateCourse({ ...item, avatar: src });
      if (res.success == true) {
        // console.log("更新成功");
      }
    };
    updateuseInfo();
  };
  const onDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="CourseAdmin-page">
      <div className="CourseAdmin-page-header">
        <h1>📚 课程管理</h1>
        <p>管理平台上的所有课程内容、指导老师及数据表现</p>
      </div>

      <div className="CourseAdmin-toolbar">
        <div className="CourseAdmin-filters">
          <input
            className="CourseAdmin-input"
            placeholder="搜索课程名称 / 指导老师"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="CourseAdmin-actions">
          {batchMode === 'none' && (
            <>
              <button className="CourseAdmin-btn primary" style={{ marginRight: 12 }} onClick={() => setBatchMode('add')}>
                批量增加
              </button>
              <button className="CourseAdmin-btn danger" style={{ marginRight: 12 }} onClick={() => setBatchMode('delete')}>
                批量删除
              </button>
              <button className="CourseAdmin-btn primary" onClick={openCreate}>
                + 新增课程
              </button>
            </>
          )}
        </div>
      </div>

      <div className="CourseAdmin-card">
        <div className="CourseAdmin-table-wrap">
          <table className="CourseAdmin-table">
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
                      ...(col.dataIndex === "description" && {
                        width: "320px",
                      }),
                      ...(col.dataIndex === "courseName" && { width: "200px" }),
                      ...(col.dataIndex === "teacher" && { width: "120px" }),
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
                  <td>{item.courseName}</td>
                  <td>{item.teacher ? item.teacher : "null"}</td>
                  <td >
                    <div className="CourseAdmin-scroll-cell">
                      {item.description ? item.description : "null"}
                    </div>
                  </td>
                  <td>
                    <UpLoad
                      avatar={item.avatar}
                      returnSrc={(src: string) => handleAvatarChange(src, item)}
                    />
                  </td>
                  <td>{item.readCount}</td>
                  <td>{item.likeCount}</td>
                  <td>{item.commentCount}</td>
                  <td>{item.collectCount}</td>

                  <td>
                    <span
                      className="CourseAdmin-tag"
                      style={isDeletedItems[item.isDeleted]?.style}
                    >
                      {isDeletedItems[item.isDeleted]?.label || item.isDeleted}
                    </span>
                  </td>
                  <td>{item.createTime}</td>
                  <td>{item.updateTime}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'nowrap' }}>
                      <button
                        className="CourseAdmin-btn ghost"
                        onClick={() => openEdit(item)}
                      >
                        编辑
                      </button>
                      <button
                        className="CourseAdmin-btn danger"
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
          <div className="CourseAdmin-pagination" style={{ width: '100%', borderTop: 'none' }}>
            <span>共 {total} 条</span>
            <Pagination
              defaultCurrent={1}
              total={total}
              pageSize={pageSize}
              current={page}
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
            />
          </div>
        </div>
      </div>

      {/* 固定在页面左下角的批量操作面板 */}
      {batchMode !== 'none' && (
        <div style={{
          position: 'fixed',
          left: '260px',
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
            className={`CourseAdmin-btn ${batchMode === 'delete' ? 'danger' : 'primary'}`}
            disabled={selectedIds.length === 0}
            style={{ opacity: selectedIds.length === 0 ? 0.5 : 1, cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer' }}
            onClick={() => setBatchModalOpen(true)}
          >
            确定{batchMode === 'delete' ? '删除' : '增加'}
          </button>
          <button
            className="CourseAdmin-btn ghost"
            onClick={() => { setBatchMode('none'); setSelectedIds([]); }}
          >
            退出选择
          </button>
        </div>
      )}

      {batchModalOpen && (
        <div className="CourseAdmin-modal-mask" onClick={() => setBatchModalOpen(false)}>
          <div className="CourseAdmin-modal" style={{ width: 400 }} onClick={e => e.stopPropagation()}>
            <div className="CourseAdmin-modal-header">
              <h3>提示</h3>
              <button className="CourseAdmin-modal-close" onClick={() => setBatchModalOpen(false)}>✕</button>
            </div>
            <div className="CourseAdmin-modal-body" style={{ minHeight: '60px', display: 'flex', alignItems: 'center' }}>
              <p style={{ fontSize: '1.05rem', color: '#333', margin: 0 }}>
                确定要执行批量<strong style={{ color: batchMode === 'delete' ? '#e63946' : '#4361ee', margin: '0 4px' }}>{batchMode === 'delete' ? '删除' : '增加'}</strong>操作吗？<br/>
                <span style={{ fontSize: '0.9rem', color: '#888', marginTop: '12px', display: 'inline-block' }}>共选中 {selectedIds.length} 项</span>
              </p>
            </div>
            <div className="CourseAdmin-modal-footer">
              <button className="CourseAdmin-btn ghost" onClick={() => setBatchModalOpen(false)}>取消</button>
              <button
                className={`CourseAdmin-btn ${batchMode === 'delete' ? 'danger' : 'primary'}`}
                onClick={() => {
                  console.log(`执行批量${batchMode}，IDs: `, selectedIds);
                  setBatchModalOpen(false);
                  setBatchMode('none');
                  setSelectedIds([]);
                }}
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="CourseAdmin-modal-mask"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="CourseAdmin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="CourseAdmin-modal-header">
              <h3>{editing ? "编辑课程" : "新增课程"}</h3>
              <button
                className="CourseAdmin-modal-close"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="CourseAdmin-modal-body">
              <div className="CourseAdmin-form-group">
                <label className="CourseAdmin-form-label">课程名称 *</label>
                <input
                  className="CourseAdmin-input"
                  placeholder="请输入课程名称"
                  value={form.courseName}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, courseName: e.target.value }))
                  }
                />
              </div>
              <div className="CourseAdmin-form-group">
                <label className="CourseAdmin-form-label">指导老师</label>
                <input
                  className="CourseAdmin-input"
                  placeholder="请输入指导老师姓名"
                  value={form.teacher}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, teacher: e.target.value }))
                  }
                />
              </div>
              <div className="CourseAdmin-form-group">
                <label className="CourseAdmin-form-label">课程描述</label>
                <textarea
                  className="CourseAdmin-form-textarea"
                  placeholder="请输入课程简介..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, description: e.target.value }))
                  }
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <div className="CourseAdmin-form-group">
                  <label className="CourseAdmin-form-label">阅读量</label>
                  <input
                    className="CourseAdmin-input"
                    type="number"
                    min={0}
                    value={form.readCount}
                    onChange={(e) =>
                      setForm((v) => ({
                        ...v,
                        readCount:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="CourseAdmin-form-group">
                  <label className="CourseAdmin-form-label">点赞量</label>
                  <input
                    className="CourseAdmin-input"
                    type="number"
                    min={0}
                    value={form.likeCount}
                    onChange={(e) =>
                      setForm((v) => ({
                        ...v,
                        likeCount:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="CourseAdmin-form-group">
                  <label className="CourseAdmin-form-label">评论量</label>
                  <input
                    className="CourseAdmin-input"
                    type="number"
                    min={0}
                    value={form.commentCount}
                    onChange={(e) =>
                      setForm((v) => ({
                        ...v,
                        commentCount:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="CourseAdmin-form-group">
                  <label className="CourseAdmin-form-label">收藏量</label>
                  <input
                    className="CourseAdmin-input"
                    type="number"
                    min={0}
                    value={form.collectCount}
                    onChange={(e) =>
                      setForm((v) => ({
                        ...v,
                        collectCount:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="CourseAdmin-form-group">
                <label className="CourseAdmin-form-label">状态</label>
                <select
                  className="CourseAdmin-select"
                  value={form.isDeleted}
                  onChange={(e) =>
                    setForm((v) => ({
                      ...v,
                      isDeleted: Number(
                        e.target.value,
                      ) as UpdateCourse["isDeleted"],
                    }))
                  }
                >
                  {isDeletedItems.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="CourseAdmin-modal-footer">
              <button
                className="CourseAdmin-btn ghost"
                onClick={() => setModalOpen(false)}
              >
                取消
              </button>
              <button className="CourseAdmin-btn primary" onClick={onSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
