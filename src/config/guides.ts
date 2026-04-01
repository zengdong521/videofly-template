import type { Locale } from "@/config/i18n-config";

export type GuideSlug =
  | "how-to-write-better-ai-video-prompts"
  | "best-ai-video-workflow-for-product-launches"
  | "how-to-make-tiktok-style-ai-video-ads";

interface GuideSection {
  title: string;
  body: string;
}

interface GuideStep {
  title: string;
  description: string;
}

interface GuideFaq {
  question: string;
  answer: string;
}

interface LocalizedGuideCopy {
  title: string;
  description: string;
  excerpt: string;
  heroTitle: string;
  heroDescription: string;
  category: string;
  readTime: string;
  publishedAt: string;
  intro: string;
  sections: GuideSection[];
  stepsTitle: string;
  steps: GuideStep[];
  faqTitle: string;
  faqs: GuideFaq[];
  primaryCta: string;
  secondaryCta: string;
}

export interface GuideConfig {
  slug: GuideSlug;
  ogImage?: string;
  copy: Record<Locale, LocalizedGuideCopy>;
}

export const guideConfigs: Record<GuideSlug, GuideConfig> = {
  "how-to-write-better-ai-video-prompts": {
    slug: "how-to-write-better-ai-video-prompts",
    ogImage: "/og-home.jpg",
    copy: {
      en: {
        title: "How to Write Better AI Video Prompts",
        description:
          "Learn how to write better AI video prompts for text-to-video and image-to-video workflows, with practical structure, examples, and iteration tips.",
        excerpt:
          "A practical prompt writing guide for creators who want clearer motion, stronger visuals, and fewer wasted generations.",
        heroTitle: "How to write AI video prompts that generate better results",
        heroDescription:
          "Prompt quality is usually the difference between random output and usable video. This guide shows a practical structure you can reuse for almost any AI video workflow.",
        category: "Prompting",
        readTime: "7 min read",
        publishedAt: "2026-04-01",
        intro:
          "The easiest way to improve AI video output is to stop writing vague prompts. Good prompts are specific about subject, camera, movement, setting, and intent. The goal is not to make prompts longer. The goal is to make them clearer.",
        sections: [
          {
            title: "Start with the subject and action",
            body: "Begin with what the viewer should see and what is happening. If the subject or action is ambiguous, the model has to invent too much on its own, and quality drops fast.",
          },
          {
            title: "Add camera and scene detail",
            body: "Mention the shot type, movement, lighting, location, and mood. These details help the model compose the scene instead of guessing at your intent.",
          },
          {
            title: "Iterate one variable at a time",
            body: "When improving a prompt, change one thing at a time: camera movement, subject detail, or pacing. If you rewrite everything each round, you lose signal and make iteration harder.",
          },
        ],
        stepsTitle: "Prompt writing workflow",
        steps: [
          {
            title: "Define the core scene",
            description: "Write one sentence that names the subject, the main action, and the desired visual outcome.",
          },
          {
            title: "Add control details",
            description: "Specify framing, camera movement, lighting, environment, and style direction.",
          },
          {
            title: "Remove vague filler",
            description: "Delete words like amazing, beautiful, or cool unless they are supported by concrete visual detail.",
          },
          {
            title: "Regenerate with one change",
            description: "Tune the prompt by editing one dimension at a time so you can see what actually improved the result.",
          },
        ],
        faqTitle: "Prompt guide FAQ",
        faqs: [
          {
            question: "Should prompts be long or short?",
            answer: "They should be as short as possible but as specific as necessary. Specificity matters more than length.",
          },
          {
            question: "What details matter most?",
            answer: "Subject, action, camera, environment, lighting, and mood usually matter the most for usable first-pass output.",
          },
          {
            question: "How do I get more consistent results?",
            answer: "Keep the prompt structure stable and change one variable per iteration instead of rewriting everything from scratch.",
          },
        ],
        primaryCta: "Try Text to Video",
        secondaryCta: "Open Prompt Tool",
      },
      zh: {
        title: "如何写出更好的 AI 视频 Prompt",
        description:
          "学习如何为文生视频和图生视频写出更有效的 AI 视频 Prompt，包括结构、示例和更实用的迭代方法。",
        excerpt:
          "一份更偏实战的 prompt 写法指南，帮你减少无效生成，提升画面和运动表现。",
        heroTitle: "如何写出能明显提升结果的 AI 视频 Prompt",
        heroDescription:
          "很多时候，结果不好不是模型不行，而是 prompt 太模糊。这篇指南会给你一套能反复复用的写法框架。",
        category: "Prompt 写法",
        readTime: "7 分钟阅读",
        publishedAt: "2026-04-01",
        intro:
          "提升 AI 视频质量最快的方法，通常不是换模型，而是停止写模糊 prompt。好的 prompt 要把主体、动作、镜头、环境和意图说清楚。重点不是写得更长，而是写得更明确。",
        sections: [
          {
            title: "先写主体和动作",
            body: "开头先明确用户要看到什么、发生了什么。如果主体和动作不清楚，模型就只能自己猜，结果会很不稳定。",
          },
          {
            title: "补上镜头和场景细节",
            body: "加入镜头类型、运动方式、光线、地点和氛围，可以显著减少模型误解你的创作意图。",
          },
          {
            title: "每次只改一个变量",
            body: "优化 prompt 时，一次只改一个因素，比如镜头、主体细节或节奏。否则你很难知道到底是哪部分带来了改善。",
          },
        ],
        stepsTitle: "推荐的 prompt 工作流",
        steps: [
          {
            title: "定义核心场景",
            description: "先用一句话写清楚主体、动作和你想得到的画面结果。",
          },
          {
            title: "补充控制细节",
            description: "补上构图、镜头运动、光线、环境和风格方向。",
          },
          {
            title: "删掉空泛形容词",
            description: "像 amazing、beautiful 这类模糊词如果没有具体视觉信息支撑，通常价值不大。",
          },
          {
            title: "每轮只调一个点",
            description: "逐步修改，才能判断到底是什么因素真正提升了结果。",
          },
        ],
        faqTitle: "Prompt 指南常见问题",
        faqs: [
          {
            question: "Prompt 越长越好吗？",
            answer: "不一定。重点不是长，而是具体。能写清楚就好，避免空泛堆词。",
          },
          {
            question: "哪些细节最重要？",
            answer: "主体、动作、镜头、环境、光线和情绪氛围通常最关键。",
          },
          {
            question: "怎样提高结果一致性？",
            answer: "保持 prompt 结构稳定，每次只调整一个变量，不要整段重写。",
          },
        ],
        primaryCta: "试试文生视频",
        secondaryCta: "打开生成器",
      },
    },
  },
  "best-ai-video-workflow-for-product-launches": {
    slug: "best-ai-video-workflow-for-product-launches",
    ogImage: "/og-pricing.jpg",
    copy: {
      en: {
        title: "Best AI Video Workflow for Product Launches",
        description:
          "A practical AI video workflow for product launches, from concept ideation to polished clips for landing pages, social ads, and announcement campaigns.",
        excerpt:
          "A launch-focused workflow guide for teams making product videos, teasers, and ad variations with AI.",
        heroTitle: "A practical AI video workflow for product launches",
        heroDescription:
          "If your team is launching a product, the real challenge is not generating one clip. It is building a repeatable flow from idea to publishable assets.",
        category: "Workflow",
        readTime: "8 min read",
        publishedAt: "2026-04-01",
        intro:
          "Product launch teams usually need more than one video. They need hero visuals, social cuts, teaser variants, and quick revisions. A good AI workflow reduces the time between idea, approval, and shipping.",
        sections: [
          {
            title: "Separate ideation from production",
            body: "Use one phase to explore creative direction and another to produce cleaner execution. Mixing those two goals in one prompt loop usually wastes time.",
          },
          {
            title: "Build around asset reuse",
            body: "Start from one core message and adapt it into multiple formats for landing pages, social posts, and launch teasers.",
          },
          {
            title: "Treat revisions like a system",
            body: "Document what changed between versions so the team can repeat what worked and stop randomizing the creative process.",
          },
        ],
        stepsTitle: "Launch workflow",
        steps: [
          {
            title: "Define the launch message",
            description: "Lock the product angle, audience, and one-sentence promise before generating anything.",
          },
          {
            title: "Explore 3 to 5 visual directions",
            description: "Create a small batch of different concepts first instead of polishing the first idea immediately.",
          },
          {
            title: "Choose one direction and expand it",
            description: "Turn the winning concept into landing page clips, teaser variants, and ad-sized cuts.",
          },
          {
            title: "Review and publish by channel",
            description: "Match each final asset to its use case: homepage hero, product ad, launch teaser, or social follow-up.",
          },
        ],
        faqTitle: "Launch workflow FAQ",
        faqs: [
          {
            question: "Should I start with text-to-video or image-to-video?",
            answer: "Start with text-to-video for ideation. Move to image-to-video when you want stronger control over composition and brand consistency.",
          },
          {
            question: "How many launch variants do I need?",
            answer: "Most teams benefit from one hero concept and two to four supporting variations for channel-specific usage.",
          },
          {
            question: "What usually slows teams down?",
            answer: "Trying to perfect the first draft too early. Speed comes from exploring broadly first and polishing only after a direction wins.",
          },
        ],
        primaryCta: "Start a Launch Video",
        secondaryCta: "Compare Model Options",
      },
      zh: {
        title: "产品发布最适合的 AI 视频工作流",
        description:
          "一套更适合产品发布场景的 AI 视频工作流，从创意探索到可发布成片，覆盖落地页、社媒广告和发布预热内容。",
        excerpt:
          "面向产品发布团队的 AI 视频流程指南，帮你更高效地产出 teaser、广告和发布内容。",
        heroTitle: "一套更适合产品发布的 AI 视频工作流",
        heroDescription:
          "产品发布真正难的不是生成一条视频，而是搭建一套可重复的流程，让创意、评审和发布更顺。",
        category: "工作流",
        readTime: "8 分钟阅读",
        publishedAt: "2026-04-01",
        intro:
          "发布团队通常不会只需要一条视频，而是需要首页主视觉、预热视频、社媒短片和多个变体版本。一套好的 AI 工作流可以显著缩短从想法到上线之间的时间。",
        sections: [
          {
            title: "把创意探索和成片生产分开",
            body: "先做方向探索，再做成片打磨。把这两件事混在同一轮生成里，通常会浪费很多时间。",
          },
          {
            title: "围绕素材复用来设计流程",
            body: "从一个核心信息出发，拆成首页视频、广告短片、预告 clip 和社媒版本，会比每个渠道单独重做更高效。",
          },
          {
            title: "把修改过程流程化",
            body: "记录每个版本改了什么，团队才能复用有效做法，而不是每次都从零试错。",
          },
        ],
        stepsTitle: "发布工作流",
        steps: [
          {
            title: "先定发布信息",
            description: "先锁定产品亮点、目标用户和一句话价值主张，再开始生成。",
          },
          {
            title: "先做 3 到 5 个方向探索",
            description: "不要一上来就打磨第一条，先做小批量方向测试更有效。",
          },
          {
            title: "选出最强方向再扩展",
            description: "把胜出的创意扩展成首页视频、预告版和广告版。",
          },
          {
            title: "按渠道完成发布",
            description: "让每一条成片都有明确用途：首页、广告、预热视频或社媒跟进内容。",
          },
        ],
        faqTitle: "发布工作流常见问题",
        faqs: [
          {
            question: "应该先用文生视频还是图生视频？",
            answer: "前期找方向时先用文生视频；当你需要更强构图控制和品牌一致性时，再切到图生视频。",
          },
          {
            question: "发布需要准备多少个变体？",
            answer: "大多数团队至少需要 1 个主版本，再加 2 到 4 个适配不同渠道的变体。",
          },
          {
            question: "团队最容易卡在哪里？",
            answer: "最常见的问题是太早追求完美。先广泛探索，再集中打磨，通常更快。",
          },
        ],
        primaryCta: "开始做发布视频",
        secondaryCta: "查看模型对比",
      },
    },
  },
  "how-to-make-tiktok-style-ai-video-ads": {
    slug: "how-to-make-tiktok-style-ai-video-ads",
    ogImage: "/og-text-to-video.jpg",
    copy: {
      en: {
        title: "How to Make TikTok-Style AI Video Ads",
        description:
          "Learn how to make TikTok-style AI video ads with stronger hooks, faster variation testing, and short-form creative workflows that fit paid social.",
        excerpt:
          "A practical guide to creating AI video ads that feel native to short-form feeds instead of looking like generic promos.",
        heroTitle: "How to make TikTok-style AI video ads that feel native",
        heroDescription:
          "The best short-form ads do not look like polished TV spots. They look immediate, focused, and built around a strong hook. This guide shows how to get there with AI video tools.",
        category: "Ads",
        readTime: "6 min read",
        publishedAt: "2026-04-01",
        intro:
          "Short-form ad performance usually depends on the first few seconds. AI video works best here when you optimize for hook clarity, visual momentum, and fast variant testing instead of perfect polish.",
        sections: [
          {
            title: "Write the hook before the scene",
            body: "Decide what stops the scroll first. A surprising motion, a bold product claim, or a clear visual transformation is usually stronger than a generic beauty shot.",
          },
          {
            title: "Design for variation, not one perfect cut",
            body: "Short-form winners often come from testing multiple opening angles. AI is most useful when it helps you produce many strong first-three-second variants quickly.",
          },
          {
            title: "Keep the edit readable",
            body: "The strongest TikTok-style ads are visually simple. Too many elements, camera moves, or ideas in one clip usually hurt performance.",
          },
        ],
        stepsTitle: "TikTok-style ad workflow",
        steps: [
          {
            title: "Choose a single hook angle",
            description: "Focus on one promise, problem, or transformation per clip.",
          },
          {
            title: "Generate 3 to 5 opening variations",
            description: "Test different first moments instead of testing only different endings.",
          },
          {
            title: "Keep the body simple",
            description: "Once the hook lands, keep the middle of the clip readable and aligned to one message.",
          },
          {
            title: "Review performance and regenerate",
            description: "Use the winning hooks as the basis for your next round of ad variations.",
          },
        ],
        faqTitle: "Short-form ad FAQ",
        faqs: [
          {
            question: "Should AI ads look polished?",
            answer: "Not always. For short-form ads, native and immediate often outperform overly polished creative.",
          },
          {
            question: "What should I test first?",
            answer: "Test the opening hook first. The first few seconds usually matter more than the ending in short-form ad performance.",
          },
          {
            question: "Which workflow helps most?",
            answer: "A workflow built around fast concept iteration and multiple opening variants usually performs best.",
          },
        ],
        primaryCta: "Create an Ad Video",
        secondaryCta: "Read Model Comparisons",
      },
      zh: {
        title: "如何制作 TikTok 风格的 AI 视频广告",
        description:
          "学习如何制作更像 TikTok 原生内容的 AI 视频广告，包括 hook 设计、变体测试和更适合短视频投放的工作流。",
        excerpt:
          "一份更偏实战的 AI 广告创作指南，帮助你做出更适合短视频信息流的内容，而不是传统宣传片。",
        heroTitle: "如何做出更像 TikTok 原生内容的 AI 视频广告",
        heroDescription:
          "好的短视频广告不一定像精致宣传片，反而更像抓人、直接、节奏快的原生内容。这篇指南会带你按这个方向来做。",
        category: "广告",
        readTime: "6 分钟阅读",
        publishedAt: "2026-04-01",
        intro:
          "短视频广告效果通常取决于前几秒。AI 视频最适合的用法，不是一次打磨出完美成片，而是快速测试多个 hook 和开头版本。",
        sections: [
          {
            title: "先写 hook，再写场景",
            body: "先想清楚什么能让用户停下来。是夸张动作、强对比结果，还是一句很直接的产品价值点。",
          },
          {
            title: "围绕变体测试设计内容",
            body: "短视频广告最常赢的不是第一条，而是多轮测试后的版本。AI 最大的价值就在于能快速做出多个强开头。",
          },
          {
            title: "让画面保持可读性",
            body: "最有效的短视频广告通常并不复杂。信息太多、镜头太乱，反而会拉低表现。",
          },
        ],
        stepsTitle: "TikTok 风格广告工作流",
        steps: [
          {
            title: "先确定一个 hook 角度",
            description: "一条视频只讲一个利益点、一个问题或一个转变。",
          },
          {
            title: "先生成 3 到 5 个开头版本",
            description: "优先测试前几秒，而不是只测试结尾变化。",
          },
          {
            title: "正文保持简单",
            description: "hook 抓住后，中段只服务一个核心信息，避免过载。",
          },
          {
            title: "看结果再继续生成",
            description: "把表现最好的开头拿去做下一轮扩展和投放版本。",
          },
        ],
        faqTitle: "短视频广告常见问题",
        faqs: [
          {
            question: "AI 广告一定要很精致吗？",
            answer: "不一定。对短视频广告来说，原生感和即时感很多时候比过度精致更重要。",
          },
          {
            question: "最应该先测什么？",
            answer: "先测开头 hook。短视频广告里，前几秒通常比结尾更重要。",
          },
          {
            question: "什么样的工作流最有效？",
            answer: "围绕快速试方向和多开头变体来组织工作流，通常效果最好。",
          },
        ],
        primaryCta: "开始做广告视频",
        secondaryCta: "查看模型对比",
      },
    },
  },
};

export function getGuideConfig(slug: GuideSlug) {
  return guideConfigs[slug];
}

export function getGuideEntries() {
  return Object.values(guideConfigs);
}
