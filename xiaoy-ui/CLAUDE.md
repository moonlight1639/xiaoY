# 科大小Y - 校园智能生活服务平台

## 项目概述

小Y项目是一个围绕校园"学习信息、生活服务、智能问答、后台管理"建设的前后端分离系统。系统面向学生用户与管理员用户，目标是在单一入口内整合课程、食堂、菜品、评价、用户信息及AI问答服务。

## 项目结构

```
kedaAgentDemo/
├── xiaoy-ui/                 # React 前端项目
│   ├── src/
│   │   ├── components/       # 公共组件
│   │   │   ├── Layout/       # 主布局组件
│   │   │   ├── Chat/         # 聊天组件
│   │   │   ├── LoginComponent/ # 登录组件
│   │   │   ├── RegisterComponent/ # 注册组件
│   │   │   ├── AvatarDropdown/ # 用户头像下拉菜单
│   │   │   └── UpLoad/       # 文件上传组件
│   │   ├── pages/            # 页面组件
│   │   │   ├── Home/         # 首页
│   │   │   ├── ChatPage/     # AI聊天页（流式输出）
│   │   │   ├── Courses/      # 课程页
│   │   │   ├── Life/         # 生活服务页
│   │   │   ├── Reviews/      # 课程评价页
│   │   │   ├── Canteen/      # 食堂页
│   │   │   ├── SchoolBus/    # 校车页
│   │   │   ├── UserInfoPage/ # 用户信息页
│   │   │   ├── InterviewMock/ # 模拟面试页
│   │   │   └── Admin/        # 管理后台模块
│   │   │       ├── AdminUsers/       # 用户管理
│   │   │       ├── AdminCourses/     # 课程管理
│   │   │       ├── AdminDishs/       # 菜品管理
│   │   │       ├── AdminLocations/   # 地点管理
│   │   │       ├── AdminCourseComments/ # 评论管理
│   │   │       └── AdminVectorDB/    # 向量数据库管理
│   │   ├── services/         # API 服务层
│   │   │   ├── http.ts       # Axios 实例配置
│   │   │   ├── chatApi.ts    # 聊天 API
│   │   │   ├── streamingApi.ts # SSE 流式请求
│   │   │   ├── userApi.ts    # 用户 API
│   │   │   ├── courseApi.ts  # 课程 API
│   │   │   ├── dishApi.ts    # 菜品 API
│   │   │   ├── vectorDbApi.ts # 向量数据库 API
│   │   │   └── ...           # 其他 API
│   │   ├── store/            # Zustand 状态管理
│   │   │   ├── authStore.ts  # 认证状态（用户、token）
│   │   │   └── appStore.ts   # 应用状态（主题等）
│   │   ├── types/            # TypeScript 类型定义
│   │   ├── router/           # 路由配置
│   │   └── assets/           # 静态资源
│   ├── package.json          # 依赖配置
│   └── vite.config.ts        # Vite 配置（含 @ 别名）
│
├── xiaoY-py/                 # Python 后端（FastAPI）
│   └── app/
│       ├── main.py           # FastAPI 应用入口
│       ├── schemas.py        # Pydantic 数据模型
│       └── services/
│           └── interview_generator.py # 面试题生成器（LLM/规则双模式）
│
├── front_api/                # Node.js Mock 后端（Express）
│   ├── server.js             # Express 服务入口
│   └── package.json          # 依赖配置
│
└── 科大小Y微信平台的设计与实现/  # 项目文档
    ├── 1.科大小Y项目概述.md
    ├── 5.前端功能需求说明.md
    ├── 6.后端功能需求说明.md
    └── ...                   # 其他设计文档
```

## 技术栈

### 前端 (xiaoy-ui)
- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **UI 组件库**: Ant Design 6
- **路由**: React Router DOM 7
- **状态管理**: Zustand 5（支持 persist 持久化）
- **HTTP 客户端**: Axios
- **Markdown 渲染**: react-markdown
- **样式**: CSS 文件（组件级）

### 后端
- **Java 后端** (未在本仓库): Spring Boot 3 + MyBatis-Plus + MySQL + Redis + MongoDB + MinIO + LangChain4j
- **Python 后端** (xiaoY-py): FastAPI + OpenAI SDK（面试题生成）
- **Mock 后端** (front_api): Express + CORS（开发调试）

## 开发指南

### 前端开发

```bash
cd xiaoy-ui

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

### Python 后端开发

```bash
cd xiaoY-py

# 安装依赖
pip install fastapi uvicorn openai

# 配置环境变量
export OPENAI_API_KEY="your-api-key"
export OPENAI_BASE_URL="your-base-url"  # 可选
export OPENAI_MODEL="gpt-4o-mini"        # 可选

# 启动服务
uvicorn app.main:app --reload
```

### Mock 后端开发

```bash
cd front_api

