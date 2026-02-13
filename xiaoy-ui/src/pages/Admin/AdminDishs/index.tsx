import React, { useEffect, useState } from "react";
import type { UpdateDish , InsertDish , UpdateLocation} from "@/types";
import { Pagination } from 'antd';
import "./AdminDishs.css";
import {getUpdateDishes , updateDish , getUpdateLocations} from "@/services";
const userInfoitem: UpdateDish[] = [
  {
    id: 1001,
    dishName: "宫保鸡丁",
    description: "经典川菜，麻辣鲜香",
    price: 25.5,
    category: "川菜",
    locationId: 1,
    locationName: "北京",
    status: 1,
    likeCount: 150,
    isDeleted: 0,
    createTime: "2023-10-01 12:00:00",
    updateTime: "2023-10-10 15:30:00",
  },{
    id: 1002,
    dishName: "鱼香肉丝",
    description: "酸甜可口，开胃下饭",
    price: 22.0,
    category: "川菜",
    locationId: 1,
    locationName: "北京",
    status: 1,
    likeCount: 120,
    isDeleted: 0,
    createTime: "2023-09-15 11:20:00",
    updateTime: "2023-10-05 14:10:00",
  },{
    id: 1003,
    dishName: "麻婆豆腐",
    description: "麻辣鲜香，豆腐嫩滑",
    price: 18.0,
    category: "川菜",
    locationId: 2,
    locationName: "上海",
    status: 1,
    likeCount: 200,
    isDeleted: 0,
    createTime: "2023-08-20 10:30:00",
    updateTime: "2023-09-25 13:45:00",

  }

];

const isDeletedItems = [
  { value: 0, label: "正常", style: { backgroundColor: "#d4edda", color: "#155724" } },
  { value: 1, label: "已删除", style: { backgroundColor: "#f8d7da", color: "#721c24" } },
]

const statusItems = [
  { value: 0, label: "下架", style: { backgroundColor: "#f8d7da", color: "#721c24" } },
  { value: 1, label: "上架", style: { backgroundColor: "#d4edda", color: "#155724" } },
  { value: 2, label: "预售", style: { backgroundColor: "#fff3cd", color: "#856404" } },
]



