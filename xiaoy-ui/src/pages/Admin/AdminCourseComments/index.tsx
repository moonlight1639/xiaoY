import React, { useEffect, useState } from "react";
import type { UpdateCourseComment , InsertCourseComment} from "@/types";
import { Pagination } from 'antd';
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
        <h1>评论管理</h1>
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
        {/* <div className="CourseCommentsAdmin-actions">
          <button className="CourseCommentsAdmin-btn primary" onClick={openCreate}>
            + 新增评论
          </button>
        </div> */}
      </div>

      <div className="CourseCommentsAdmin-card">
        <table className="CourseCommentsAdmin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.dataIndex}
                  style={{
                    // width: col.dataIndex === "userName" ? "200px" : undefined,
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
                <td>{item.courseId}</td>
                <td>{item.userId}</td>
                <td>{item.userName}</td>
                <td>{item.userAvatar}</td>
                <td>{item.content}</td>
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
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <div className="CourseCommentsAdmin-pagination">
          <span>共 {total} 条</span>
          <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} />
        </div>
      </div>

      {modalOpen && (
        <div className="CourseCommentsAdmin-modal-mask">
          <div className="CourseCommentsAdmin-modal">
            <h4>{editing ? "编辑评论" : "新增评论"}</h4>
            <div className="CourseCommentsAdmin-form">
              <label>课程ID</label>
              <input
                className="CourseCommentsAdmin-input"
                value={form.courseId}
                onChange={(e) =>
                  setForm((v) => ({ ...v, courseId: e.target.value ? Number(e.target.value) : 0 }))
                }
              />
              <label>用户ID</label>
              <input
                className="CourseCommentsAdmin-input"
                value={form.userId}
                onChange={(e) =>
                  setForm((v) => ({ ...v, userId: e.target.value ? Number(e.target.value) : 0 }))
                }
              />
              <label>用户名</label>
              <input
                className="CourseCommentsAdmin-input"
                value={form.userName}
                onChange={(e) =>
                  setForm((v) => ({ ...v, userName: e.target.value }))
                }
              />
              <label>用户头像</label>
              <input
                className="CourseCommentsAdmin-input"
                value={form.userAvatar}
                onChange={(e) =>
                  setForm((v) => ({ ...v, userAvatar: e.target.value }))
                }
              />
              <label>内容</label>
              <input
                className="CourseCommentsAdmin-input"
                value={form.content}
                onChange={(e) =>
                  setForm((v) => ({ ...v, content: e.target.value }))
                }
              />
              <label>点赞量</label>
              <input
                className="CourseCommentsAdmin-input"
                value={form.likeNum}
                onChange={(e) =>
                  setForm((v) => ({ ...v, likeNum: e.target.value ? Number(e.target.value) : 0 }))
                }
              />
              <label>不喜欢量</label>
              <input
                className="CourseCommentsAdmin-input"
                value={form.dislikeNum}
                onChange={(e) =>
                  setForm((v) => ({ ...v, dislikeNum: e.target.value ? Number(e.target.value) : 0 }))
                }
              />
              
              <label>状态</label>
              <select
                className="CourseCommentsAdmin-select"
                value={form.isDeleted}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    isDeleted: Number(e.target.value) as UpdateCourseComment["isDeleted"],
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
            <div className="CourseCommentsAdmin-modal-actions">
              <button
                className="CourseCommentsAdmin-btn ghost"
                onClick={() => setModalOpen(false)}
              >
                取消
              </button>
              <button className="CourseCommentsAdmin-btn primary" onClick={onSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseComments;