# 安装依赖
npm install

# 启动服务
npm run dev  # 使用 nodemon
npm start    # 直接运行
```

## 核心功能模块

### 1. 认证模块
- 用户注册/登录
- Token 认证（存储在 localStorage，自动附加到请求头）
- Zustand persist 持久化登录状态
- 用户类型区分（userType=0 为管理员）

### 2. AI 聊天模块
- 会话列表管理（创建、切换、删除）
- SSE 流式输出（实时渲染 AI 回复）
- Markdown 渲染（支持代码块、加粗等）
- 自动滚动到底部
- MongoDB 存储聊天历史

### 3. 校园内容模块
- 课程信息展示与评价
- 食堂地点与菜品信息
- 校车时刻表
- 生活服务信息

### 4. 后台管理模块
- 用户管理（增删改查）
- 课程管理
- 评论管理
- 地点管理
- 菜品管理
- 向量数据库管理（知识库）

### 5. 模拟面试模块
- 面试题生成（LLM + 规则双模式）
- 支持不同级别（junior/mid/senior）
- 知识点提取与问题生成

## API 接口规范

### 基础配置
- **Base URL**: `http://localhost:8080/xiaoY`
- **认证**: Authorization 请求头携带 token
- **超时**: 200 秒（支持长时 AI 请求）

### 主要接口

| 模块 | 接口 | 说明 |
|------|------|------|
| 用户 | POST /user/login | 登录 |
| 用户 | POST /user/register | 注册 |
| 用户 | GET /userinfo/{id} | 获取用户信息 |
| 聊天 | POST /chatmessagebyuser/streaming-chat | SSE 流式聊天 |
| 聊天 | GET /chatmessagebyuser/list | 会话列表 |
| 聊天 | GET /chatmessagebyuser/messages/{memoryId} | 消息历史 |
| 课程 | GET /course/list | 课程列表 |
| 评论 | POST /coursecomment/commit | 提交评论 |
| 食堂 | GET /canteenLocation/list | 地点列表 |
| 菜品 | GET /dish/list | 菜品列表 |
| 向量库 | GET /vectordb/namespaces | 命名空间列表 |
| 向量库 | POST /vectordb/record | 插入记录 |
| 向量库 | POST /vectordb/split-preview | 切割预览 |

## 路由配置

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页门户 |
| `/chat` | ChatPage | AI 聊天（需登录） |
| `/courses` | Courses | 课程列表 |
| `/life` | Life | 生活服务 |
| `/reviews` | Reviews | 课程评价 |
| `/reviews/info/:id?` | ReviewInfo | 评价详情 |
| `/canteen` | Canteen | 食堂信息 |
| `/bus` | SchoolBus | 校车信息 |
| `/userinfo` | UserInfoPage | 用户信息（需登录） |
| `/interview` | InterviewMock | 模拟面试 |
| `/admin/*` | Admin | 管理后台（需管理员） |
| `/aitest` | AiChat | AI 测试页 |

## 状态管理

### authStore（认证状态）
```typescript
interface AuthState {
  user: UserInfo | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user, token) => void
  logout: () => void
}
```

### appStore（应用状态）
```typescript
interface AppState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

## 编码规范

### 前端规范
- 组件文件使用 `index.tsx` 命名（文件夹结构）
- 类型定义集中在 `src/types/` 目录
- API 服务按模块拆分，统一从 `services/index.ts` 导出
- 使用 `@/` 路径别名引用 src 目录
- CSS 文件与组件同级放置

### TypeScript 类型
- 所有 API 响应使用 `ApiResponse<T>` 泛型包装
- 表单数据使用独立类型定义
- 组件 props 必须明确类型

### API 调用模式
```typescript
// 统一 http 实例
import http from '@/services/http'

// API 模块化导出
export const moduleApi = {
  getList: () => http.get<ApiResponse>('/module/list'),
  getItem: (id) => http.get<ApiResponse>(`/module/${id}`),
  create: (data) => http.post<ApiResponse>('/module', data),
}
```

## 注意事项

1. **流式请求**: 聊天页面使用原生 fetch + SSE，不通过 Axios
2. **认证拦截**: 未登录时聊天发送会被阻止
3. **管理员权限**: userType=0 可访问 `/admin` 后台
4. **环境区分**: http.ts 中 `preUrl` 可切换开发/生产环境
5. **Markdown 闭合**: 流式输出时自动闭合未完成的 Markdown 标记

## 相关文档

详细需求说明见 `科大小Y微信平台的设计与实现/` 目录：
- [项目概述](../科大小Y微信平台的设计与实现/1.科大小Y项目概述.md)
- [前端需求](../科大小Y微信平台的设计与实现/5.前端功能需求说明.md)
- [后端需求](../科大小Y微信平台的设计与实现/6.后端功能需求说明.md)