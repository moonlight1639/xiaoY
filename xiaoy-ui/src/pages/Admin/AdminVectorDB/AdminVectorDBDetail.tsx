import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminVectorDB.css";
import { Pagination, message } from "antd";
import type { VbRecord as VDBRecord, Pair, Namespace } from "@/types";
import {
  insertRecord,
  getRecords,
  deleteRecord,
  getNamespaces,
} from "@/services";
// ===== 表单编辑行（带类型选择器，保存时统一转字符串存入 Pair） =====
type MetaType = "string" | "number" | "boolean" | "array";

interface MetaRow {
  key: string;
  type: MetaType;
  value: string;
}

const genId = () =>
  "vec-" +
  Math.random().toString(36).slice(2, 6) +
  "-" +
  [8, 4, 4, 4, 12]
    .map((n) =>
      Math.random()
        .toString(16)
        .slice(2, 2 + n)
        .padStart(n, "0"),
    )
    .join("-");

const EMPTY_META_ROW = (): MetaRow => ({ key: "", type: "string", value: "" });

const AdminVectorDBDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageLoading, setPageLoading] = useState(true);
  const [nsData, setNsData] = useState<Namespace | undefined>(undefined);
  const [records, setRecords] = useState<VDBRecord[]>([]);

  // ===== 新增 Modal 状态 =====
  const [modalOpen, setModalOpen] = useState(false);
  const [formId, setFormId] = useState("");
  const [formContent, setFormContent] = useState("");
  const [metaRows, setMetaRows] = useState<MetaRow[]>([EMPTY_META_ROW()]);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMetaModalOpen, setEditMetaModalOpen] = useState(false);
  const [editingRecordIdForMeta, setEditingRecordIdForMeta] = useState("");
  const [editingMetaRows, setEditingMetaRows] = useState<MetaRow[]>([
    EMPTY_META_ROW(),
  ]);

  const openCreate = () => {
    setFormId(genId());
    setFormContent("");
    setMetaRows([EMPTY_META_ROW()]);
    setSaving(false);
    setModalOpen(true);
  };

  const updateMetaRow = (idx: number, patch: Partial<MetaRow>) => {
    setMetaRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)),
    );
  };

  const addMetaRow = () => setMetaRows((prev) => [...prev, EMPTY_META_ROW()]);

  const removeMetaRow = (idx: number) =>
    setMetaRows((prev) => prev.filter((_, i) => i !== idx));

  const fetchRecords = useCallback(async (namespaceName?: string) => {
    if (!namespaceName) {
      setRecords([]);
      return;
    }
    try {
      const resp = await getRecords();
      if (!resp || typeof resp === "string" || !resp.success) {
        message.error(
          (resp && typeof resp !== "string" && resp.errorMsg) || "获取记录失败",
        );
        setRecords([]);
        return;
      }
      const allRecords = resp.data || [];
      setRecords(allRecords.filter((r) => r.namespace === namespaceName));
    } catch {
      message.error("获取记录失败");
      setRecords([]);
    }
  }, []);

  const fetchPageData = useCallback(async () => {
    if (!id) {
      setNsData(undefined);
      setRecords([]);
      setPageLoading(false);
      return;
    }

    setPageLoading(true);
    try {
      const nsResp = await getNamespaces();
      if (
        !nsResp ||
        typeof nsResp === "string" ||
        !nsResp.success ||
        !nsResp.data
      ) {
        message.error(
          (nsResp && typeof nsResp !== "string" && nsResp.errorMsg) ||
            "获取命名空间失败",
        );
        setNsData(undefined);
        setRecords([]);
        return;
      }

      const currentNs = nsResp.data.find((ns) => ns.id === id);
      setNsData(currentNs);

      if (!currentNs) {
        setRecords([]);
        return;
      }

      await fetchRecords(currentNs.name);
    } catch {
      message.error("获取页面数据失败");
      setNsData(undefined);
      setRecords([]);
    } finally {
      setPageLoading(false);
    }
  }, [id, fetchRecords]);

  const onSave = async () => {
    if (!formContent.trim() || !nsData || saving) return;
    const metadata: Pair[] = metaRows
      .filter((r) => r.key.trim())
      .map((r) => ({ key: r.key.trim(), value: r.value }));
    const newRecord = {
      id: formId || genId(),
      namespace: nsData.name,
      content: formContent.trim(),
      metadata,
    };
    setSaving(true);
    try {
      const resp = await insertRecord(newRecord as VDBRecord);
      if (!resp || typeof resp === "string" || !resp.success) {
        message.error(
          (resp && typeof resp !== "string" && resp.errorMsg) || "新增记录失败",
        );
        return;
      }
      message.success("新增记录成功");
      setModalOpen(false);
      await fetchRecords(nsData.name);
    } catch {
      message.error("新增记录失败");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (recordId: string) => {
    if (submitting) return;
    const ok = window.confirm("确认删除该记录吗？此操作不可撤销。");
    if (!ok) return;
    setSubmitting(true);
    try {
      const resp = await deleteRecord(recordId);
      if (!resp || typeof resp === "string" || !resp.success) {
        message.error(
          (resp && typeof resp !== "string" && resp.errorMsg) || "删除记录失败",
        );
        return;
      }
      message.success("删除记录成功");
      await fetchRecords(nsData?.name);
    } catch {
      message.error("删除记录失败");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditContent = (record: VDBRecord) => {
    setEditingRecordId(record.id);
    setEditContent(record.content || "");
    setEditModalOpen(true);
  };

  const onSaveEditContent = async () => {
    if (submitting) return;
    const trimmed = editContent.trim();
    if (!editingRecordId) return;
    if (!trimmed) {
      message.error("内容不能为空");
      return;
    }
    const target = records.find((r) => r.id === editingRecordId);
    if (!target) {
      message.error("记录不存在");
      return;
    }
    setSubmitting(true);
    try {
      const res = await insertRecord({
        ...target,
        content: trimmed,
      } as VDBRecord);
      if (!res.success) {
        message.error(res.errorMsg || "记录更新失败");
        return;
      }
      setRecords((prev) =>
        prev.map((item) =>
          item.id === editingRecordId ? { ...item, content: trimmed } : item,
        ),
      );
      message.success("内容已更新");
      setEditModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const openEditMetadata = (record: VDBRecord) => {
    setEditingRecordIdForMeta(record.id);
    const convertedRows: MetaRow[] = record.metadata.map((pair) => ({
      key: pair.key,
      type: "string",
      value: pair.value,
    }));
    setEditingMetaRows(
      convertedRows.length > 0 ? convertedRows : [EMPTY_META_ROW()],
    );
    setEditMetaModalOpen(true);
  };

  const updateEditMetaRow = (idx: number, patch: Partial<MetaRow>) => {
    setEditingMetaRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)),
    );
  };

  const addEditMetaRow = () => {
    setEditingMetaRows((prev) => [...prev, EMPTY_META_ROW()]);
  };

  const removeEditMetaRow = (idx: number) => {
    setEditingMetaRows((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSaveEditMeta = async () => {
    if (submitting) return;
    if (!editingRecordIdForMeta) return;
    const newMetadata: Pair[] = editingMetaRows
      .filter((r) => r.key.trim())
      .map((r) => ({ key: r.key.trim(), value: r.value }));
    const target = records.find((r) => r.id === editingRecordIdForMeta);
    if (!target) {
      message.error("记录不存在");
      return;
    }
    setSubmitting(true);
    try {
      const res = await insertRecord({
        ...target,
        metadata: newMetadata,
      } as VDBRecord);
      if (!res.success) {
        message.error(res.errorMsg || "记录更新失败");
        return;
      }
      setRecords((prev) =>
        prev.map((item) =>
          item.id === editingRecordIdForMeta
            ? { ...item, metadata: newMetadata }
            : item,
        ),
      );
      message.success("元数据已更新");
      setEditMetaModalOpen(false);
    } finally {
      setSubmitting(false);
    }

  };

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  if (pageLoading) {
    return (
      <div className="vdb-detail-page">
        <div className="vdb-empty">加载中...</div>
      </div>
    );
  }

  if (!nsData) {
    return (
      <div className="vdb-detail-page">
        <div className="vdb-detail-header">
          <button
            className="vdb-back-btn"
            onClick={() => navigate("/admin/vectordb")}
          >
            ← 返回列表
          </button>
          <h1>命名空间不存在</h1>
        </div>
        <div className="vdb-empty">未找到命名空间：{id}</div>
      </div>
    );
  }

  const filtered = records.filter(
    (r) =>
      r.id.toLowerCase().includes(keyword.toLowerCase()) ||
      r.content.includes(keyword) ||
      JSON.stringify(r.metadata).includes(keyword),
  );
  const total = filtered.length;
  const pageStart = (page - 1) * pageSize;
  const pagedRecords = filtered.slice(pageStart, pageStart + pageSize);

  return (
    <>
      <div className="vdb-detail-page">
        {/* 页头 */}
        <div className="vdb-detail-header">
          <button
            className="vdb-back-btn"
            onClick={() => navigate("/admin/vectordb")}
          >
            ← 返回列表
          </button>
          <h1>
            <span className="vdb-ns-tag" style={{ fontSize: "1rem" }}>
              {nsData.name}
            </span>
            &nbsp; 向量记录详情
          </h1>
        </div>

        {/* 基本信息 Stat 条带 */}
        <div className="vdb-stat-strip">
          <div className="vdb-stat-card desc">
            <span className="vdb-stat-label">描述</span>
            <span className="vdb-stat-value">{nsData.description}</span>
          </div>
          <div className="vdb-stat-card count">
            <span className="vdb-stat-label">总记录数</span>
            <span className="vdb-stat-value num">
              {records.length.toLocaleString()}
            </span>
          </div>
          <div className="vdb-stat-card">
            <span className="vdb-stat-label">创建时间</span>
            <span className="vdb-stat-value time">{nsData.createTime}</span>
          </div>
          <div className="vdb-stat-card">
            <span className="vdb-stat-label">修改时间</span>
            <span className="vdb-stat-value time">{nsData.updateTime}</span>
          </div>
        </div>

        {/* 搜索工具栏 */}
        <div className="vdb-toolbar">
          <div className="vdb-filters">
            <input
              className="vdb-input"
              placeholder="搜索 ID / 内容 / Metadata..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="vdb-actions">
            <button className="vdb-btn vdb-btn-primary" onClick={openCreate} disabled={submitting}>
              + 新增记录
            </button>
          </div>
        </div>

        {/* 记录表格 */}
        <div className="vdb-card">
          <div className="vdb-table-wrap">
            <table className="vdb-detail-table">
              <thead>
                <tr>
                  <th className="vdb-col-id">记录 ID</th>
                  <th className="vdb-col-content">记录内容</th>
                  <th className="vdb-col-meta">元数据（Metadata）</th>
                  <th className="vdb-col-op">操作</th>
                </tr>
              </thead>
              <tbody>
                {pagedRecords.length === 0 ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="vdb-empty">暂无记录</div>
                    </td>
                  </tr>
                ) : (
                  pagedRecords.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <span className="vdb-record-id">{record.id}</span>
                      </td>
                      <td>
                        <button
                          className="vdb-record-content"
                          style={{
                            maxHeight: 120,
                            overflowY: "auto",
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            padding: 0,
                          }}
                          title="点击编辑内容"
                          disabled={submitting}
                          onClick={() => openEditContent(record)}
                        >
                          {record.content}
                        </button>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          style={{
                            width: "100%",
                            textAlign: "left",
                            background: "transparent",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                          }}
                          title="点击编辑元数据"
                          disabled={submitting}
                          onClick={() => openEditMetadata(record)}
                        >
                          <ul className="vdb-meta-list">
                            {record.metadata.map((pair) => (
                              <li key={pair.key} className="vdb-meta-item">
                                <span className="vdb-meta-key">{pair.key}</span>
                                <span className="vdb-meta-val-cell">
                                  {pair.value}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </button>
                      </td>
                      <td>
                        <button
                          className="vdb-btn vdb-btn-danger"
                          disabled={submitting}
                          onClick={() => onDelete(record.id)}
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="vdb-pagination">
            <span>共 {total.toLocaleString()} 条</span>
            <Pagination
              current={page}
              total={total}
              pageSize={pageSize}
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
            />
          </div>
        </div>
      </div>

      {/* ===== 新增记录 Modal ===== */}
      {modalOpen && (
        <div className="vdb-modal-mask" onClick={() => setModalOpen(false)}>
          <div className="vdb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vdb-modal-header">
              <h3>新增向量记录</h3>
              <button
                className="vdb-modal-close"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="vdb-modal-body">
              {/* 记录内容 */}
              <div className="vdb-form-group">
                <label className="vdb-form-label">记录内容 *</label>
                <textarea
                  className="vdb-form-textarea"
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="请输入向量化的文本内容..."
                  style={{ maxHeight: 220, overflowY: "auto" }}
                />
              </div>

              {/* Metadata */}
              <div className="vdb-form-group">
                <label className="vdb-form-label">元数据（Metadata）</label>
                <div className="vdb-meta-editor">
                  {metaRows.map((row, idx) => (
                    <div key={idx} className="vdb-meta-row">
                      <input
                        className="vdb-form-input"
                        placeholder="键名"
                        value={row.key}
                        onChange={(e) =>
                          updateMetaRow(idx, { key: e.target.value })
                        }
                      />
                      <select
                        className="vdb-meta-type-select"
                        value={row.type}
                        onChange={(e) =>
                          updateMetaRow(idx, {
                            type: e.target.value as MetaType,
                            value: "",
                          })
                        }
                      >
                        <option value="string">文本</option>
                        <option value="number">数字</option>
                        <option value="boolean">布尔</option>
                        <option value="array">数组</option>
                      </select>
                      {row.type === "boolean" ? (
                        <select
                          className="vdb-meta-type-select"
                          value={row.value}
                          onChange={(e) =>
                            updateMetaRow(idx, { value: e.target.value })
                          }
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </select>
                      ) : (
                        <input
                          className="vdb-form-input"
                          placeholder={
                            row.type === "array"
                              ? "逗号分隔，如: a, b, c"
                              : row.type === "number"
                                ? "数字"
                                : "值"
                          }
                          value={row.value}
                          onChange={(e) =>
                            updateMetaRow(idx, { value: e.target.value })
                          }
                        />
                      )}
                      <button
                        className="vdb-meta-del-btn"
                        onClick={() => removeMetaRow(idx)}
                        title="删除此行"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button className="vdb-meta-add-btn" onClick={addMetaRow}>
                    + 添加字段
                  </button>
                </div>
              </div>
            </div>

            <div className="vdb-modal-footer">
              <button
                className="vdb-btn vdb-btn-ghost"
                disabled={submitting || saving}
                onClick={() => setModalOpen(false)}
              >
                取消
              </button>
              <button
                className="vdb-btn vdb-btn-primary"
                onClick={onSave}
                disabled={!formContent.trim() || saving || submitting}
                style={{ opacity: !formContent.trim() || saving || submitting ? 0.5 : 1 }}
              >
                {saving ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 编辑内容 Modal ===== */}
      {editModalOpen && (
        <div className="vdb-modal-mask" onClick={() => setEditModalOpen(false)}>
          <div
            className="vdb-modal"
            style={{ width: 640 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vdb-modal-header">
              <h3>编辑记录内容</h3>
              <button
                className="vdb-modal-close"
                onClick={() => setEditModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="vdb-modal-body">
              <div className="vdb-form-group">
                <label className="vdb-form-label">记录内容 *</label>
                <textarea
                  className="vdb-form-textarea"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="请输入向量化的文本内容..."
                  style={{ minHeight: 180, maxHeight: 320, overflowY: "auto" }}
                  autoFocus
                />
              </div>
            </div>

            <div className="vdb-modal-footer">
              <button
                className="vdb-btn vdb-btn-ghost"
                disabled={submitting}
                onClick={() => setEditModalOpen(false)}
              >
                取消
              </button>
              <button
                className="vdb-btn vdb-btn-primary"
                onClick={onSaveEditContent}
                disabled={!editContent.trim() || submitting}
                style={{ opacity: editContent.trim() && !submitting ? 1 : 0.5 }}
              >
                {submitting ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 编辑元数据 Modal ===== */}
      {editMetaModalOpen && (
        <div
          className="vdb-modal-mask"
          onClick={() => setEditMetaModalOpen(false)}
        >
          <div className="vdb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vdb-modal-header">
              <h3>编辑元数据</h3>
              <button
                className="vdb-modal-close"
                onClick={() => setEditMetaModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="vdb-modal-body">
              <div className="vdb-form-group">
                <label className="vdb-form-label">元数据（Metadata）</label>
                <div className="vdb-meta-editor">
                  {editingMetaRows.map((row, idx) => (
                    <div key={idx} className="vdb-meta-row">
                      <input
                        className="vdb-form-input"
                        placeholder="键名"
                        value={row.key}
                        onChange={(e) =>
                          updateEditMetaRow(idx, { key: e.target.value })
                        }
                      />
                      <select
                        className="vdb-meta-type-select"
                        value={row.type}
                        onChange={(e) =>
                          updateEditMetaRow(idx, {
                            type: e.target.value as MetaType,
                            value: "",
                          })
                        }
                      >
                        <option value="string">文本</option>
                        <option value="number">数字</option>
                        <option value="boolean">布尔</option>
                        <option value="array">数组</option>
                      </select>
                      {row.type === "boolean" ? (
                        <select
                          className="vdb-meta-type-select"
                          value={row.value}
                          onChange={(e) =>
                            updateEditMetaRow(idx, { value: e.target.value })
                          }
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </select>
                      ) : (
                        <input
                          className="vdb-form-input"
                          placeholder={
                            row.type === "array"
                              ? "逗号分隔，如: a, b, c"
                              : row.type === "number"
                                ? "数字"
                                : "值"
                          }
                          value={row.value}
                          onChange={(e) =>
                            updateEditMetaRow(idx, { value: e.target.value })
                          }
                        />
                      )}
                      <button
                        className="vdb-meta-del-btn"
                        onClick={() => removeEditMetaRow(idx)}
                        title="删除此行"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button className="vdb-meta-add-btn" onClick={addEditMetaRow}>
                    + 添加字段
                  </button>
                </div>
              </div>
            </div>

            <div className="vdb-modal-footer">
              <button
                className="vdb-btn vdb-btn-ghost"
                disabled={submitting}
                onClick={() => setEditMetaModalOpen(false)}
              >
                取消
              </button>
              <button
                className="vdb-btn vdb-btn-primary"
                onClick={onSaveEditMeta}
                disabled={submitting}
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

export default AdminVectorDBDetail;
