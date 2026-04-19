import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminVectorDB.css";
import { Pagination } from "antd";
import type { Namespace } from "@/types/VectorDb";
import {
  getNamespaces,
  insertNamespace,
  deleteNamespace,
  updateNamespace,
} from "@/services";
import { message } from "antd";

// ===== Mock 数据 =====
const INIT_NAMESPACES: Namespace[] = [
  {
    id: "ns-001",
    name: "course_embeddings",
    description: "课程内容向量化存储，用于语义检索课程相关知识",
    recordCount: 1024,
    createTime: "2025-10-01 08:30:00",
    updateTime: "2026-03-08 14:22:10",
  },
  {
    id: "ns-002",
    name: "campus_life",
    description: "校园生活相关文档向量库，覆盖食堂、宿舍、活动等",
    recordCount: 537,
    createTime: "2025-11-15 09:00:00",
    updateTime: "2026-03-07 10:05:33",
  },
  {
    id: "ns-003",
    name: "faq_knowledge",
    description: "常见问答知识库，小Y 智能问答的主要知识来源",
    recordCount: 3268,
    createTime: "2025-09-20 10:15:00",
    updateTime: "2026-03-09 18:44:55",
  },
  {
    id: "ns-004",
    name: "teacher_profiles",
    description: "教师个人介绍及研究方向向量集合",
    recordCount: 210,
    createTime: "2025-12-01 11:00:00",
    updateTime: "2026-02-28 09:10:00",
  },
  {
    id: "ns-005",
    name: "bus_schedule",
    description: "校车时刻表与路线描述向量数据",
    recordCount: 88,
    createTime: "2026-01-10 13:30:00",
    updateTime: "2026-03-01 08:00:00",
  },
];

