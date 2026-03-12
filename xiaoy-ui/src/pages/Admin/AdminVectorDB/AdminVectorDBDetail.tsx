import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminVectorDB.css";
import { Pagination } from "antd";
import type { Record as VDBRecord, Pair, Namespace } from "@/types/VectorDb";

// ===== 表单编辑行（带类型选择器，保存时统一转字符串存入 Pair） =====
type MetaType = "string" | "number" | "boolean" | "array";

interface MetaRow {
  key: string;
  type: MetaType;
  value: string;
}

const genId = () =>
  "vec-" + Math.random().toString(36).slice(2, 6) + "-" +
  [8, 4, 4, 4, 12].map(n =>
    Math.random().toString(16).slice(2, 2 + n).padStart(n, "0")
  ).join("-");

const EMPTY_META_ROW = (): MetaRow => ({ key: "", type: "string", value: "" });

// ===== Mock 数据：各命名空间的向量记录（以 Namespace.id 为 key） =====
const MOCK_NAMESPACES: Record<string, Namespace & { records: VDBRecord[] }> = {
  "ns-001": {
    id: "ns-001",
    name: "course_embeddings",
    description: "课程内容向量化存储，用于语义检索课程相关知识",
    recordCount: 1024,
    createTime: "2025-10-01 08:30:00",
    updateTime: "2026-03-08 14:22:10",
    records: [
      {
        id: "vec-ce-001a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
        namespaceName: "course_embeddings",
        content: "计算机网络课程讲授 OSI 七层模型，包括物理层、数据链路层、网络层、传输层、会话层、表示层和应用层的基本概念与协议。",
        metadata: [
          { key: "course", value: "计算机网络" },
          { key: "teacher", value: "张建国" },
          { key: "chapter", value: "1" },
          { key: "tags", value: "网络,OSI,协议" },
          { key: "isPublished", value: "true" },
          { key: "score", value: "4.8" },
        ],
      },
      {
        id: "vec-ce-002b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        namespaceName: "course_embeddings",
        content: "数据结构与算法课程中，二叉搜索树（BST）的插入、删除和查找时间复杂度在平均情况下均为 O(log n)。",
        metadata: [
          { key: "course", value: "数据结构" },
          { key: "teacher", value: "李明华" },
          { key: "chapter", value: "5" },
          { key: "tags", value: "BST,二叉树,算法复杂度" },
          { key: "isPublished", value: "true" },
          { key: "score", value: "4.9" },
        ],
      },
      {
        id: "vec-ce-003c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
        namespaceName: "course_embeddings",
        content: "操作系统课程介绍进程调度算法，包括先来先服务（FCFS）、短作业优先（SJF）和时间片轮转（RR）等策略。",
        metadata: [
          { key: "course", value: "操作系统" },
          { key: "teacher", value: "王晓峰" },
          { key: "chapter", value: "3" },
          { key: "tags", value: "进程调度,FCFS,SJF,RR" },
          { key: "isPublished", value: "false" },
          { key: "score", value: "4.6" },
        ],
      },
    ],
  },
  "ns-002": {
    id: "ns-002",
    name: "campus_life",
    description: "校园生活相关文档向量库，覆盖食堂、宿舍、活动等",
    recordCount: 537,
    createTime: "2025-11-15 09:00:00",
    updateTime: "2026-03-07 10:05:33",
    records: [
      {
        id: "vec-cl-a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        namespaceName: "campus_life",
        content: "第一食堂早餐供应时间为 7:00-9:00，提供包子、豆浆、油条、粥类等多种选项，价格实惠学生友好。",
        metadata: [
          { key: "category", value: "食堂" },
          { key: "location", value: "第一食堂" },
          { key: "floor", value: "1" },
          { key: "tags", value: "早餐,美食,食堂" },
          { key: "openHours", value: "07:00-21:00" },
          { key: "avgPrice", value: "8" },
        ],
      },
      {
        id: "vec-cl-b2c3d4e5-f6a7-8901-bcde-f01234567891",
        namespaceName: "campus_life",
        content: "学生宿舍楼 A 栋提供洗衣机公用设施，每次使用需扫码支付 2 元，热水供应时间为 6:00-23:00。",
        metadata: [
          { key: "category", value: "宿舍" },
          { key: "building", value: "A栋" },
          { key: "floor", value: "全栋" },
          { key: "tags", value: "宿舍,洗衣,热水" },
          { key: "facilities", value: "洗衣机,热水器,WIFI" },
        ],
      },
    ],
  },
  "ns-003": {
    id: "ns-003",
    name: "faq_knowledge",
    description: "常见问答知识库，小Y 智能问答的主要知识来源",
    recordCount: 3268,
    createTime: "2025-09-20 10:15:00",
    updateTime: "2026-03-09 18:44:55",
    records: [
      {
        id: "vec-fq-f1e2d3c4-b5a6-9780-fedc-ba9876543210",
        namespaceName: "faq_knowledge",
        content: "如何办理校园一卡通补办手续？需携带本人学生证前往行政楼 201 窗口，填写补办申请表，缴纳 10 元工本费，1-3 个工作日内可取卡。",
        metadata: [
          { key: "category", value: "行政事务" },
          { key: "subcategory", value: "一卡通" },
          { key: "office", value: "学生事务中心" },
          { key: "location", value: "行政楼201" },
          { key: "tags", value: "补办,一卡通,手续" },
          { key: "processDays", value: "3" },
          { key: "fee", value: "10" },
          { key: "isActive", value: "true" },
        ],
      },
      {
        id: "vec-fq-e2d3c4b5-a6f7-8901-edcb-a09876543211",
        namespaceName: "faq_knowledge",
        content: "图书馆借阅规则：本科生每次最多借阅 10 本图书，借阅期限为 30 天，可在线续借 2 次，逾期每天每本罚款 0.1 元。",
        metadata: [
          { key: "category", value: "图书馆" },
          { key: "subcategory", value: "借阅规则" },
          { key: "tags", value: "图书馆,借书,规则" },
          { key: "maxBooks", value: "10" },
          { key: "borrowDays", value: "30" },
          { key: "renewLimit", value: "2" },
          { key: "finePerDay", value: "0.1" },
          { key: "isActive", value: "true" },
        ],
      },
      {
        id: "vec-fq-d3c4b5a6-f7e8-9012-dcba-098765432112",
        namespaceName: "faq_knowledge",
        content: "奖学金评定每学年进行一次，评定标准包括学业成绩（占比 70%）、综合素质（占比 20%）和社会实践（占比 10%）。",
        metadata: [
          { key: "category", value: "奖助学金" },
          { key: "subcategory", value: "奖学金" },
          { key: "tags", value: "奖学金,评定,标准" },
          { key: "cycle", value: "每学年" },
          { key: "gradeWeight", value: "0.7" },
          { key: "qualityWeight", value: "0.2" },
          { key: "practiceWeight", value: "0.1" },
          { key: "isActive", value: "true" },
        ],
      },
    ],
  },
  "ns-004": {
    id: "ns-004",
    name: "teacher_profiles",
    description: "教师个人介绍及研究方向向量集合",
    recordCount: 210,
    createTime: "2025-12-01 11:00:00",
    updateTime: "2026-02-28 09:10:00",
    records: [
      {
        id: "vec-tp-11223344-5566-7788-99aa-bbccddeeff00",
        namespaceName: "teacher_profiles",
        content: "张建国教授，计算机网络领域专家，主要研究方向为软件定义网络（SDN）与网络功能虚拟化（NFV），发表 SCI 论文 40 余篇。",
        metadata: [
          { key: "name", value: "张建国" },
          { key: "title", value: "教授" },
          { key: "department", value: "计算机学院" },
          { key: "researchAreas", value: "SDN,NFV,网络安全" },
          { key: "papers", value: "42" },
          { key: "email", value: "zjg@example.edu.cn" },
          { key: "isActive", value: "true" },
        ],
      },
    ],
  },
  "ns-005": {
    id: "ns-005",
    name: "bus_schedule",
    description: "校车时刻表与路线描述向量数据",
    recordCount: 88,
    createTime: "2026-01-10 13:30:00",
    updateTime: "2026-03-01 08:00:00",
    records: [
      {
        id: "vec-bs-aabbccdd-eeff-0011-2233-445566778899",
        namespaceName: "bus_schedule",
        content: "1 号线校车从东门出发，经过图书馆、第二食堂、体育馆，终点为西门，单程约 15 分钟，首班 7:30，末班 22:00，间隔 30 分钟。",
        metadata: [
          { key: "route", value: "1号线" },
          { key: "startPoint", value: "东门" },
          { key: "endPoint", value: "西门" },
          { key: "stops", value: "东门,图书馆,第二食堂,体育馆,西门" },
          { key: "firstDeparture", value: "07:30" },
          { key: "lastDeparture", value: "22:00" },
          { key: "intervalMinutes", value: "30" },
          { key: "durationMinutes", value: "15" },
        ],
      },
    ],
  },
};



