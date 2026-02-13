import React, { useEffect, useState } from "react";
import type { UserInfo , insertUserInfoParams} from "@/types";
import { Pagination } from 'antd';
import "./AdminUser.css";
import {getUserInfoList , updateUserInfo} from "@/services";
const userInfoitem: UserInfo[] = [
  {
    id: 1001,
    nickname: "张三",
    phone: "13800138000",
    email: "zhangsan@corp.com",
    gender: 1,
    userType: 1,
    userStatus: 1,
    createTime: "2024-01-15",
    updateTime: "2024-01-20",
  },
  {
    id: 1002,
    nickname: "李四",
    phone: "13800138001",
    email: "lisi@corp.com",
    gender: 0,
    userType: 2,
    userStatus: 0,
    createTime: "2024-02-10",
    updateTime: "2024-02-15",
  },
  {
    id: 1003,
    nickname: "王五",
    phone: "13800138002",
    email: "wangwu@corp.com",
    gender: 1,
    userType: 2,
    userStatus: 1,
    createTime: "2024-03-05",
    updateTime: "2024-03-10",
  },
];

const userTypeItems = [
  { label: "管理员", value: 0 , style: { background: "#e6f0ff", color: "#2155cd" } },
  { label: "运营", value: 1 , style: { background: "#ecfdf3", color: "#10b981" }},
  { label: "访客", value: 2 , style: { background: "#fff7ed", color: "#f59e0b" }},
];

const userStatusItems = [
  { label: "禁用", value: 0 , style: { background: "#ffe8e8", color: "#c0352b" }},
  { label: "启用", value: 1 , style: { background: "#ecfdf3", color: "#10b981" }},
  
];
const userGenderItems = [
  { label: "男", value: 0 , style : { background: "#e6f0ff", color: "#2155cd" } },
  { label: "女", value: 1 , style : { background: "#ffe8e8", color: "#c0352b" }},
]


const AdminUsers: React.FC = () => {
  const [items, setItems] = useState<UserInfo[]>(userInfoitem);
  const [columns] = useState([
    { title: "姓名", dataIndex: "nickname" },
    { title: "电话", dataIndex: "phone" },
    { title: "邮箱", dataIndex: "email" },
    { title: "性別", dataIndex: "gender" },
    { title: "角色", dataIndex: "userType" },
    { title: "状态", dataIndex: "userStatus" },
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
  const [form, setForm] = useState<insertUserInfoParams>(
    {
      nickname: "" ,
      email: "" ,
      phone: "" ,
      gender: 1  ,
      userType: 0 ,
      userStatus: 1 ,
    }
  );

  // 打开页面的时候自动加载数据
  useEffect(() => {
    // Fetch user info list from API
    const fetchUserInfoList = async () => {
      const res = await getUserInfoList(page, pageSize);
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
      nickname: "" ,
      email: "",
      phone: "",
      gender: 1 ,
      userType: 0 ,
      userStatus: 1 ,
    });
    setModalOpen(true);
  };

  const openEdit = (item: UserInfo) => {
    setEditing(item.id);
    setForm({
      nickname: item.nickname,
      email: item.email || "",
      phone: item.phone || "",
      gender: item.gender,
      userType: item.userType,
      userStatus: item.userStatus,
    });


    setModalOpen(true);
  };

  const onSave = () => {
    // if (!form.nickname.trim() || !form.email.trim()) return;
    const fetchUserInfoList = async () => {
      const res = await getUserInfoList(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        console.log("更新列表成功" , res.data , items);
        setModalOpen(false);
      }
      
    };
    if (editing) {
      const updateuseInfo = async () => {
        const res = await updateUserInfo({ id: editing, ...form });
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
    <div className="userAdmin-page">
      <div className="userAdmin-page-header">
        <h1>用户管理</h1>
      </div>

      <div className="userAdmin-toolbar">
        <div className="userAdmin-filters">
          <input
            className="userAdmin-input"
            placeholder="搜索姓名 / 邮箱"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="userAdmin-actions">
          <button className="userAdmin-btn primary" onClick={openCreate}>
            + 新增用户
          </button>
        </div>
      </div>

      <div className="userAdmin-card">
        <table className="userAdmin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.dataIndex}
                  style={{
                    width: col.dataIndex === "nickname" ? "200px" : undefined,
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
                <td>{item.nickname}</td>
                <td>{item.phone ? item.phone : "null"}</td>
                <td>{item.email ? item.email : "null"}</td>
                <td>
                  <span className="userAdmin-tag" style={userGenderItems[item.gender]?.style}>
                    {userGenderItems[item.gender]?.label || item.gender}
                  </span>
                </td>
                <td>
                  <span className="userAdmin-tag" style={userTypeItems[item.userType]?.style}>
                    {userTypeItems[item.userType]?.label || item.userType}
                  </span>
                </td>
                <td>
                  <span className="userAdmin-tag" style={userStatusItems[item.userStatus]?.style}>
                    {userStatusItems[item.userStatus]?.label || item.userStatus}
                  </span>
                </td>
                <td>{item.createTime}</td>
                <td>{item.updateTime}</td>
                <td>
                  <button
                    className="userAdmin-btn ghost"
                    onClick={() => openEdit(item)}
                  >
                    编辑
                  </button>
                  <button
                    className="userAdmin-btn danger"
                    onClick={() => onDelete(item.id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <div className="userAdmin-pagination">
          <span>共 {total} 条</span>
          <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} />
        </div>
      </div>

      {modalOpen && (
        <div className="userAdmin-modal-mask">
          <div className="userAdmin-modal">
            <h4>{editing ? "编辑用户" : "新增用户"}</h4>
            <div className="userAdmin-form">
              <label>姓名</label>
              <input
                className="userAdmin-input"
                value={form.nickname}
                onChange={(e) =>
                  setForm((v) => ({ ...v, nickname: e.target.value }))
                }
              />
              <label>电话</label>
              <input
                className="userAdmin-input"
                value={form.phone}
                onChange={(e) =>
                  setForm((v) => ({ ...v, phone: e.target.value }))
                }
              />
              <label>邮箱</label>
              <input
                className="userAdmin-input"
                value={form.email}
                onChange={(e) =>
                  setForm((v) => ({ ...v, email: e.target.value }))
                }
              />
              <label>性别</label>
              <select
                className="userAdmin-select"
                value={form.gender}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    gender: Number(e.target.value) as UserInfo["gender"],
                  }))
                }
              >
                {userGenderItems.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <label>角色</label>
              <select
                className="userAdmin-select"
                value={form.userType}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    userType: Number(e.target.value) as UserInfo["userType"],
                  }))
                }
              >
                {userTypeItems.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
              <label>状态</label>
              <select
                className="userAdmin-select"
                value={form.userStatus}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    userStatus: Number(e.target.value) as UserInfo["userStatus"],
                  }))
                }
              >
                {userStatusItems.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select> 
            </div>
            <div className="userAdmin-modal-actions">
              <button
                className="userAdmin-btn ghost"
                onClick={() => setModalOpen(false)}
              >
                取消
              </button>
              <button className="userAdmin-btn primary" onClick={onSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
