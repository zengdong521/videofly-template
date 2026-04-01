import type { Locale } from "@/config/i18n-config";

export type ModelPageSlug = "sora-2" | "veo-3-1" | "seedance-1-5";

interface LocalizedModelCopy {
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  intro: string;
  strengthsTitle: string;
  strengths: string[];
  useCasesTitle: string;
  useCases: string[];
  workflowTitle: string;
  workflowSteps: string[];
  comparisonTitle: string;
  comparisonBody: string;
  faqTitle: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  primaryCta: string;
  secondaryCta: string;
}

export interface ModelPageConfig {
  slug: ModelPageSlug;
  modelName: string;
  provider: string;
  ogImage?: string;
  copy: Record<Locale, LocalizedModelCopy>;
}

export const modelPageConfigs: Record<ModelPageSlug, ModelPageConfig> = {
  "sora-2": {
    slug: "sora-2",
    modelName: "Sora 2",
    provider: "OpenAI",
    ogImage: "/og-home.jpg",
    copy: {
      en: {
        title: "Sora 2 AI Video Generator",
        description:
          "Create cinematic AI videos inspired by Sora 2 workflows. Turn prompts, images, and concepts into polished short-form video inside VideoAI.",
        heroTitle: "Sora 2 AI video generation, ready for production workflows",
        heroDescription:
          "Use VideoAI to turn concepts into cinematic clips with prompt-driven generation, rapid iteration, and export-ready output built for creators and marketers.",
        intro:
          "This page is designed for people researching Sora 2 style workflows before choosing a production tool. Instead of a thin placeholder, it explains what the model is useful for, where it performs best, and how to move from idea to usable video inside VideoAI.",
        strengthsTitle: "Why creators look for Sora 2 workflows",
        strengths: [
          "Strong prompt-to-scene imagination for concept-driven visuals",
          "Useful for storyboards, teaser clips, and mood-driven short videos",
          "Fast iteration loop when you need to refine camera motion or composition",
          "Good fit for teams validating creative direction before full production",
        ],
        useCasesTitle: "Best use cases",
        useCases: [
          "Launch teasers and product reveal clips",
          "Concept trailers for apps, games, and creative campaigns",
          "Stylized social videos for TikTok, Reels, and Shorts",
          "Visual prototypes for agencies and in-house brand teams",
        ],
        workflowTitle: "Typical workflow in VideoAI",
        workflowSteps: [
          "Start with a text prompt that describes subject, camera movement, lighting, and mood",
          "Regenerate quickly to explore alternate motion, framing, and pacing",
          "Switch to image-to-video when you want tighter control over starting composition",
          "Export the best result for editing, posting, or stakeholder review",
        ],
        comparisonTitle: "When to choose Sora 2 style generation",
        comparisonBody:
          "Sora 2 style workflows are a strong fit when you want cinematic imagination first and exact control second. If your priority is visual ideation, storytelling, and concept exploration, this model family is usually the right place to start.",
        faqTitle: "Sora 2 FAQ",
        faqs: [
          {
            question: "What is Sora 2 best for?",
            answer:
              "It is best for cinematic concept videos, story-first motion, and prompt-led creative exploration where you want the model to contribute visual imagination.",
          },
          {
            question: "Can I use Sora 2 style workflows for marketing videos?",
            answer:
              "Yes. It works well for teasers, ad concepts, launch assets, and social video experiments, especially in early creative iterations.",
          },
          {
            question: "When should I use image-to-video instead of text-to-video?",
            answer:
              "Use image-to-video when composition matters more than ideation. It helps anchor the first frame and gives you tighter control over subject layout and art direction.",
          },
        ],
        primaryCta: "Try Text to Video",
        secondaryCta: "Try Image to Video",
      },
      zh: {
        title: "Sora 2 AI 视频生成器",
        description:
          "体验接近 Sora 2 工作流的 AI 视频生成方式，在 VideoAI 中将文字、图片和创意快速转成高质量短视频。",
        heroTitle: "面向真实创作流程的 Sora 2 风格视频生成",
        heroDescription:
          "通过 VideoAI 把创意脚本转成更具电影感的短片，用更快的迭代速度完成营销视频、创意概念片和社媒内容制作。",
        intro:
          "这个页面面向正在研究 Sora 2 类能力的用户，不再只是占位页，而是明确说明这种模型适合什么、强在哪、以及在 VideoAI 里应该怎么实际使用。",
        strengthsTitle: "为什么大家会搜索 Sora 2",
        strengths: [
          "更适合以创意和氛围为先的文本生成视频场景",
          "适合做故事感强、镜头感明显的短片和预告片",
          "便于快速多轮试错，探索不同镜头运动和构图",
          "很适合在正式拍摄前验证创意方向",
        ],
        useCasesTitle: "适合的场景",
        useCases: [
          "新品发布预告和品牌 teaser",
          "App、游戏、创意项目的概念短片",
          "适合 TikTok、Reels、Shorts 的风格化内容",
          "广告公司和品牌团队的前期视觉提案",
        ],
        workflowTitle: "在 VideoAI 中的典型用法",
        workflowSteps: [
          "先用文字描述主体、镜头运动、光线和情绪氛围",
          "快速重复生成，比较不同运动和画面节奏",
          "如果你更在意首帧构图，再切到图生视频获得更强控制",
          "挑出最好的一版导出，用于剪辑、发布或内部评审",
        ],
        comparisonTitle: "什么时候更适合选择 Sora 2 风格",
        comparisonBody:
          "如果你更看重灵感表达、电影感和叙事氛围，而不是逐像素控制，那么 Sora 2 风格工作流通常更适合拿来做创意探索和概念验证。",
        faqTitle: "Sora 2 常见问题",
        faqs: [
          {
            question: "Sora 2 最适合什么内容？",
            answer:
              "它更适合电影感概念视频、故事型短片，以及需要模型参与创意表达的文本生成视频场景。",
          },
          {
            question: "能不能拿来做营销视频？",
            answer:
              "可以，尤其适合 teaser、广告创意草案、活动预热视频，以及社媒短视频的前期探索。",
          },
          {
            question: "什么时候该用图生视频而不是文生视频？",
            answer:
              "当你对构图、主体位置或品牌视觉一致性要求更高时，图生视频通常更稳，因为可以先锁定起始画面。",
          },
        ],
        primaryCta: "试试文生视频",
        secondaryCta: "试试图生视频",
      },
    },
  },
  "veo-3-1": {
    slug: "veo-3-1",
    modelName: "Veo 3.1",
    provider: "Google DeepMind",
    ogImage: "/og-home.jpg",
    copy: {
      en: {
        title: "Veo 3.1 AI Video Generator",
        description:
          "Explore Veo 3.1 style AI video generation for polished motion, realistic scenes, and creator-friendly workflows powered through VideoAI.",
        heroTitle: "Veo 3.1 style video generation for cleaner, more controllable motion",
        heroDescription:
          "Generate realistic clips, test multiple visual directions, and move from prompt to usable output without wrestling with a complex production stack.",
        intro:
          "People searching for Veo 3.1 usually care about quality, motion consistency, and practical output for real publishing workflows. This page focuses on those needs and shows how to use VideoAI to get there faster.",
        strengthsTitle: "Where Veo 3.1 style workflows stand out",
        strengths: [
          "Strong fit for realistic motion and physically plausible scenes",
          "Useful when you want cleaner output for product or brand storytelling",
          "Works well for iterative prompt testing across multiple visual directions",
          "Helpful for creators who want speed without giving up quality signals",
        ],
        useCasesTitle: "Best use cases",
        useCases: [
          "Product explainer clips and feature showcases",
          "Brand videos with realistic scenes and camera movement",
          "Short paid social assets for performance marketing",
          "Creative tests for landing pages and app launches",
        ],
        workflowTitle: "Typical workflow in VideoAI",
        workflowSteps: [
          "Write a prompt with subject, setting, lens feel, and motion intent",
          "Tune outputs by narrowing framing, pacing, and environmental detail",
          "Use image-to-video when you need stronger art direction control",
          "Select the best take and ship it into your editing or publishing flow",
        ],
        comparisonTitle: "When Veo 3.1 style generation is the better choice",
        comparisonBody:
          "Choose this model direction when realism, cleaner motion, and dependable output matter more than highly stylized imagination. It is often the stronger option for marketing and product storytelling.",
        faqTitle: "Veo 3.1 FAQ",
        faqs: [
          {
            question: "What is Veo 3.1 best for?",
            answer:
              "It is a good fit for realistic brand videos, product motion, and creator workflows that need polished clips quickly.",
          },
          {
            question: "Is Veo 3.1 style output useful for paid ads?",
            answer:
              "Yes. It is especially useful for short ad creatives where realism, clarity, and movement quality matter.",
          },
          {
            question: "How do I get more consistent results?",
            answer:
              "Be explicit about subject, environment, movement, and shot framing. When consistency matters, start from an image or reference instead of prompting from scratch.",
          },
        ],
        primaryCta: "Generate with Text",
        secondaryCta: "Animate an Image",
      },
      zh: {
        title: "Veo 3.1 AI 视频生成器",
        description:
          "体验接近 Veo 3.1 风格的 AI 视频生成能力，获得更真实的运动表现、更稳的画面质量和更适合创作者的工作流。",
        heroTitle: "更注重真实感和可控性的 Veo 3.1 风格视频生成",
        heroDescription:
          "在 VideoAI 中快速生成更自然的镜头运动与场景表现，适合品牌内容、产品展示和广告素材生产。",
        intro:
          "搜索 Veo 3.1 的用户通常更关心输出质量、运动一致性和能否直接用于真实发布场景。这个页面就是围绕这些实际需求来组织内容的。",
        strengthsTitle: "Veo 3.1 风格的优势",
        strengths: [
          "更适合强调真实运动和场景可信度的视频生成",
          "适合产品展示和品牌叙事类内容",
          "方便多方向快速试稿，比较不同视觉方案",
          "适合想要兼顾速度与质量的创作者团队",
        ],
        useCasesTitle: "适合的场景",
        useCases: [
          "产品介绍和功能展示短片",
          "更真实风格的品牌视频",
          "投放广告用的短视频素材",
          "落地页和应用发布前的创意测试内容",
        ],
        workflowTitle: "在 VideoAI 中的典型流程",
        workflowSteps: [
          "先写清主体、场景、镜头感和运动方向",
          "通过缩小构图和环境描述来逐步提纯结果",
          "如果需要更强视觉控制，就切到图生视频",
          "选出最佳版本后直接进入剪辑或发布流程",
        ],
        comparisonTitle: "什么时候更适合用 Veo 3.1 风格",
        comparisonBody:
          "如果你更在意真实感、运动干净度和结果稳定性，而不是过度风格化的想象力表达，那么 Veo 3.1 风格通常更适合营销和产品类内容。",
        faqTitle: "Veo 3.1 常见问题",
        faqs: [
          {
            question: "Veo 3.1 最适合做什么？",
            answer:
              "它更适合真实感更强的品牌视频、产品动态展示，以及对输出稳定性要求较高的创作场景。",
          },
          {
            question: "适合做广告素材吗？",
            answer:
              "适合，特别是信息表达清楚、需要真实感和画面稳定度的广告短视频。",
          },
          {
            question: "怎样提高结果一致性？",
            answer:
              "尽量把主体、环境、运动和镜头构图描述清楚；如果要更稳，优先用图片或参考素材作为起点。",
          },
        ],
        primaryCta: "开始文生视频",
        secondaryCta: "开始图生视频",
      },
    },
  },
  "seedance-1-5": {
    slug: "seedance-1-5",
    modelName: "Seedance 1.5",
    provider: "ByteDance",
    ogImage: "/og-home.jpg",
    copy: {
      en: {
        title: "Seedance 1.5 AI Video Generator",
        description:
          "Discover Seedance 1.5 style AI video generation for social-native clips, fast experimentation, and efficient creator workflows inside VideoAI.",
        heroTitle: "Seedance 1.5 style generation for fast-moving social video teams",
        heroDescription:
          "Build scroll-stopping short videos, iterate on hooks quickly, and turn creative ideas into social-ready motion with less friction.",
        intro:
          "Seedance 1.5 style workflows are especially relevant when speed, experimentation, and short-form output matter. This page gives the model keyword a real landing page with practical context instead of a placeholder.",
        strengthsTitle: "Why teams look at Seedance 1.5 style workflows",
        strengths: [
          "Good fit for social-first short-form video production",
          "Fast experimentation for hooks, pacing, and attention-grabbing openings",
          "Useful for creator teams producing multiple variants per campaign",
          "Efficient for testing visual directions before scaling production",
        ],
        useCasesTitle: "Best use cases",
        useCases: [
          "TikTok and Reels creative batches",
          "Organic social content for creator-led brands",
          "Short launch clips and product hooks",
          "Variant testing for retention-focused intros",
        ],
        workflowTitle: "Typical workflow in VideoAI",
        workflowSteps: [
          "Start with a concise prompt centered on the first three seconds of impact",
          "Generate multiple variations to test pacing and visual hooks",
          "Move to image-to-video when a brand visual or product shot must stay consistent",
          "Choose the strongest clip and repurpose it across short-form channels",
        ],
        comparisonTitle: "When Seedance 1.5 style generation is a smart choice",
        comparisonBody:
          "Choose this direction when you care about speed, variation volume, and social-native creativity. It is especially effective for short-form teams optimizing for attention and iteration velocity.",
        faqTitle: "Seedance 1.5 FAQ",
        faqs: [
          {
            question: "What is Seedance 1.5 best for?",
            answer:
              "It is best for social video experimentation, creator workflows, and short clips where you want multiple strong variants quickly.",
          },
          {
            question: "Is it useful for teams making lots of ad variants?",
            answer:
              "Yes. Its value is highest when you are testing multiple hooks, formats, or angles across the same campaign.",
          },
          {
            question: "How should I prompt it for better short-form results?",
            answer:
              "Focus on the opening moment, the core visual action, and the feeling you want in the first few seconds. Short-form performance often starts with a clear hook.",
          },
        ],
        primaryCta: "Start Text to Video",
        secondaryCta: "Start Image to Video",
      },
      zh: {
        title: "Seedance 1.5 AI 视频生成器",
        description:
          "体验接近 Seedance 1.5 风格的 AI 视频生成能力，更适合社媒短视频、高频试稿和创作者团队的高效率工作流。",
        heroTitle: "更适合社媒短视频团队的 Seedance 1.5 风格生成",
        heroDescription:
          "快速产出更有停留感的短视频内容，高频测试不同 hook 和节奏，让创意团队更快找到有效版本。",
        intro:
          "Seedance 1.5 风格工作流更适合短视频和社媒内容生产。这个页面会把这个关键词页做成真正可收录、可解释、可转化的落地页，而不是简单占位。",
        strengthsTitle: "为什么会关注 Seedance 1.5",
        strengths: [
          "适合以社媒传播为导向的短视频内容生产",
          "便于快速测试不同开头、节奏和吸引注意力的方式",
          "适合需要大量变体的内容团队和广告团队",
          "适合在放量制作前先筛选有效创意方向",
        ],
        useCasesTitle: "适合的场景",
        useCases: [
          "TikTok、Reels 等平台的短视频批量创作",
          "创作者品牌的日常社媒内容",
          "新品上线时的短促销和开场 hook 视频",
          "围绕前几秒留存率做变体测试的内容",
        ],
        workflowTitle: "在 VideoAI 中的典型流程",
        workflowSteps: [
          "先围绕前 3 秒冲击力写一个更简洁明确的 prompt",
          "多生成几个版本，比较节奏、转场和视觉 hook",
          "如果品牌视觉必须保持一致，就改用图生视频",
          "挑出最强的一版，再同步分发到不同短视频渠道",
        ],
        comparisonTitle: "什么时候适合选 Seedance 1.5 风格",
        comparisonBody:
          "如果你更在意产能、变体数量、社媒原生感和快速试错效率，那么 Seedance 1.5 风格通常比偏电影感路线更适合短视频团队。",
        faqTitle: "Seedance 1.5 常见问题",
        faqs: [
          {
            question: "Seedance 1.5 最适合做什么？",
            answer:
              "它更适合短视频实验、社媒内容批量生产，以及需要快速产出多个创意版本的场景。",
          },
          {
            question: "适合做广告变体测试吗？",
            answer:
              "很适合，尤其是同一活动要测试多个 hook、多个角度、多个节奏版本的时候。",
          },
          {
            question: "怎么写 prompt 才更适合短视频？",
            answer:
              "重点写清楚开头几秒发生什么、视觉动作是什么、想让用户感受到什么。短视频效果通常取决于开头是否足够抓人。",
          },
        ],
        primaryCta: "开始文生视频",
        secondaryCta: "开始图生视频",
      },
    },
  },
};

export function getModelPageConfig(slug: ModelPageSlug) {
  return modelPageConfigs[slug];
}