const AdminVectorDBDetail: React.FC = () => {
  // const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const nsData = id ? MOCK_NAMESPACES[id] : undefined;

  // ===== 新增 Modal 状态 =====
  const [modalOpen, setModalOpen] = useState(false);
  const [formId, setFormId] = useState("");
  const [formContent, setFormContent] = useState("");
  const [metaRows, setMetaRows] = useState<MetaRow[]>([EMPTY_META_ROW()]);

  const openCreate = () => {
    setFormId(genId());
    setFormContent("");
    setMetaRows([EMPTY_META_ROW()]);
    setModalOpen(true);
  };

  const updateMetaRow = (idx: number, patch: Partial<MetaRow>) => {
    setMetaRows(prev => prev.map((r, i) => i === idx ? { ...r, ...patch } : r));
  };

  const addMetaRow = () => setMetaRows(prev => [...prev, EMPTY_META_ROW()]);

  const removeMetaRow = (idx: number) =>
    setMetaRows(prev => prev.filter((_, i) => i !== idx));

  const onSave = () => {
    if (!formContent.trim() || !nsData) return;
    const metadata: Pair[] = metaRows
      .filter(r => r.key.trim())
      .map(r => ({ key: r.key.trim(), value: r.value }));
    const newRecord: VDBRecord = {
      id: formId || genId(),
      namespaceName: nsData.name,
      content: formContent.trim(),
      metadata,
    };
    if (nsData) nsData.records.unshift(newRecord);
    setModalOpen(false);
  };

  if (!nsData) {
    return (
      <div className="vdb-detail-page">
        <div className="vdb-detail-header">
          <button className="vdb-back-btn" onClick={() => navigate("/admin/vectordb")}>
            ← 返回列表
          </button>
          <h1>命名空间不存在</h1>
        </div>
        <div className="vdb-empty">未找到命名空间：{id}</div>
      </div>
    );
  }

  const filtered = nsData.records.filter(
    (r) =>
      r.id.toLowerCase().includes(keyword.toLowerCase()) ||
      r.content.includes(keyword) ||
      JSON.stringify(r.metadata).includes(keyword)
  );

  return (
    <>
    <div className="vdb-detail-page">
      {/* 页头 */}
      <div className="vdb-detail-header">
        <button className="vdb-back-btn" onClick={() => navigate("/admin/vectordb")}>
          ← 返回列表
        </button>
        <h1>
          <span className="vdb-ns-tag" style={{ fontSize: "1rem" }}>{nsData.name}</span>
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
          <span className="vdb-stat-value num">{(nsData.recordCount ?? 0).toLocaleString()}</span>
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
          <button className="vdb-btn vdb-btn-primary" onClick={openCreate}>+ 新增记录</button>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="vdb-empty">暂无记录</div>
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id}>
                  <td>
                    <span className="vdb-record-id">{record.id}</span>
                  </td>
                  <td>
                    <span className="vdb-record-content">{record.content}</span>
                  </td>
                  <td>
                    <ul className="vdb-meta-list">
                      {record.metadata.map((pair) => (
                        <li key={pair.key} className="vdb-meta-item">
                          <span className="vdb-meta-key">{pair.key}</span>
                          <span className="vdb-meta-val-cell">{pair.value}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button className="vdb-btn vdb-btn-danger">
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
          <span>共 {(nsData.recordCount ?? 0).toLocaleString()} 条</span>
          <Pagination
            defaultCurrent={1}
            total={nsData.recordCount}
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

    {/* ===== 新增记录 Modal ===== */}
    {modalOpen && (
      <div className="vdb-modal-mask" onClick={() => setModalOpen(false)}>
        <div className="vdb-modal" onClick={e => e.stopPropagation()}>
          <div className="vdb-modal-header">
            <h3>新增向量记录</h3>
            <button className="vdb-modal-close" onClick={() => setModalOpen(false)}>✕</button>
          </div>

          <div className="vdb-modal-body">
            {/* 记录 ID */}
            <div className="vdb-form-group">
              <label className="vdb-form-label">记录 ID</label>
              <input
                className="vdb-form-input"
                value={formId}
                onChange={e => setFormId(e.target.value)}
                placeholder="留空则自动生成"
              />
              <span className="vdb-form-hint">系统已为您预生成 UUID，可手动修改</span>
            </div>

            {/* 记录内容 */}
            <div className="vdb-form-group">
              <label className="vdb-form-label">记录内容 *</label>
              <textarea
                className="vdb-form-textarea"
                value={formContent}
                onChange={e => setFormContent(e.target.value)}
                placeholder="请输入向量化的文本内容..."
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
                      onChange={e => updateMetaRow(idx, { key: e.target.value })}
                    />
                    <select
                      className="vdb-meta-type-select"
                      value={row.type}
                      onChange={e => updateMetaRow(idx, { type: e.target.value as MetaType, value: "" })}
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
                        onChange={e => updateMetaRow(idx, { value: e.target.value })}
                      >
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <input
                        className="vdb-form-input"
                        placeholder={
                          row.type === "array" ? "逗号分隔，如: a, b, c" :
                          row.type === "number" ? "数字" : "值"
                        }
                        value={row.value}
                        onChange={e => updateMetaRow(idx, { value: e.target.value })}
                      />
                    )}
                    <button
                      className="vdb-meta-del-btn"
                      onClick={() => removeMetaRow(idx)}
                      title="删除此行"
                    >×</button>
                  </div>
                ))}
                <button className="vdb-meta-add-btn" onClick={addMetaRow}>+ 添加字段</button>
              </div>
            </div>
          </div>

          <div className="vdb-modal-footer">
            <button className="vdb-btn vdb-btn-ghost" onClick={() => setModalOpen(false)}>取消</button>
            <button
              className="vdb-btn vdb-btn-primary"
              onClick={onSave}
              disabled={!formContent.trim()}
              style={{ opacity: formContent.trim() ? 1 : 0.5 }}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default AdminVectorDBDetail;
