import React, { useEffect, useState } from "react";
import type { UpdateCourse , InsertCourse} from "@/types";
import { Pagination } from 'antd';
import "./AdminCourses.css";
import {getUpdateCourses , updateCourse} from "@/services";
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
  }
];


const isDeletedItems = [
  { value: 0, label: "正常", style: { backgroundColor: "#d4edda", color: "#155724" } },
  { value: 1, label: "已删除", style: { backgroundColor: "#f8d7da", color: "#721c24" } },
]


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
    {title: "更新时间", dataIndex: "updateTime" },
  ]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(500);
  const [pageSize , setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

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
  }
  );

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
        console.log("更新列表成功" , res.data , items);
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

  const onDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="CourseAdmin-page">
      <div className="CourseAdmin-page-header">
        <h1>课程管理</h1>
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
          <button className="CourseAdmin-btn primary" onClick={openCreate}>
            + 新增课程
          </button>
        </div>
      </div>

      <div className="CourseAdmin-card">
        <table className="CourseAdmin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.dataIndex}
                  style={{
                    ...(col.dataIndex === "description" && { width: "320px" }),
                    ...(col.dataIndex === "courseName" && { width: "200px" }),
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
              <tr key={item.id}>
                <td>{item.courseName}</td>
                <td>{item.teacher ? item.teacher : "null"}</td>
                <td>{item.description ? item.description : "null"}</td>
                <td>{item.avatar ? item.avatar : "null"}</td>
                <td>{item.readCount}</td>
                <td>{item.likeCount}</td>
                <td>{item.commentCount}</td>
                <td>{item.collectCount}</td>

                <td>
                  <span className="CourseAdmin-tag" style={isDeletedItems[item.isDeleted]?.style}>
                    {isDeletedItems[item.isDeleted]?.label || item.isDeleted}
                  </span>
                </td>
                <td>{item.createTime}</td>
                <td>{item.updateTime}</td>
                <td>
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
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <div className="CourseAdmin-pagination">
          <span>共 {total} 条</span>
          <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} />
        </div>
      </div>

      {modalOpen && (
        <div className="CourseAdmin-modal-mask">
          <div className="CourseAdmin-modal">
            <h4>{editing ? "编辑课程" : "新增课程"}</h4>
            <div className="CourseAdmin-form">
              <label>课程名称</label>
              <input
                className="CourseAdmin-input"
                value={form.courseName}
                onChange={(e) =>
                  setForm((v) => ({ ...v, courseName: e.target.value }))
                }
              />
             <label>指导老师</label>
              <input
                className="CourseAdmin-input"
                value={form.teacher}
                onChange={(e) =>
                  setForm((v) => ({ ...v, teacher: e.target.value }))
                }
              />
              <label>课程描述</label>
              <input
                className="CourseAdmin-input"
                value={form.description}
                onChange={(e) =>
                  setForm((v) => ({ ...v, description: e.target.value }))
                }
              />
              <label>头像</label>
              <input
                className="CourseAdmin-input"
                value={form.avatar}
                onChange={(e) =>
                  setForm((v) => ({ ...v, avatar: e.target.value }))
                }
              />
              <label>点赞量</label>
              <input
                className="CourseAdmin-input"
                value={form.likeCount}
                onChange={(e) =>
                  setForm((v) => ({ ...v, likeCount: e.target.value == "" ? 0 : Number(e.target.value) }))
                }
              />
              <label>评论量</label>
              <input
                className="CourseAdmin-input"
                value={form.commentCount}
                onChange={(e) =>
                  setForm((v) => ({ ...v, commentCount: e.target.value == "" ? 0 : Number(e.target.value) }))
                }
              />
              <label>收藏量</label>
              <input
                className="CourseAdmin-input"
                value={form.collectCount}
                onChange={(e) =>
                  setForm((v) => ({ ...v, collectCount: e.target.value == "" ? 0 : Number(e.target.value) }))
                }
              />
              <label>状态</label>
              <select
                className="CourseAdmin-select"
                value={form.isDeleted}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    isDeleted: Number(e.target.value) as UpdateCourse["isDeleted"],
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
            <div className="CourseAdmin-modal-actions">
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