const AdminVectorDB: React.FC = () => {
  const navigate = useNavigate();
  const [namespaces, setNamespaces] = useState<Namespace[]>(INIT_NAMESPACES);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ===== 新建 Modal =====
  const [modalOpen, setModalOpen] = useState(false);
  const [formNs, setFormNs] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [nsError, setNsError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingNsId, setEditingNsId] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setFormNs("");
    setFormDesc("");
    setNsError("");
    setModalOpen(true);
  };

  const fetchNamespaces = async () => {
    try {
      const data = await getNamespaces();
      if (data.success && data.data) {
        setNamespaces(data.data);
        return;
      }
      message.error(data.errorMsg || "获取命名空间列表失败");
    } catch {
      message.error("获取命名空间列表失败");
    }
  };

  const onSave = async () => {
    if (submitting) return;
    const trimmed = formNs.trim();
    if (!trimmed) {
      setNsError("命名空间名不能为空");
      return;
    }
    if (!/^[a-z0-9-]+$/.test(trimmed)) {
      setNsError("只能包含小写字母、数字和横杠");
      return;
    }
    if (namespaces.some((n) => n.name === trimmed)) {
      setNsError("命名空间已存在");
      return;
    }
    setSubmitting(true);
    try {
      const resp = await insertNamespace({
        name: trimmed,
        description: formDesc.trim(),
      });
      if (!resp.success) {
        setNsError(resp.errorMsg || "创建命名空间失败");
        return;
      }
      message.success("创建命名空间成功");
      setPage(1);
      setModalOpen(false);
      await fetchNamespaces();
    } catch {
      setNsError("创建命名空间失败");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id?: string) => {
    if (submitting) return;
    if (!id) {
      message.error("命名空间ID缺失，删除失败");
      return;
    }
    const ok = window.confirm("确认删除该命名空间吗？此操作不可撤销。");
    if (!ok) return;
    setSubmitting(true);
    try {
      const resp = await deleteNamespace(id);
      if (!resp.success) {
        message.error(resp.errorMsg || "删除命名空间失败");
        return;
      }
      message.success("删除命名空间成功");
      await fetchNamespaces();
    } catch {
      message.error("删除命名空间失败");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditDesc = (ns: Namespace) => {
    setEditingNsId(ns.id || "");
    setEditDesc(ns.description || "");
    setEditModalOpen(true);
  };

  const onSaveEditDesc = async () => {
    if (submitting) return;
    const trimmed = editDesc.trim();
    if (!trimmed) {
      message.error("描述不能为空");
      return;
    }
    setSubmitting(true);
    try {
      const resp = await updateNamespace({
        ...namespaces.find((n) => n.id === editingNsId),
        description: trimmed,
      } as Namespace);
      if (!resp.success) {
        message.error(resp.errorMsg || "更新命名空间描述失败");
        return;
      }

      setNamespaces((prev) =>
        prev.map((item) =>
          item.id === editingNsId ? { ...item, description: trimmed } : item,
        ),
      );
      message.success("描述已更新");
      setEditModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = namespaces.filter(
    (ns) =>
      ns.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (ns.description ?? "").includes(keyword),
  );
  const total = filtered.length;

  const handleRowClick = (ns: Namespace) => {
    navigate(`/admin/vectordb/${ns.id}`);
  };

  useEffect(() => {
    fetchNamespaces();
  }, []);
  return (
    <>
      <div className="vdb-page">
        <div className="vdb-page-header">
          <h1>🗄️ 向量数据库管理</h1>
          <p>管理所有向量命名空间（Namespace），点击行查看详细记录</p>
        </div>

        <div className="vdb-toolbar">
          <div className="vdb-filters">
            <input
              className="vdb-input"
              placeholder="搜索命名空间 / 描述..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="vdb-actions">
            <button className="vdb-btn vdb-btn-primary" onClick={openCreate} disabled={submitting}>
              + 新建命名空间
            </button>
          </div>
        </div>

        <div className="vdb-card">
          <div className="vdb-table-wrap">
            <table className="vdb-table">
              <thead>
                <tr>
                  <th>Namespace</th>
                  <th>描述</th>
                  <th>记录数</th>
                  <th>创建时间</th>
                  <th>修改时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="vdb-empty">暂无数据</div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((ns) => (
                    <tr key={ns.id} onClick={() => handleRowClick(ns)}>
                      <td>
                        <span className="vdb-ns-tag">{ns.name}</span>
                      </td>
                      <td
                        className="vdb-desc-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="vdb-desc-col"
                          disabled={submitting}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                          title="点击编辑描述"
                          onClick={() => openEditDesc(ns)}
                        >
                          {ns.description}
                        </button>
                      </td>
                      <td>
                        <span className="vdb-count-badge">
                          {(ns.recordCount ?? 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="vdb-time">{ns.createTime}</td>
                      <td className="vdb-time">{ns.updateTime}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                            flexWrap: "nowrap",
                          }}
                        >
                          <button
                            className="vdb-btn vdb-btn-ghost"
                            disabled={submitting}
                            onClick={() => handleRowClick(ns)}
                          >
                            查看详情
                          </button>
                          <button
                            className="vdb-btn vdb-btn-danger"
                            disabled={submitting}
                            onClick={() => onDelete(ns.id)}
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="vdb-pagination">
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

      {/* ===== 新建命名空间 Modal ===== */}
      {modalOpen && (
        <div className="vdb-modal-mask" onClick={() => setModalOpen(false)}>
          <div
            className="vdb-modal"
            style={{ width: 480 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vdb-modal-header">
              <h3>新建Namespace</h3>
              <button
                className="vdb-modal-close"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="vdb-modal-body">
              <div className="vdb-form-group">
                <label className="vdb-form-label">命名空间名称 *</label>
                <input
                  className="vdb-form-input"
                  placeholder="小写字母、数字、横杠，如 my-namespace"
                  value={formNs}
                  onChange={(e) => {
                    setFormNs(e.target.value);
                    setNsError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && onSave()}
                  autoFocus
                />
                {nsError && (
                  <span
                    className="vdb-form-hint"
                    style={{ color: "var(--vdb-danger)" }}
                  >
                    {nsError}
                  </span>
                )}
                <span className="vdb-form-hint">
                  只支持小写英文字母、数字和横杠（a-z、0-9、-）
                </span>
              </div>

              <div className="vdb-form-group">
                <label className="vdb-form-label">描述</label>
                <textarea
                  className="vdb-form-textarea"
                  placeholder="请输入该命名空间的用途说明..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  style={{ minHeight: 72 }}
                />
              </div>
            </div>

            <div className="vdb-modal-footer">
              <button
                className="vdb-btn-ghost"
                disabled={submitting}
                onClick={() => setModalOpen(false)}
              >
                取消
              </button>
              <button
                className="vdb-btn vdb-btn-primary"
                onClick={onSave}
                disabled={!formNs.trim() || submitting}
                style={{ opacity: formNs.trim() && !submitting ? 1 : 0.5 }}
              >
                {submitting ? "提交中..." : "创建"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 编辑描述 Modal ===== */}
      {editModalOpen && (
        <div className="vdb-modal-mask" onClick={() => setEditModalOpen(false)}>
          <div
            className="vdb-modal"
            style={{ width: 520 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vdb-modal-header">
              <h3>编辑命名空间描述</h3>
              <button
                className="vdb-modal-close"
                onClick={() => setEditModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="vdb-modal-body">
              <div className="vdb-form-group">
                <label className="vdb-form-label">描述 *</label>
                <textarea
                  className="vdb-form-textarea"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="请输入该命名空间的用途说明..."
                  style={{ minHeight: 120, maxHeight: 260, overflowY: "auto" }}
                  autoFocus
                />
              </div>
            </div>

            <div className="vdb-modal-footer">
              <button
                className="vdb-btn-ghost"
                disabled={submitting}
                onClick={() => setEditModalOpen(false)}
              >
                取消
              </button>
              <button
                className="vdb-btn vdb-btn-primary"
                onClick={onSaveEditDesc}
                disabled={!editDesc.trim() || submitting}
                style={{ opacity: editDesc.trim() && !submitting ? 1 : 0.5 }}
              >
                {submitting ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminVectorDB;
