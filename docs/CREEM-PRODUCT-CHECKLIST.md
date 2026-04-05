# VideoFly Creem 产品创建清单

## 需要在 Creem 创建的产品

### 月付订阅

#### 1. Basic Plan (Monthly)
- 产品类型: Subscription
- 产品名称: Basic Plan
- 描述: 280 credits/month - For beginners and individuals
- 价格: $9.90 USD
- 计费周期: Monthly
- 元数据: credits="280", features="hd_videos,fast_generation"
- [ ] 已创建 Product ID: prod_6dT3pS9ofezytqWrVlxcXc

#### 2. Pro Plan (Monthly)
- 产品类型: Subscription
- 产品名称: Pro Plan
- 描述: 960 credits/month - Recommended for professionals and creators
- 价格: $29.90 USD
- 计费周期: Monthly
- 元数据: credits="960", features="hd_videos,fast_generation,no_watermark,commercial_use"
- [ ] 已创建 Product ID: prod_6EdxZIuzxX9ku8B01wTiTh

#### 3. Ultimate Plan (Monthly)
- 产品类型: Subscription
- 产品名称: Ultimate Plan
- 描述: 2,850 credits/month - For teams and enterprises
- 价格: $79.90 USD
- 计费周期: Monthly
- 元数据: credits="2850", features="hd_videos,fast_generation,no_watermark,commercial_use,priority_support,api_access"
- [ ] 已创建 Product ID: prod_67SR1dICGjxbmWRct7k2eQ

### 年付订阅

#### 4. Basic Plan (Yearly)
- 产品类型: Subscription
- 产品名称: Basic Plan (Yearly)
- 描述: 3,360 credits/year - For beginners and individuals
- 价格: $99.00 USD
- 计费周期: Yearly
- 元数据: credits="3360", features="hd_videos,fast_generation"
- [ ] 已创建 Product ID: prod_kPUtukqH32u5qQh8t2jxQ

#### 5. Pro Plan (Yearly)
- 产品类型: Subscription
- 产品名称: Pro Plan (Yearly)
- 描述: 11,520 credits/year - Recommended for professionals and creators
- 价格: $299.00 USD
- 计费周期: Yearly
- 元数据: credits="11520", features="hd_videos,fast_generation,no_watermark,commercial_use"
- [ ] 已创建 Product ID: prod_WjGEFlsYqXmsAUfHghvWt

#### 6. Ultimate Plan (Yearly)
- 产品类型: Subscription
- 产品名称: Ultimate Plan (Yearly)
- 描述: 34,200 credits/year - For teams and enterprises
- 价格: $799.00 USD
- 计费周期: Yearly
- 元数据: credits="34200", features="hd_videos,fast_generation,no_watermark,commercial_use,priority_support,api_access"
- [ ] 已创建 Product ID: prod_5CL0DyLvpKGA1ILQPicOLI
### 积分包

#### 7. Starter Pack
- 产品类型: One-time purchase
- 产品名称: Starter Pack
- 描述: 280 credits - Perfect for trying out
- 价格: $14.90 USD
- 计费周期: None (one-time)
- 元数据: credits="280", features="hd_videos,fast_generation"
- [ ] 已创建 Product ID: prod_4IGnDZvEVTwD4nX1ijB1H5

#### 8. Standard Pack
- 产品类型: One-time purchase
- 产品名称: Standard Pack
- 描述: 960 credits - Best value for subscribers
- 价格: $39.90 USD
- 计费周期: None (one-time)
- 元数据: credits="960", features="hd_videos,fast_generation,no_watermark"
- [ ] 已创建 Product ID: prod_2X64gij8JDxonuo4ZBBRvd
#### 9. Pro Pack
- 产品类型: One-time purchase
- 产品名称: Pro Pack
- 描述: 2,850 credits - For power users
- 价格: $99.90 USD
- 计费周期: None (one-time)
- 元数据: credits="2850", features="hd_videos,fast_generation,no_watermark,commercial_use"
- [ ] 已创建 Product ID: prod_7XMaQ2o9WmA8LztuZ0whOt

---

## 回填 Product ID

创建完所有产品后，将 Product ID 填入 `src/config/pricing-user.ts`：

1. 打开 `src/config/pricing-user.ts`
2. 找到对应产品，将 `id` 字段替换为 Creem 的 Product ID

当前 ID 占位符对照：
- Basic Monthly: `prod_jsRIeZmqn3L9NN2fiFIn6`
- Pro Monthly: `prod_3tlZPSRNHZSaNq21zX2Z16`
- Ultimate Monthly: `prod_3tlZPSRNHZSaNq22zX2Z18`
- Basic Yearly: `prod_3tlZPSRNHZSaNq22zX2Z10`
- Pro Yearly: `prod_3tlZPSRNHZSaNq22zX2Z55`
- Ultimate Yearly: `prod_3tlZPSRNHZSaNq22zX2Z21`
- Starter Pack: `prod_3tlZPSRNHZSaNq21zX2ZPO`
- Standard Pack: `prod_3tlZPSRNHZSaNq22zX2Z12`
- Pro Pack: `prod_3tlZPSRNHZSaNq22zX2Z13`

---

## Webhook 配置

1. Creem Dashboard -> Webhooks -> Add Webhook
2. URL: `{NEXT_PUBLIC_APP_URL}/api/auth/creem/webhook`
3. Events: `checkout.completed`, `subscription.created`, `subscription.updated`, `subscription.cancelled`, `subscription.expired`
4. 复制 Secret 到 `.env.local` 的 `CREEM_WEBHOOK_SECRET`

---

## 验证清单

- [ ] 所有 9 个产品已在 Creem 创建
- [ ] Product ID 已回填到 pricing-user.ts
- [ ] CREEM_API_KEY 已配置在 .env.local
- [ ] CREEM_WEBHOOK_SECRET 已配置在 .env.local
- [ ] `pnpm dev` 启动后 /pricing 页面显示正确
- [ ] 价格、积分、折扣数字在页面上展示正确
- [ ] FAQ 中的数字与实际配置一致
- [ ] 测试环境支付流程正常
