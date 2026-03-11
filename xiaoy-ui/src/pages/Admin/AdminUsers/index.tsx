import React, { useEffect, useState } from "react";
import type { UserInfo , insertUserInfoParams} from "@/types";
import { Button, Pagination } from 'antd';
import "./AdminUser.css";
import {getUserInfoList , updateUserInfo} from "@/services";
import {Modal} from "antd";
import { Input } from 'antd';
import {fillClassApi} from "@/services";
const { TextArea } = Input;
import { UpLoad } from "@/components";
import defaultImg from "@/assets/avator/defaultAvator1.jpg";
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
    { title: "头像", dataIndex: "avatar" },
    { title: "性別", dataIndex: "gender" },
    { title: "角色", dataIndex: "userType" },
    { title: "状态", dataIndex: "userStatus" },
    { title: "创建时间", dataIndex: "createTime" },
    {title: "更新时间", dataIndex: "updateTime" },
  ]);
  const [keyword, setKeyword] = useState("");
  const [fillModalOpen, setFillModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(500);
  const [pageSize , setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [UserContext, setUserContext] = useState('');
  //提交表单
  const [editing, setEditing] = useState<number | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form, setForm] = useState<insertUserInfoParams>(
    {
      nickname: undefined ,
      email: undefined ,
      phone: undefined ,
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
      nickname: undefined ,
      email: undefined ,
      phone: undefined ,
      gender: 1  ,
      userType: 0 ,
      userStatus: 1 ,
    });
    setModalOpen(true);
  };

  const openEdit = (item: UserInfo) => {
    setEditing(item.id);
    setForm({
      nickname: item.nickname,
      email: item.email ,
      phone: item.phone ,
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
        // console.log("更新列表成功" , res.data , items);
        
      }
      
      
    }
    if (editing) {
      const updateuseInfo = async () => {
        const res = await updateUserInfo({ id: editing, ...form });
        if (res.success == true) {
          // console.log("更新成功");
          fetchUserInfoList();
          setPage(1);
        }
      };
      updateuseInfo().then(() => {
        setModalOpen(false);
        // setUserContext("");
        setConfirmLoading(false);
      });
      
    } 
    // else {
    
    // }
    
    
    
  };

  const onDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };
// ai自动填充功能// 目前只是打开了一个模态框，后续可以接入真正的ai接口来实现自动填充表单的功能
  const handleFill = async() => {
    // 
    console.log("用户输入的上下文信息：" , UserContext);
    setConfirmLoading(true);
    const res = await fillClassApi.fillClass(UserContext, "UserInfo", "UserInfo");
    if(res.success == true && res.data){
      console.log("填充成功" , res.data);
      // 可以在这里将res.data中的内容填充到form中，来实现自动填充的功能
      setForm(
        (v) => { 
          return {
            ...v,
            ...res.data
          };
        }

      );
    }
    setConfirmLoading(false);
    setFillModalOpen(false);
  }

  const handleAvatarChange = (src: string , id: number) => {
    // console.log("新的头像URL：" , src);
    // 可以在这里将新的头像URL更新到对应用户的信息中，或者直接调用接口更新用户信息
    const updateuseInfo = async () => {
        const res = await updateUserInfo({ id: id , avatar: src });
        if (res.success == true) {
          // console.log("更新成功");
          
        }
      };
      updateuseInfo();
  }
  return (
    <div className="userAdmin-page">
      <div className="userAdmin-page-header">
        <h1>👥 用户管理</h1>
        <p>管理系统内的所有用户，查看状态或修改角色权限</p>
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
        <div className="userAdmin-table-wrap">
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
                
                <td><UpLoad avatar={item.avatar || defaultImg} returnSrc={(src:string) => {handleAvatarChange(src , item.id)}}/></td>
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
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'nowrap' }}>
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
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        </div>
        <div className="userAdmin-pagination">
          <span>共 {total} 条</span>
          <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} />
        </div>
      </div>

      {modalOpen && (
        <div className="userAdmin-modal-mask" onClick={() => { setModalOpen(false); setUserContext(""); setConfirmLoading(false); }}>
          <div className="userAdmin-modal" onClick={e => e.stopPropagation()}>
            <div className="userAdmin-modal-header">
              <h3>{editing ? "编辑用户" : "新增用户"}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Button size="small" onClick={() => setFillModalOpen(true)} type="primary">AI 自动填充</Button>
                <button className="userAdmin-modal-close" onClick={() => { setModalOpen(false); setUserContext(""); setConfirmLoading(false); }}>✕</button>
              </div>
            </div>

            <div className="userAdmin-modal-body">
              <div className="userAdmin-form-group">
                <label className="userAdmin-form-label">姓名</label>
                <input
                  className="userAdmin-input"
                  placeholder="请输入姓名"
                  value={form.nickname ?? ""}
                  onChange={(e) => setForm((v) => ({ ...v, nickname: e.target.value }))}
                />
              </div>
              <div className="userAdmin-form-group">
                <label className="userAdmin-form-label">电话</label>
                <input
                  className="userAdmin-input"
                  placeholder="请输入电话"
                  value={form.phone ?? ""}
                  onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
                />
              </div>
              <div className="userAdmin-form-group">
                <label className="userAdmin-form-label">邮箱</label>
                <input
                  className="userAdmin-input"
                  placeholder="请输入邮箱"
                  value={form.email ?? ""}
                  onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                />
              </div>
              <div className="userAdmin-form-group">
                <label className="userAdmin-form-label">性别</label>
                <select
                  className="userAdmin-select"
                  value={form.gender}
                  onChange={(e) => setForm((v) => ({ ...v, gender: Number(e.target.value) as UserInfo["gender"] }))}
                >
                  {userGenderItems.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div className="userAdmin-form-group">
                <label className="userAdmin-form-label">角色</label>
                <select
                  className="userAdmin-select"
                  value={form.userType}
                  onChange={(e) => setForm((v) => ({ ...v, userType: Number(e.target.value) as UserInfo["userType"] }))}
                >
                  {userTypeItems.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div className="userAdmin-form-group">
                <label className="userAdmin-form-label">状态</label>
                <select
                  className="userAdmin-select"
                  value={form.userStatus}
                  onChange={(e) => setForm((v) => ({ ...v, userStatus: Number(e.target.value) as UserInfo["userStatus"] }))}
                >
                  {userStatusItems.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="userAdmin-modal-footer">
              <button className="userAdmin-btn ghost" onClick={() => { setModalOpen(false); setUserContext(""); setConfirmLoading(false); }}>取消</button>
              <button className="userAdmin-btn primary" onClick={onSave}>保存</button>
            </div>
          </div>
        </div>
      )}

      {fillModalOpen && (
        <Modal
          title="ai自动填充"
          open={fillModalOpen}
          onOk={() => {handleFill()}}
          onCancel={() => setFillModalOpen(false)}
          okText="确认填充"
          style={{ top:"30%" , height:'400px'}}
          confirmLoading={confirmLoading}
          // bodyStyle={{height:'fit-content'}}
        >
          <TextArea value={UserContext} onChange={(e) => setUserContext(e.target.value)} style={{marginBottom:'15px'}} showCount rows={4} />
          
        </Modal>
      )}
    </div>
  );
};

export default AdminUsers;
