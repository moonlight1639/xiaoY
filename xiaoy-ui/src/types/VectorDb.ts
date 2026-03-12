/**
 * Record 实体类型（对应MongoDB集合：record）
 * 字段：自定义ID、内容、元数据（键值对列表）
 */

export type Namespace = {
  /** MongoDB主键（自动生成ObjectId，无需手动赋值） */
  id?: string; // 可选：新增时前端无需传，后端自动生成
  /** 命名空间（如业务模块标识） */
  name: string;
  /** 描述信息 */
  description?: string; // 可选：允许空值
  /** 记录数量 */
  recordCount?: number; // TS中用number替代Java的Long（前端无Long类型）
  /** 创建时间（MongoDB自动填充，无需手动设置） */
  createTime?: string; // 前端接收为ISO格式字符串（如"2026-03-11T08:00:00.000Z"）
  /** 修改时间（MongoDB自动填充，更新时自动更新） */
  updateTime?: string;
};
export interface Record  {
  /** 自定义主键ID（手动赋值，非MongoDB自动生成） */
  id: string,
  namespaceName:string,
  /** 内容字段（支持长文本） */
  content: string,
  /**
   * 元数据：键值对列表
   * 示例：[{key:"courseId", value:"19859"}, {key:"userName", value:"科大小y"}]
   */
  metadata: Pair[],
};

/** 键值对模型（对应Java中的静态内部类Pair） */
export interface Pair {
  /** 键（如元数据标识：courseId、isVectorDb、createBy） */
  key: string,
  /** 值（字符串类型，统一存储） */
  value: string,
};
