# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## 常用命令（pnpm）

- 开发：`pnpm dev`
- 构建：`pnpm build`
- 启动：`pnpm start`
- 代码检查：`pnpm lint`
- 格式化：`pnpm format`
- 类型检查：`pnpm typecheck`

### 数据库（Drizzle）

- 生成迁移：`pnpm db:generate`
- 运行迁移：`pnpm db:migrate`
- 推送 schema（开发用）：`pnpm db:push`
- 打开 Drizzle Studio：`pnpm db:studio`

### 邮件预览

- React Email 预览：`pnpm email`（端口 3333）

### 积分脚本（需 .env.local）

- 增加积分：`pnpm script:add-credits <email> <credits> [reason]`
- 查询积分：`pnpm script:check-credits <email>`
- 重置积分：`pnpm script:reset-credits <email> --confirm`

> 管理员快捷方式：在 `.env.local` 设置 `ADMIN_EMAIL`，该邮箱登录后自动成为管理员。

### 其他脚本

- 代理测试：`pnpm script:test-proxy`

## 架构与关键流转

- **Next.js 15 App Router**：路由在 `src/app/`，国际化路由前缀 `[locale]`；按营销/工具/仪表盘/认证/admin 分组。
- **AI Provider 抽象层**：`src/ai/` 统一封装多供应商（evolink、kie）。`src/ai/index.ts` 负责 provider 工厂与注册。
- **视频生成主流程**：
  1) 前端调用 `/api/v1/video/generate` -> `src/services/video.ts` 创建任务
  2) 冻结积分（`src/services/credit.ts`）
  3) Provider 生成异步任务
  4) 回调 `/api/v1/video/callback/[provider]` 完成后下载并上传到存储（`src/lib/storage.ts`），结算积分
- **积分系统**：FIFO 包消耗，冻结/结算/释放逻辑集中在 `src/services/credit.ts`，定价与模型积分在 `src/config/credits.ts` 与 `src/config/pricing-user.ts`。
- **支付**：Creem 为主（Better Auth 插件），Stripe 作为备用；Creem webhook 入口在 `/api/auth/creem/webhook`。
- **认证**：Better Auth（Google OAuth + Magic Link）配置在 `src/lib/auth/`。
- **存储**：R2/S3 兼容，上传/下载在 `src/lib/storage.ts`。

## 重要文档入口

- 文档索引：`docs/README.md`
- 配置总览：`docs/CONFIGURATION_GUIDE.md`
- 定价与积分参考：`docs/spec/PRICING_REFERENCE.md`、`docs/spec/CREDIT_CALCULATOR.md`
- Provider 集成说明：`docs/spec/AI_PROVIDER_INTEGRATION.md`
