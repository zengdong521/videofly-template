import type { Locale } from "@/config/i18n-config";

export type ComparePageSlug =
  | "sora-2-vs-veo-3-1"
  | "sora-2-vs-seedance-1-5"
  | "veo-3-1-vs-seedance-1-5";

interface CompareSection {
  title: string;
  body: string;
}

interface CompareFaq {
  question: string;
  answer: string;
}

interface LocalizedCompareCopy {
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  summaryTitle: string;
  summaryBody: string;
  winnerTitle: string;
  winnerBody: string;
  categoryTitle: string;
  categories: Array<{
    label: string;
    winner: string;
    reason: string;
  }>;
  sections: CompareSection[];
  faqTitle: string;
  faqs: CompareFaq[];
  primaryCta: string;
  secondaryCta: string;
}

export interface ComparePageConfig {
  slug: ComparePageSlug;
  models: [string, string];
  ogImage?: string;
  copy: Record<Locale, LocalizedCompareCopy>;
}

export const comparePageConfigs: Record<ComparePageSlug, ComparePageConfig> = {
  "sora-2-vs-veo-3-1": {
    slug: "sora-2-vs-veo-3-1",
    models: ["Sora 2", "Veo 3.1"],
    ogImage: "/og-home.jpg",
    copy: {
      en: {
        title: "Sora 2 vs Veo 3.1",
        description:
          "Compare Sora 2 vs Veo 3.1 for cinematic style, realism, motion quality, and which AI video workflow fits your content goals.",
        heroTitle: "Sora 2 vs Veo 3.1: which AI video workflow should you choose?",
        heroDescription:
          "This comparison is for teams deciding between cinematic ideation and cleaner, more realistic output. Use it to pick the right model direction before you start generating.",
        summaryTitle: "Quick summary",
        summaryBody:
          "Choose Sora 2 when you want imaginative, cinematic concept generation. Choose Veo 3.1 when realism, cleaner motion, and dependable marketing-ready output matter more.",
        winnerTitle: "Best fit by workflow",
        winnerBody:
          "Sora 2 is usually stronger for visual exploration and concept storytelling. Veo 3.1 is usually stronger for product demos, brand clips, and polished commercial-looking motion.",
        categoryTitle: "Category breakdown",
        categories: [
          {
            label: "Cinematic imagination",
            winner: "Sora 2",
            reason: "Better fit when you want the model to contribute more mood, framing ideas, and stylized visual interpretation.",
          },
          {
            label: "Realistic motion",
            winner: "Veo 3.1",
            reason: "Better fit for grounded movement, cleaner scene behavior, and more believable marketing visuals.",
          },
          {
            label: "Concept exploration",
            winner: "Sora 2",
            reason: "A stronger choice for brainstorming multiple creative directions before refining toward a final asset.",
          },
          {
            label: "Brand and product output",
            winner: "Veo 3.1",
            reason: "Often the better choice when clarity, polish, and practical business output are the main priority.",
          },
        ],
        sections: [
          {
            title: "When Sora 2 is the better choice",
            body: "Pick Sora 2 when your main job is turning a rough creative idea into a visually rich concept clip. It is especially useful for teaser storytelling, mood-first sequences, and early-stage campaign ideation.",
          },
          {
            title: "When Veo 3.1 is the better choice",
            body: "Pick Veo 3.1 when your output needs to look cleaner, more realistic, and closer to something you can ship into paid social, product marketing, or polished web content.",
          },
          {
            title: "How to choose in practice",
            body: "If the question is 'what could this idea look like?', start with Sora 2. If the question is 'what can we publish this week?', Veo 3.1 is usually the safer direction.",
          },
        ],
        faqTitle: "Sora 2 vs Veo 3.1 FAQ",
        faqs: [
          {
            question: "Which is better for ads?",
            answer: "Veo 3.1 is usually better for ads when realism and polish matter most, while Sora 2 is better for concept-driven or stylized ad exploration.",
          },
          {
            question: "Which is better for cinematic storytelling?",
            answer: "Sora 2 is usually the stronger fit for cinematic concept work and storytelling-first visuals.",
          },
          {
            question: "Should I switch models during the same project?",
            answer: "Yes. A common workflow is to explore with Sora 2 and then move to a more controlled generation path for final production assets.",
          },
        ],
        primaryCta: "Try Text to Video",
        secondaryCta: "Open Image to Video",
      },
      zh: {
        title: "Sora 2 vs Veo 3.1",
        description:
          "对比 Sora 2 和 Veo 3.1 在电影感、真实感、运动质量与适用工作流上的差异，帮助你选择更合适的 AI 视频生成路线。",
        heroTitle: "Sora 2 vs Veo 3.1：到底该选哪条 AI 视频工作流？",
        heroDescription:
          "如果你正在犹豫是要更强的创意表现，还是更稳的真实感输出，这个对比页会帮你更快做决定。",
        summaryTitle: "快速结论",
        summaryBody:
          "想要更强的电影感和创意探索，优先选 Sora 2；想要更真实、更稳、更适合营销成片的输出，优先选 Veo 3.1。",
        winnerTitle: "按工作流看谁更合适",
        winnerBody:
          "Sora 2 更适合概念验证和视觉探索，Veo 3.1 更适合产品展示、品牌短片和更接近商用质感的内容。",
        categoryTitle: "维度对比",
        categories: [
          {
            label: "电影感和想象力",
            winner: "Sora 2",
            reason: "更适合需要氛围、镜头感和风格化表达的场景。",
          },
          {
            label: "真实运动表现",
            winner: "Veo 3.1",
            reason: "更适合需要运动更干净、画面更可信的内容。",
          },
          {
            label: "创意试稿",
            winner: "Sora 2",
            reason: "更适合前期多方向头脑风暴和创意提案。",
          },
          {
            label: "品牌和产品内容",
            winner: "Veo 3.1",
            reason: "在清晰表达和更接近商用品质的输出上通常更稳。",
          },
        ],
        sections: [
          {
            title: "什么时候更适合选 Sora 2",
            body: "如果你的目标是把一个模糊创意快速变成更有电影感的概念短片，Sora 2 往往更适合，尤其适合 teaser、叙事短片和前期创意探索。",
          },
          {
            title: "什么时候更适合选 Veo 3.1",
            body: "如果你更在意输出稳不稳、真实不真实、能不能更快接近发布质量，那 Veo 3.1 往往更适合营销和产品类内容。",
          },
          {
            title: "实际怎么选",
            body: "如果你的问题是“这个创意能不能更惊艳地表达出来”，先试 Sora 2；如果你的问题是“这条内容这周能不能发出去”，通常 Veo 3.1 更稳。",
          },
        ],
        faqTitle: "Sora 2 vs Veo 3.1 常见问题",
        faqs: [
          {
            question: "哪个更适合广告素材？",
            answer: "偏真实感和稳定商用输出时，Veo 3.1 更合适；偏概念创意和风格化表达时，Sora 2 更合适。",
          },
          {
            question: "哪个更适合电影感叙事？",
            answer: "通常 Sora 2 更适合强调情绪氛围和镜头感的叙事内容。",
          },
          {
            question: "一个项目里可以切换模型吗？",
            answer: "可以。常见做法是先用 Sora 2 找方向，再切到更稳的路线产出最终可发布素材。",
          },
        ],
        primaryCta: "试试文生视频",
        secondaryCta: "打开图生视频",
      },
    },
  },
  "sora-2-vs-seedance-1-5": {
    slug: "sora-2-vs-seedance-1-5",
    models: ["Sora 2", "Seedance 1.5"],
    ogImage: "/og-home.jpg",
    copy: {
      en: {
        title: "Sora 2 vs Seedance 1.5",
        description:
          "Compare Sora 2 vs Seedance 1.5 for cinematic generation, social-first output, iteration speed, and short-form content production.",
        heroTitle: "Sora 2 vs Seedance 1.5 for short-form AI video creation",
        heroDescription:
          "This is the comparison for teams choosing between cinematic concept quality and fast-moving social video iteration.",
        summaryTitle: "Quick summary",
        summaryBody:
          "Sora 2 is better for concept-led cinematic generation. Seedance 1.5 is better for social-native speed, hook testing, and creating many short-form variants quickly.",
        winnerTitle: "Best fit by workflow",
        winnerBody:
          "If you care about mood and storytelling, start with Sora 2. If you care about rapid variant volume for social channels, Seedance 1.5 is usually the better choice.",
        categoryTitle: "Category breakdown",
        categories: [
          {
            label: "Creative storytelling",
            winner: "Sora 2",
            reason: "Better fit for cinematic concept work and visually expressive prompts.",
          },
          {
            label: "Short-form iteration speed",
            winner: "Seedance 1.5",
            reason: "Better fit for producing many variants quickly and testing hooks at scale.",
          },
          {
            label: "Social-native content",
            winner: "Seedance 1.5",
            reason: "A more natural fit for creator workflows focused on attention-grabbing short clips.",
          },
          {
            label: "Mood and visual depth",
            winner: "Sora 2",
            reason: "Stronger when you want more atmosphere and cinematic framing.",
          },
        ],
        sections: [
          {
            title: "When Sora 2 wins",
            body: "Sora 2 wins when the creative idea itself is the hero. If you are pitching a visual narrative or trying to land a cinematic emotional feel, it is usually the better tool direction.",
          },
          {
            title: "When Seedance 1.5 wins",
            body: "Seedance 1.5 wins when your team needs more volume, faster variation, and social-ready content loops for TikTok, Reels, or paid creative testing.",
          },
          {
            title: "How to choose in practice",
            body: "Choose Sora 2 for big-idea creative. Choose Seedance 1.5 for growth teams optimizing hooks, retention, and variant throughput.",
          },
        ],
        faqTitle: "Sora 2 vs Seedance 1.5 FAQ",
        faqs: [
          {
            question: "Which is better for TikTok content?",
            answer: "Seedance 1.5 is usually the better fit for fast-moving TikTok style content and variant testing.",
          },
          {
            question: "Which is better for cinematic teasers?",
            answer: "Sora 2 is usually the better fit for cinematic teaser-style work and concept-first storytelling.",
          },
          {
            question: "Can I use both in the same content system?",
            answer: "Yes. Many teams use one model for ideation and another for social optimization depending on the stage of production.",
          },
        ],
        primaryCta: "Generate a Video",
        secondaryCta: "Animate an Image",
      },
      zh: {
        title: "Sora 2 vs Seedance 1.5",
        description:
          "对比 Sora 2 和 Seedance 1.5 在电影感创意、社媒短视频、高频试稿和短内容生产效率上的差异。",
        heroTitle: "Sora 2 vs Seedance 1.5：短视频创作该怎么选？",
        heroDescription:
          "如果你在犹豫是要更强的电影感概念表现，还是更快的社媒短视频迭代，这一页会更直接。",
        summaryTitle: "快速结论",
        summaryBody:
          "Sora 2 更适合电影感创意和概念短片，Seedance 1.5 更适合社媒内容、高频测试和短视频变体生产。",
        winnerTitle: "按工作流看谁更合适",
        winnerBody:
          "如果你看重情绪氛围和叙事表达，优先 Sora 2；如果你看重产能、速度和社媒适配，通常 Seedance 1.5 更合适。",
        categoryTitle: "维度对比",
        categories: [
          {
            label: "创意叙事",
            winner: "Sora 2",
            reason: "更适合电影感概念视频和更有表达力的 prompt 场景。",
          },
          {
            label: "短视频试稿速度",
            winner: "Seedance 1.5",
            reason: "更适合快速生成多个变体并测试 hook。",
          },
          {
            label: "社媒原生感",
            winner: "Seedance 1.5",
            reason: "更适合创作者团队和社媒导向的内容工作流。",
          },
          {
            label: "氛围和画面深度",
            winner: "Sora 2",
            reason: "更适合强调镜头感和情绪表达的内容。",
          },
        ],
        sections: [
          {
            title: "什么时候 Sora 2 更强",
            body: "当创意本身是核心、你希望快速做出更有电影感的概念短片时，Sora 2 通常更合适。",
          },
          {
            title: "什么时候 Seedance 1.5 更强",
            body: "当你需要更多产量、更快迭代，以及适合 TikTok、Reels 一类平台的内容时，Seedance 1.5 通常更合适。",
          },
          {
            title: "实际怎么选",
            body: "做大创意和情绪表达选 Sora 2；做增长测试、短视频 hook 和大量变体时选 Seedance 1.5。",
          },
        ],
        faqTitle: "Sora 2 vs Seedance 1.5 常见问题",
        faqs: [
          {
            question: "哪个更适合 TikTok 内容？",
            answer: "通常 Seedance 1.5 更适合强调速度、短节奏和高频试稿的 TikTok 内容生产。",
          },
          {
            question: "哪个更适合电影感 teaser？",
            answer: "通常 Sora 2 更适合电影感更强、概念表达更重的 teaser 内容。",
          },
          {
            question: "能不能两个一起用？",
            answer: "可以。很多团队会在创意探索阶段和短视频优化阶段使用不同模型路线。",
          },
        ],
        primaryCta: "开始生成视频",
        secondaryCta: "开始图生视频",
      },
    },
  },
  "veo-3-1-vs-seedance-1-5": {
    slug: "veo-3-1-vs-seedance-1-5",
    models: ["Veo 3.1", "Seedance 1.5"],
    ogImage: "/og-home.jpg",
    copy: {
      en: {
        title: "Veo 3.1 vs Seedance 1.5",
        description:
          "Compare Veo 3.1 vs Seedance 1.5 for realism, social content speed, polished marketing output, and short-form variation workflows.",
        heroTitle: "Veo 3.1 vs Seedance 1.5: polish or speed?",
        heroDescription:
          "This page is for teams choosing between cleaner, more realistic output and faster social-first iteration.",
        summaryTitle: "Quick summary",
        summaryBody:
          "Veo 3.1 is better for realistic, polished, brand-safe output. Seedance 1.5 is better for social content velocity, rapid hook testing, and short-form creative volume.",
        winnerTitle: "Best fit by workflow",
        winnerBody:
          "Choose Veo 3.1 for product marketing and realistic motion. Choose Seedance 1.5 for creator teams publishing many short variants.",
        categoryTitle: "Category breakdown",
        categories: [
          {
            label: "Polished realism",
            winner: "Veo 3.1",
            reason: "Better choice when output quality and realism are the main decision drivers.",
          },
          {
            label: "Social velocity",
            winner: "Seedance 1.5",
            reason: "Better choice when you need more versions, faster iteration, and channel-native pacing.",
          },
          {
            label: "Product and brand storytelling",
            winner: "Veo 3.1",
            reason: "Often the stronger choice for clear product visuals and business-facing creative.",
          },
          {
            label: "Hook testing",
            winner: "Seedance 1.5",
            reason: "Usually better for testing short intros, retention angles, and fast edits at scale.",
          },
        ],
        sections: [
          {
            title: "When Veo 3.1 is better",
            body: "Use Veo 3.1 when you need a more premium, realistic feel for product launches, brand clips, or landing-page visuals where perceived quality matters.",
          },
          {
            title: "When Seedance 1.5 is better",
            body: "Use Seedance 1.5 when your workflow depends on quick content cycles, hook experiments, and turning one message into many short variants.",
          },
          {
            title: "How to choose in practice",
            body: "If output polish is the bottleneck, choose Veo 3.1. If iteration speed is the bottleneck, choose Seedance 1.5.",
          },
        ],
        faqTitle: "Veo 3.1 vs Seedance 1.5 FAQ",
        faqs: [
          {
            question: "Which is better for product videos?",
            answer: "Veo 3.1 is usually better for product videos because it prioritizes cleaner and more realistic visual output.",
          },
          {
            question: "Which is better for short-form creators?",
            answer: "Seedance 1.5 is usually better for short-form creators who need more variations and faster publishing loops.",
          },
          {
            question: "Which should a growth team start with?",
            answer: "A growth team should start with the bottleneck: choose Veo 3.1 if quality is the problem, or Seedance 1.5 if throughput is the problem.",
          },
        ],
        primaryCta: "Open Text to Video",
        secondaryCta: "Open Reference to Video",
      },
      zh: {
        title: "Veo 3.1 vs Seedance 1.5",
        description:
          "对比 Veo 3.1 和 Seedance 1.5 在真实感、社媒内容产能、营销输出质感和短视频变体工作流上的差异。",
        heroTitle: "Veo 3.1 vs Seedance 1.5：要质感还是要速度？",
        heroDescription:
          "如果你在高质感真实输出和高频社媒迭代之间权衡，这个页面会更适合直接做判断。",
        summaryTitle: "快速结论",
        summaryBody:
          "Veo 3.1 更适合真实感更强、质感更稳的品牌与产品内容；Seedance 1.5 更适合社媒短视频、高频测试和变体生产。",
        winnerTitle: "按工作流看谁更合适",
        winnerBody:
          "做产品营销和更稳的真实画面时选 Veo 3.1；做创作者内容和大量短视频变体时选 Seedance 1.5。",
        categoryTitle: "维度对比",
        categories: [
          {
            label: "真实感和完成度",
            winner: "Veo 3.1",
            reason: "更适合把视觉质量和真实感放在首位的内容。",
          },
          {
            label: "社媒内容速度",
            winner: "Seedance 1.5",
            reason: "更适合高频试稿和更快的内容循环。",
          },
          {
            label: "产品和品牌内容",
            winner: "Veo 3.1",
            reason: "更适合清晰表达产品和品牌故事。",
          },
          {
            label: "Hook 测试",
            winner: "Seedance 1.5",
            reason: "更适合批量测试前几秒留存点和不同开头版本。",
          },
        ],
        sections: [
          {
            title: "什么时候 Veo 3.1 更适合",
            body: "如果你需要更高级的真实感、更稳定的运动表现，以及更接近品牌成片的输出，Veo 3.1 通常更适合。",
          },
          {
            title: "什么时候 Seedance 1.5 更适合",
            body: "如果你的流程更依赖快速更新内容、不断测试不同 hook 和大量短视频版本，Seedance 1.5 通常更适合。",
          },
          {
            title: "实际怎么选",
            body: "如果卡在“内容质感不够”，先选 Veo 3.1；如果卡在“版本不够多、节奏不够快”，先选 Seedance 1.5。",
          },
        ],
        faqTitle: "Veo 3.1 vs Seedance 1.5 常见问题",
        faqs: [
          {
            question: "哪个更适合产品视频？",
            answer: "通常 Veo 3.1 更适合产品视频，因为它更强调真实感和更稳的视觉完成度。",
          },
          {
            question: "哪个更适合短视频创作者？",
            answer: "通常 Seedance 1.5 更适合短视频创作者，因为它更适合快速做很多版本。",
          },
          {
            question: "增长团队应该先选哪个？",
            answer: "看你的瓶颈。如果问题是成片质感，先选 Veo 3.1；如果问题是产能和试稿速度，先选 Seedance 1.5。",
          },
        ],
        primaryCta: "打开文生视频",
        secondaryCta: "打开参考视频生成",
      },
    },
  },
};

export function getComparePageConfig(slug: ComparePageSlug) {
  return comparePageConfigs[slug];
}

export function getComparePageEntries() {
  return Object.values(comparePageConfigs);
}
