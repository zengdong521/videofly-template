# Creem 合规整改文档

**整改日期：** 2026年3月31日
**整改依据：** Creem Merchant of Record Account Reviews - Content Safety & Marketing Transparency Requirements

---

## 整改项目汇总

### 1. Wan 模型移除 ✅

**问题：** Creem 将 Wan（阿里巴巴）列为禁止的 AI 模型

**整改内容：**
- 从导航菜单移除 Wan 2.6 选项
- 从视频筛选器移除 Wan 2.6 选项
- 从工具面板描述中移除 Wan 提及
- 从模型比较页面配置中移除 Wan
- 从首页元数据描述中移除 Wan
- 已在 pricing-user.ts 中将 wan2.6.enabled 设置为 false

**修改文件：**
- `src/config/navigation.ts` - 移除 headerModels 中的 Wan 2.6
- `src/components/creation/creation-filter.tsx` - 移除 wan-2-6 筛选选项
- `src/components/tool/content-panel.tsx` - 更新 AI 模型列表描述
- `src/app/[locale]/(marketing)/sora-2/page.tsx` - 移除 wan-2-6 配置
- `src/app/[locale]/(marketing)/page.tsx` - 更新元数据描述
- `src/config/pricing-user.ts` - wan2.6.enabled = false（已确认）

---

### 2. 不可核实数据删除 ✅

**问题：** 网站声称"数千名创作者正在使用 VideoAI"，无法核实

**整改内容：**
- 修改 CTA 文案，移除具体数字

**修改文件：**
- `src/messages/zh.json` - "加入数千名正在使用 VideoAI 的创作者" → "加入正在使用 VideoAI 的创作者"
- `src/messages/en.json` - "Join thousands of creators already using VideoAI" → "Join creators using VideoAI"

---

### 3. 服务条款内容安全规定 ✅

**问题：** 服务条款未明确禁止生成不适宜工作场所观看或露骨的性内容

**整改内容：**
- 在服务条款第 4 条后新增 4.1 "内容安全与适度性" 条款
- 明确禁止露骨性内容、不适宜工作场所内容、暴力内容、未成年人相关内容、骚扰和仇恨内容
- 说明违规将导致账户终止且积分不予退还

**修改文件：**
- `src/app/[locale]/(marketing)/terms/page.tsx`
  - 中文版：新增第 4.1 条款
  - 英文版：新增 Section 4.1 Content Safety and Appropriateness

---

### 4. 第三方 AI 模型免责声明 ✅

**问题：** 使用第三方 AI 模型（Sora 2、Veo 3.1、Seedance）但未声明与提供商无关联

**整改内容：**
- 创建独立的 AI Disclaimer 页面
- 在 Footer 法律链接中添加 "AI Disclaimer" 入口
- 在 Footer 底部添加简短的免责声明文字
- 完整免责声明页面包含：
  - 列出所有第三方 AI 模型提供商（OpenAI Sora、Google Veo、ByteDance Seedance）
  - 明确声明无关联/合作关系
  - 责任限制声明
  - 内容安全提示

**新增文件：**
- `src/app/[locale]/(marketing)/ai-disclaimer/page.tsx` - AI 免责声明页面

**修改文件：**
- `src/components/landing/footer.tsx`
  - 在法律链接中添加 "AI Disclaimer"
  - 在底部添加简短免责声明文字和链接

---

## 待验证事项

1. [ ] 确认 Wan 模型已完全从前端界面移除
2. [ ] 确认新的文案已正确显示
3. [ ] 确认服务条款更新已生效
4. [ ] 确认 AI Disclaimer 页面可访问
5. [ ] 在 Creem 后台提交整改证据

---

## 整改后需提交 Creem 的证据

### 1. Wan 模型移除证据
- 导航菜单截图（不显示 Wan 2.6）
- 模型选择器截图（不显示 Wan 2.6）
- pricing-user.ts 中 wan2.6.enabled = false 的配置截图

### 2. 不可核实数据删除证据
- 首页 CTA 文案截图

### 3. 服务条款更新证据
- 服务条款页面截图，显示新增的 4.1 条款

### 4. AI 免责声明证据
- AI Disclaimer 页面完整截图
- Footer 显示免责声明的截图

---

## 联系方式

如有疑问，请联系：support@donney.pro
