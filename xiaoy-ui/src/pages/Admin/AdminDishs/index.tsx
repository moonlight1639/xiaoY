import React, { useEffect, useState } from "react";
import type { UpdateDish , InsertDish , UpdateLocation} from "@/types";
import { Pagination } from 'antd';
import "./AdminDishs.css";
import {getUpdateDishes , updateDish , getUpdateLocations} from "@/services";
import defaultImg from "@/assets/avator/defaultAvator1.jpg";
import { UpLoad } from "@/components";
const userInfoitem: UpdateDish[] = [
  {
    id: 1001,
    dishName: "宫保鸡丁",
    description: "经典川菜，麻辣鲜香",
    photo: "",
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
    photo: "",
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
    photo: "",
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
    { title: "饭菜图片", dataIndex: "photo" },
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

  // 批量操作状态
  const [batchMode, setBatchMode] = useState<'none' | 'add' | 'delete'>('none');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [batchModalOpen, setBatchModalOpen] = useState(false);

  //提交表单
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<InsertDish>(
    {
      dishName: "",
      description: "",
      photo: "",
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
      photo: "",
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
      photo: item.photo || "",
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
  const handleAvatarChange = (src: string , item: UpdateDish) => {
      // console.log("新的头像URL：" , src);
      // 可以在这里将新的头像URL更新到对应用户的信息中，或者直接调用接口更新用户信息
      const updateuseInfo = async () => {
          const res = await updateDish({ ...item ,photo: src});
          if (res.success == true) {
            // console.log("更新成功");
            
          }
        };
        updateuseInfo();
    }
  const onDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="dishAdmin-page">
      <div className="dishAdmin-page-header">
        <h1>🍽️ 菜品管理</h1>
        <p>管理和维护各个食堂及地点的菜单菜品信息</p>
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
          {batchMode === 'none' && (
            <>
              <button className="dishAdmin-btn primary" style={{ marginRight: 12 }} onClick={() => setBatchMode('add')}>
                批量增加
              </button>
              <button className="dishAdmin-btn danger" style={{ marginRight: 12 }} onClick={() => setBatchMode('delete')}>
                批量删除
              </button>
              <button className="dishAdmin-btn primary" onClick={openCreate}>
                + 新增菜名
              </button>
            </>
          )}
        </div>
      </div>

      <div className="dishAdmin-card">
        <div className="dishAdmin-table-wrap">
        <table className="dishAdmin-table">
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
                <td>{item.dishName}</td>
                <td>{item.description ? item.description : "null"}</td>
                <td><UpLoad avatar={item.photo} returnSrc={(src:string) => handleAvatarChange(src, item)}></UpLoad></td>
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
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'nowrap' }}>
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
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        </div>
        <div className="dishAdmin-pagination">
          <span>共 {total} 条</span>
          <Pagination defaultCurrent={1} total={total} pageSize={pageSize} current={page} onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} />
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
            className={`dishAdmin-btn ${batchMode === 'delete' ? 'danger' : 'primary'}`}
            disabled={selectedIds.length === 0}
            style={{ opacity: selectedIds.length === 0 ? 0.5 : 1, cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer' }}
            onClick={() => setBatchModalOpen(true)}
          >
            确定{batchMode === 'delete' ? '删除' : '增加'}
          </button>
          <button
            className="dishAdmin-btn ghost"
            onClick={() => { setBatchMode('none'); setSelectedIds([]); }}
          >
            退出选择
          </button>
        </div>
      )}

      {batchModalOpen && (
        <div className="dishAdmin-modal-mask" onClick={() => setBatchModalOpen(false)}>
          <div className="dishAdmin-modal" style={{ width: 400 }} onClick={e => e.stopPropagation()}>
            <div className="dishAdmin-modal-header">
              <h3>提示</h3>
              <button className="dishAdmin-modal-close" onClick={() => setBatchModalOpen(false)}>✕</button>
            </div>
            <div className="dishAdmin-modal-body" style={{ minHeight: '60px', display: 'flex', alignItems: 'center' }}>
              <p style={{ fontSize: '1.05rem', color: '#333', margin: 0 }}>
                确定要执行批量<strong style={{ color: batchMode === 'delete' ? '#e63946' : '#4361ee', margin: '0 4px' }}>{batchMode === 'delete' ? '删除' : '增加'}</strong>操作吗？<br/>
                <span style={{ fontSize: '0.9rem', color: '#888', marginTop: '12px', display: 'inline-block' }}>共选中 {selectedIds.length} 项</span>
              </p>
            </div>
            <div className="dishAdmin-modal-footer">
              <button className="dishAdmin-btn ghost" onClick={() => setBatchModalOpen(false)}>取消</button>
              <button
                className={`dishAdmin-btn ${batchMode === 'delete' ? 'danger' : 'primary'}`}
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
        <div className="dishAdmin-modal-mask" onClick={() => setModalOpen(false)}>
          <div className="dishAdmin-modal" onClick={e => e.stopPropagation()}>
            <div className="dishAdmin-modal-header">
              <h3>{editing ? "编辑菜品" : "新增菜品"}</h3>
              <button className="dishAdmin-modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="dishAdmin-modal-body">
              <div className="dishAdmin-form-group">
                <label className="dishAdmin-form-label">菜品名称 *</label>
                <input
                  className="dishAdmin-input"
                  placeholder="请输入菜品名称"
                  value={form.dishName}
                  onChange={(e) => setForm((v) => ({ ...v, dishName: e.target.value }))}
                />
              </div>
              <div className="dishAdmin-form-group">
                <label className="dishAdmin-form-label">描述</label>
                <textarea
                  className="dishAdmin-form-textarea"
                  placeholder="请输入菜品描述..."
                  value={form.description}
                  onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="dishAdmin-form-group">
                  <label className="dishAdmin-form-label">价格 (元)</label>
                  <input
                    className="dishAdmin-input"
                    type="number"
                    min={0}
                    step={0.5}
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm((v) => ({ ...v, price: e.target.value ? Number(e.target.value) : 0 }))}
                  />
                </div>
                <div className="dishAdmin-form-group">
                  <label className="dishAdmin-form-label">类别</label>
                  <input
                    className="dishAdmin-input"
                    placeholder="如：川菜、粤菜..."
                    value={form.category}
                    onChange={(e) => setForm((v) => ({ ...v, category: e.target.value }))}
                  />
                </div>
              </div>
              <div className="dishAdmin-form-group">
                <label className="dishAdmin-form-label">所属地点</label>
                <select
                  className="dishAdmin-select"
                  value={form.locationId}
                  onChange={(e) => setForm((v) => ({
                    ...v,
                    locationId: Number(e.target.value),
                    locationName: locationItems.find(item => item.id === Number(e.target.value))?.name || "",
                  }))}
                >
                  <option value={0}>请选择地点</option>
                  {locationItems.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="dishAdmin-form-group">
                  <label className="dishAdmin-form-label">菜品状态</label>
                  <select
                    className="dishAdmin-select"
                    value={form.status}
                    onChange={(e) => setForm((v) => ({ ...v, status: Number(e.target.value) as UpdateDish["status"] }))}
                  >
                    {statusItems.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div className="dishAdmin-form-group">
                  <label className="dishAdmin-form-label">删除状态</label>
                  <select
                    className="dishAdmin-select"
                    value={form.isDeleted}
                    onChange={(e) => setForm((v) => ({ ...v, isDeleted: Number(e.target.value) as UpdateDish["isDeleted"] }))}
                  >
                    {isDeletedItems.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="dishAdmin-modal-footer">
              <button className="dishAdmin-btn ghost" onClick={() => setModalOpen(false)}>取消</button>
              <button className="dishAdmin-btn primary" onClick={onSave}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDishs;
