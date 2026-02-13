import React, { useEffect, useState } from "react";
import type { UpdateLocation ,InsertLocation } from "@/types";
import { Pagination } from 'antd';
import "./AdminLocations.css";
import {getUpdateLocations , updateCanteenLocation} from "@/services";
const userInfoitem: UpdateLocation[] = [
  {
    id: 1001,
    name:"高新校区",
    isDeleted: 0,
    createTime: "2023-10-01 12:00:00",
    updateTime: "2023-10-10 15:30:00"
  },
  {
    id: 1002,
    name:"西校区",
    isDeleted: 1,
    createTime: "2023-10-01 12:00:00",
    updateTime: "2023-10-10 15:30:00"
  },
  {
    id: 1003,
    name:"东校区",
    isDeleted: 0,
    createTime: "2023-10-01 12:00:00",
    updateTime: "2023-10-10 15:30:00"
  },
];

const isDeletedItems = [
  { value: 0, label: "正常", style: { backgroundColor: "#d4edda", color: "#155724" } },
  { value: 1, label: "已删除", style: { backgroundColor: "#f8d7da", color: "#721c24" } },
]


const AdminLocations: React.FC = () => {
  const [items, setItems] = useState<UpdateLocation[]>(userInfoitem);
  const [columns] = useState([
    { title: "名称", dataIndex: "name" },
    { title: "状态", dataIndex: "isDeleted" },
    { title: "创建时间", dataIndex: "createTime" },
    { title: "更新时间", dataIndex: "updateTime" },

  ]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [total] = useState(500);
  const [pageSize , setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  //提交表单
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<InsertLocation>(
    {
      name: "" ,
      isDeleted: 0 ,
    }
  );

  // 打开页面的时候自动加载数据
  useEffect(() => {
    // Fetch user info list from API
    const fetchUpdateLocationList = async () => {
      const res = await getUpdateLocations(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
      }
    };
    fetchUpdateLocationList();
  }, [page, pageSize]);



  const openCreate = () => {
    setEditing(null);
    setForm({
      name:"" ,
      isDeleted: 0 ,
    });
    setModalOpen(true);
  };

  const openEdit = (item: UpdateLocation) => {
    setEditing(item.id);
    setForm({
      name: item.name,
      isDeleted: item.isDeleted,
    });


    setModalOpen(true);
  };

  const onSave = () => {
    // if (!form.nickname.trim() || !form.email.trim()) return;
    const fetchUpdateLocationList = async () => {
      const res = await getUpdateLocations(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        console.log("更新列表成功" , res.data , items);
        setModalOpen(false);
      }
      
    };
    if (editing) {
      const updateCanteenLocationItem = async () => {
        const res = await updateCanteenLocation({id : editing , ...form} );
        if (res.success == true) {
          console.log("更新成功");
          fetchUpdateLocationList();
        }
      };
      updateCanteenLocationItem();
      
    } 
    // else {
    
    // }
    
    
    
  };

  const onDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="LocationAdmin-page">
      <div className="LocationAdmin-page-header">
        <h1>食堂地点管理</h1>
      </div>

      <div className="LocationAdmin-toolbar">
        <div className="LocationAdmin-filters">
          <input
            className="LocationAdmin-input"
            placeholder="搜索地点"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="LocationAdmin-actions">
          <button className="LocationAdmin-btn primary" onClick={openCreate}>
            + 新增地点
          </button>
        </div>
      </div>

      <div className="LocationAdmin-card">
        <table className="LocationAdmin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.dataIndex}
                  style={{
                    width: col.dataIndex === "name" ? "200px" : undefined,
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
                <td>{item.name}</td>
                <td >
                  <span
                    className="LocationAdmin-tag"
                    style={isDeletedItems[item.isDeleted]?.style}
                  >
                    {isDeletedItems[item.isDeleted]?.label}
                  </span>
                </td>
                <td>{item.createTime}</td>
                <td>{item.updateTime}</td>
                <td>
                  <button
                    className="LocationAdmin-btn ghost"
                    onClick={() => openEdit(item)}
                  >
                    编辑
                  </button>
                  <button
                    className="LocationAdmin-btn danger"
                    onClick={() => onDelete(item.id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <div className="LocationAdmin-pagination">
          <span>共 {total} 条</span>
          <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} />
        </div>
      </div>

      {modalOpen && (
        <div className="LocationAdmin-modal-mask">
          <div className="LocationAdmin-modal">
            <h4>{editing ? "编辑地点" : "新增地点"}</h4>
            <div className="LocationAdmin-form">
              <label>地名</label>
              <input
                className="LocationAdmin-input"
                value={form.name}
                onChange={(e) =>
                  setForm((v) => ({ ...v, name: e.target.value }))
                }
              />

              <label>状态</label>
              <select
                className="LocationAdmin-select"
                value={form.isDeleted}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    isDeleted: Number(e.target.value) as UpdateLocation["isDeleted"],
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
            <div className="LocationAdmin-modal-actions">
              <button
                className="LocationAdmin-btn ghost"
                onClick={() => setModalOpen(false)}
              >
                取消
              </button>
              <button className="LocationAdmin-btn primary" onClick={onSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLocations;