const AdminDishs: React.FC = () => {
  const [items, setItems] = useState<UpdateDish[]>(userInfoitem);
  const [columns] = useState([
    { title: "菜名", dataIndex: "dishName" },
    { title: "描述", dataIndex: "description" },
    { title: "价格", dataIndex: "price" },
    { title: "类别", dataIndex: "category" },
    { title: "位置名称", dataIndex: "locationName" },
    { title: "状态", dataIndex: "status" },
    { title: "删除状态", dataIndex: "isDeleted" },
    { title: "创建时间", dataIndex: "createTime" },
    {title: "更新时间", dataIndex: "updateTime" },
  ]);
  const [locationItems, setLocationItems] = useState<UpdateLocation[]>([
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
  ]);
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(500);
  const [pageSize , setPageSize] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  //提交表单
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<InsertDish>(
    {
      dishName: "",
      description: "",
      price: 0,
      category: "",
      status: 1,
      locationId: 0,
      locationName: "",
      isDeleted: 0,
    }
  );

  // 打开页面的时候自动加载数据
  useEffect(() => {
    // Fetch user info list from API
    const fetchUserInfoList = async () => {
      const res = await getUpdateDishes(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        // setTotal(res.total || 100);
      }
      const locationRes = await getUpdateLocations(1, 100);
      if (locationRes.success == true && locationRes.data) {
        setLocationItems(locationRes.data);
      }
    };
    fetchUserInfoList();
  }, [page, pageSize]);



  const openCreate = () => {
    setEditing(null);
    setForm({
      dishName: "",
      description: "",
      price: 0,
      category: "",
      locationId: 0,
      locationName: "",
      isDeleted: 0,
      status: 1,
    });
    setModalOpen(true);
  };

  const openEdit = (item: UpdateDish) => {
    setEditing(item.id);
    setForm({
      dishName: item.dishName,
      description: item.description || "",
      price: item.price || 0,
      status: item.status || 1,
      category: item.category || "",
      locationId: item.locationId || 0,
      locationName: item.locationName || "",
      isDeleted: item.isDeleted || 0,
    });


    setModalOpen(true);
  };

  const onSave = () => {
    // if (!form.nickname.trim() || !form.email.trim()) return;
    const fetchUserInfoList = async () => {
      const res = await getUpdateDishes(page, pageSize);
      if (res.success == true && res.data) {
        setItems(res.data);
        console.log("更新列表成功" , res.data , items);
        setModalOpen(false);
      }
      
    };
    if (editing) {
      const updateuseInfo = async () => {
        const res = await updateDish({ id: editing, ...form });
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
    <div className="dishAdmin-page">
      <div className="dishAdmin-page-header">
        <h1>菜名管理</h1>
      </div>

      <div className="dishAdmin-toolbar">
        <div className="dishAdmin-filters">
          <input
            className="dishAdmin-input"
            placeholder="搜索菜名 / 描述"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="dishAdmin-actions">
          <button className="dishAdmin-btn primary" onClick={openCreate}>
            + 新增菜名
          </button>
        </div>
      </div>

      <div className="dishAdmin-card">
        <table className="dishAdmin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.dataIndex}
                  style={{
                    ...(col.dataIndex === "dishName" && {width:"200px"}),
                    ...(col.dataIndex === "description" && {width:"350px"}),
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
                <td>{item.dishName}</td>
                <td>{item.description ? item.description : "null"}</td>
                <td>{item.price ? item.price : "null"}</td>
                <td>
                 {item.category ? item.category : "null"}
                </td>
                <td>
                  {item.locationName ? item.locationName : "null"}
                </td>
                <td>
                  <span className="dishAdmin-tag" style={statusItems[item.status]?.style}>
                    {statusItems[item.status]?.label || item.status}
                  </span>
                </td>
                <td>
                  <span className="dishAdmin-tag" style={isDeletedItems[item.isDeleted]?.style}>
                    {isDeletedItems[item.isDeleted]?.label || item.isDeleted}
                  </span>
                </td>
                <td>{item.createTime}</td>
                <td>{item.updateTime}</td>
                <td>
                  <button
                    className="dishAdmin-btn ghost"
                    onClick={() => openEdit(item)}
                  >
                    编辑
                  </button>
                  <button
                    className="dishAdmin-btn danger"
                    onClick={() => onDelete(item.id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <div className="dishAdmin-pagination">
          <span>共 {total} 条</span>
          <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} />
        </div>
      </div>

      {modalOpen && (
        <div className="dishAdmin-modal-mask">
          <div className="dishAdmin-modal">
            <h4>{editing ? "编辑菜名" : "新增菜名"}</h4>
            <div className="dishAdmin-form">
              <label>菜名</label>
              <input
                className="dishAdmin-input"
                value={form.dishName}
                onChange={(e) =>
                  setForm((v) => ({ ...v, dishName: e.target.value }))
                }
              />
              <label>描述</label>
              <input
                className="dishAdmin-input"
                value={form.description}
                onChange={(e) =>
                  setForm((v) => ({ ...v, description: e.target.value }))
                }
              />
              <label>价格</label>
              <input
                className="dishAdmin-input"
                value={form.price}
                onChange={(e) =>
                  setForm((v) => ({ ...v, price: e.target.value ? Number(e.target.value) : 0 }))
                }
              />
              <label>类别</label>
              <input
                className="dishAdmin-input"
                value={form.category}
                onChange={(e) =>
                  setForm((v) => ({ ...v, category: e.target.value }))
                }
              />
              
              <label>地点</label>
              <select
                className="dishAdmin-select"
                value={form.locationId}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    locationId: Number(e.target.value) as UpdateLocation["id"],
                    locationName: locationItems.find(item => item.id === Number(e.target.value))?.name || "",
                  }))
                }
              >
                {locationItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <label>菜品状态</label>
              <select
                className="dishAdmin-select"
                value={form.status}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    status: Number(e.target.value) as UpdateDish["status"],
                  }))
                }
              >
                {statusItems.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
                <label>删除状态</label>
                <select
                  className="dishAdmin-select"
                  value={form.isDeleted}
                  onChange={(e) =>
                    setForm((v) => ({
                      ...v,
                      isDeleted: Number(e.target.value) as UpdateDish["isDeleted"],
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
            <div className="dishAdmin-modal-actions">
              <button
                className="dishAdmin-btn ghost"
                onClick={() => setModalOpen(false)}
              >
                取消
              </button>
              <button className="dishAdmin-btn primary" onClick={onSave}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDishs;
