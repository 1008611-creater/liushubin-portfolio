/**
 * 内容层。
 *
 * 全部内容来自作者本人已对外公开的作品集与线上简历，逐条可核对：
 * resume.lsb0713.online 与 github.com/1008611-creater/liushubin-portfolio
 *
 * 这里不放推测、示例或占位数据。没有真实来源的字段一律留空，而不是编造。
 */

export type Fact = {
  label: string
  value: string
}

export type MediaItem = {
  src: string
  caption: string
}

export type MethodBlock = {
  heading: string
  body: string
}

export type Project = {
  slug: string
  index: string
  title: string
  titleEn: string
  kicker: string
  role: string
  period: string
  summary: string
  lead: string
  facts: Fact[]
  method: MethodBlock[]
  stack: string[]
  media: MediaItem[]
}

export const PROFILE = {
  name: '刘曙宾',
  nameEn: 'Liu Shubin',
  role: 'AI 产品 / 智能工作台',
  tagline: '把复杂问题收成主线，再推进到真实落地',
  intro:
    '持续围绕 AI 工作台、Agent 协作与生成式交互做产品化实践。能从需求拆解、信息架构与交互约束层面推进复杂问题，也能直接进入 Next.js、React、TypeScript 与 FastAPI 的工程实现。',
  location: '中国 · 北京',
  email: '1453637677@qq.com',
  phone: '18518090752',
  github: 'https://github.com/1008611-creater',
  githubHandle: '1008611-creater',
  legacyResume: 'https://resume.lsb0713.online',
  available: '2026 年暑假可全职到岗',
  year: '2026',
} as const

export const PROJECTS: Project[] = [
  {
    slug: 'heritage',
    index: '01',
    title: '古建交互展卷',
    titleEn: 'Heritage Scroll',
    kicker: '3D 交互 / 系统表达',
    role: '独立推进的比赛项目',
    period: '2026.04 — 至今',
    summary: '围绕观看、细看与搭建三段体验，建立浏览器内 3D 交互作品系统。',
    lead:
      '这个项目最先说明，我不仅能组织复杂交互作品的体验链路，也能把 3D 场景状态、中文实时排版与生成式构件规则收束成同一套作品系统。',
    facts: [
      {
        label: '主题范围',
        value:
          '围绕民居、官府、皇宫、桥梁 4 类主题，建立可观察、可比较、可交互细看的数字展卷与拆读界面。',
      },
      {
        label: '体验主线',
        value:
          '以四合院开场建立空间叙事，引导进入细看页与搭建台，形成完整的观看、细看、搭建体验链路。',
      },
      {
        label: '技术证据',
        value:
          '3D 主舞台嵌入首页背景，中文实时排版随舞台状态联动，搭建台支持构件拖放与吸附，77 个核心文件形成完整工程雏形。',
      },
    ],
    method: [
      {
        heading: '先定主线，再定页面',
        body:
          '把项目组织为专题切换、观景台、构景台、工坊四段。页面顺序由体验顺序推导，而不是由功能清单推导。',
      },
      {
        heading: '把状态当一等公民',
        body:
          '3D 舞台、中文排版与搭建台共享同一套状态，任何一侧变化都会让另外两侧同步，避免出现三套互不相干的表现。',
      },
      {
        heading: '为系统留下验证',
        body:
          '用验证脚本固定关键交互路径，让后续改动可以被复验，而不是靠肉眼看一遍就算通过。',
      },
    ],
    stack: ['Next.js 16', 'Three.js', 'React Three Fiber', 'Pretext', '3D 交互'],
    media: [
      { src: '/work/heritage-hero-stage.png', caption: '首页主舞台：3D 场景作为背景承载叙事' },
      { src: '/work/heritage-topic-switcher-home.png', caption: '专题切换：民居、官府、皇宫、桥梁四类主题' },
      { src: '/work/heritage-workbench-desktop.png', caption: '观景台：构件拆读与信息对照' },
      { src: '/work/heritage-builder-stage.png', caption: '搭建台：构件拖放与吸附' },
      { src: '/work/heritage-workflow-workbench.png', caption: '工坊：生成式构件规则的落点' },
      { src: '/work/heritage-home-overview.png', caption: '首页总览：观看、细看、搭建三段入口' },
    ],
  },
  {
    slug: 'ai-video',
    index: '02',
    title: 'AI 视频商业化',
    titleEn: 'AI Video Delivery',
    kicker: '商业化交付 / Agent 协作',
    role: '生成式内容产品与 Agent 工作流实践',
    period: '2025.12 — 2026',
    summary: '覆盖需求理解、模型与工作流选型、交付迭代与复购维护，已形成真实商业闭环。',
    lead:
      '这个项目最先说明，我不仅能独立完成 AI 视频的商业化交付链路，也能把 Hermes、ACP 与跨端协作方式逐步收束成可复用的 Agent 工作流。',
    facts: [
      {
        label: '交付范围',
        value:
          '覆盖政企、MCN、动漫、海外等场景的需求理解、方案设计、模型与工作流选型、交付迭代与复购维护。',
      },
      {
        label: '效率证据',
        value: '把本地执行、微信承接与 SOP 交付收束成稳定流程，将视频交付周期从 7 天压缩至 3 天。',
      },
      {
        label: '商业结果',
        value:
          '形成 5w+ 商业变现、50w+ 在途项目、30+ 付费用户与头部 MCN 月度复购 8 次的稳定交付链路。',
      },
    ],
    method: [
      {
        heading: '把交付流程变成产品',
        body:
          '需求理解、模型选型、工作流编排与验收各自有固定产出，交付不再依赖单次沟通里留下的记忆。',
      },
      {
        heading: '让 Agent 进真实链路',
        body:
          '把 Hermes 通过 ACP 接入编辑器并接入微信 Clawbot，验证跨端协作、上下文延续、工具执行与结果回传的稳定性。',
      },
      {
        heading: '复购是唯一的验收',
        body:
          '单次交付合格不代表链路成立。头部 MCN 连续 8 个月复购，说明流程本身可以脱离个人状态稳定运行。',
      },
    ],
    stack: ['Hermes', 'ACP', 'AI 视频生成', 'ComfyUI', 'Prompt 工程'],
    media: [
      { src: '/work/ai-video-mcn-cover.jpg', caption: 'MCN 交付案例' },
      { src: '/work/ai-video-government-cover.jpg', caption: '政企交付案例' },
    ],
  },
  {
    slug: 'guozhiying',
    index: '03',
    title: '果智营工作台',
    titleEn: 'GuoZhiYing',
    kicker: '复杂业务 / AI 工作台',
    role: 'AI 工作台与 Agent 协作产品实践',
    period: '2026 — 至今',
    summary: '覆盖首页、AI 助手、采购、库存、渠道等 8+ 业务模块，持续统一到同一条经营判断主线。',
    lead:
      '这个项目最先说明，我可以把复杂业务模块重新收束成统一的经营判断主线，并把 AI 助手、页面状态与验证机制推进成可持续演进的工作台产品。',
    facts: [
      {
        label: '模块范围',
        value:
          '覆盖首页、AI 助手、采购、库存、渠道、客群、内容、爆品、扩店等 8+ 业务模块，持续统一到同一条经营判断链路。',
      },
      {
        label: '主线收束',
        value:
          '把首页与多个工作区、详情页收束为当前判断、任务单、复验项等执行型结构，降低跨模块理解成本。',
      },
      {
        label: '验证闭环',
        value:
          '补强 seed 与 database 双模式一致性、状态文件、自启动兜底、日志落盘与严格校验链路，使改动可追踪、可复验。',
      },
    ],
    method: [
      {
        heading: '先定义判断，再定义模块',
        body:
          '模块划分服从经营判断的顺序。采购、库存、渠道不是并列的九宫格，而是同一条判断链上的不同环节。',
      },
      {
        heading: '把 AI 助手接进页面结构',
        body:
          '助手不是悬浮对话框，它的输出直接对应页面上的任务单与复验项，因此结论可以被执行，也可以被检查。',
      },
      {
        heading: '用记录代替记忆',
        body:
          '状态文件、日志落盘与复验项让每次改动都有痕迹，接手的人不需要先问一遍历史。',
      },
    ],
    stack: ['Next.js', 'React 19', 'TypeScript', 'FastAPI', 'Agent 工作台'],
    media: [
      { src: '/work/guozhiying-home-overview.png', caption: '首页总览：经营判断的统一入口' },
      { src: '/work/guozhiying-home-actions.png', caption: '经营动作：任务单与推进状态' },
      { src: '/work/guozhiying-assistant-overview.png', caption: 'AI 助手：结论落到可执行项' },
    ],
  },
  {
    slug: 'brand',
    index: '04',
    title: '品牌包装量产',
    titleEn: 'Packaging at Scale',
    kicker: '品牌视觉 / 量产交付',
    role: '独立设计与商业量产交付',
    period: '2025 — 至今',
    summary: '从主视觉、文案排版到打样修正与工厂协同，覆盖完整量产交付链路。',
    lead:
      '这个项目最先说明，我可以把视觉方案推进到真实生产链路里，而不是停留在效果图层；从主视觉、文案排版到打样修正与工厂协同，都能稳定落到量产交付。',
    facts: [
      {
        label: '交付范围',
        value:
          '覆盖凤梨贴纸与葡萄开口盒两类包装场景，从主视觉设定、文案排版到印前文件输出、打样修正与工厂协同。',
      },
      {
        label: '设计证据',
        value:
          '葡萄项目把主视觉、标题文案面与氛围延展面组织成系列化视觉系统，统一品牌气质与货架识别。',
      },
      {
        label: '量产结果',
        value: '两个项目均已完成工厂实物生产，单项目量产规模约 2 至 5 万份，并随实际出货持续追加。',
      },
    ],
    method: [
      {
        heading: '先算印前，再画效果',
        body:
          '刀版、联版、出血与套印顺序在设计阶段就要确定，否则打样阶段会被迫返工重画。',
      },
      {
        heading: '把偏差当输入',
        body:
          '打样偏差不是失误，是要被写进下一版的约束。颜色、材质与机器状态都要留出可接受的区间。',
      },
      {
        heading: '货架识别优先',
        body:
          '系列化视觉的价值在于同一排货架上能被一眼认出，因此标题文案面与氛围延展面共享同一套构成规则。',
      },
    ],
    stack: ['Photoshop', 'Illustrator', '包装视觉', '印前输出', '量产交付'],
    media: [
      { src: '/work/pineapple-sticker-01-flat-photo.jpg', caption: '凤梨贴纸：成品平铺' },
      { src: '/work/pineapple-sticker-03-print-sheet-closeup.jpg', caption: '印刷版面局部' },
      { src: '/work/pineapple-sticker-04-print-sheet-machine.jpg', caption: '上机印刷' },
      { src: '/work/pineapple-sticker-05-on-fruit.jpg', caption: '实贴效果' },
      { src: '/work/grape-open-box-01-dieline.jpg', caption: '葡萄开口盒：刀版结构' },
      { src: '/work/grape-open-box-02-banner-slogan.jpg', caption: '标题文案面' },
      { src: '/work/grape-open-box-03-background-artwork.jpg', caption: '氛围延展面' },
      { src: '/work/grape-open-box-05-grape-illustration.jpg', caption: '插画细节' },
    ],
  },
]

export type Capability = {
  index: string
  title: string
  body: string
  evidence: string
}

export const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: '复杂问题收敛与产品主线判断',
    body:
      '先拆一级目标、核心约束与验证条件，再决定结构、入口与交互顺序。能把古建项目组织为专题切换、观景台、构景台与工坊，并落到 9 个主路由；把果智营页面组织为当前判断、任务单与复验项。',
    evidence: '来自案例 01 与案例 03',
  },
  {
    index: '02',
    title: 'AI 产品与 Agent 工作流设计',
    body:
      '做过从模型选型、提示词设计、工作流编排到交付验收的完整 AI 生产链路；在果智营把 Agent 能力与页面结构、状态文件、验证记录结合，形成 3 类状态记录与 2 层验证机制。',
    evidence: '来自案例 02 与案例 03',
  },
  {
    index: '03',
    title: '生成式内容与交互表达',
    body:
      '做过 AI 视频、3D 交互作品、包装视觉与品牌物料等不同媒介的表达设计；理解参考一致性、首尾帧控制与提示词稳定性，也理解包装印刷中的尺寸、联版与打样偏差约束。',
    evidence: '来自案例 01 与案例 04',
  },
]

export type WorkSurface = {
  title: string
  body: string
  tags: string[]
  sources: string[]
}

export const WORK_SURFACE: WorkSurface[] = [
  {
    title: '主线判断与结构推进',
    body:
      '习惯先拆一级目标、核心约束与验证条件，再决定页面结构、信息层级、状态流转和文案位置；能把复杂项目拆成连续链路，并明确主任务、主入口、复验项与非核心信息的层级关系。',
    tags: ['信息架构', '交互约束', '主线收束', '经营判断'],
    sources: ['果智营工作台', '古建交互展卷'],
  },
  {
    title: 'AI 产品与 Agent 工作流推进',
    body:
      '做过从模型选型、提示词设计、参考输入、工作流编排到交付验收的完整 AI 生产链路；持续把 Hermes 通过 ACP 接入编辑器并接入微信，验证 Agent 在跨端协作、上下文延续、工具执行与结果回传中的稳定性。',
    tags: ['Hermes', 'ACP', 'ComfyUI', '工作流设计'],
    sources: ['AI 视频商业化', '果智营工作台'],
  },
  {
    title: '交互表达、工程实现与真实交付',
    body:
      '做过 AI 视频、3D 交互作品、包装视觉与品牌物料等不同媒介的表达设计；理解生成式内容交付中的关键约束，也能把表达效果继续推进到工程实现、验证脚本与真实交付。',
    tags: ['Next.js', 'TypeScript', 'Three.js', '验证脚本', '量产交付'],
    sources: ['古建交互展卷', '品牌包装量产'],
  },
]

export const EDUCATION = {
  school: '中国农业大学',
  major: '数据科学与大数据技术',
  degree: '本科',
  period: '2023.09 — 2027.06',
  status: '本科大三在读，预计 2027 年毕业',
  body:
    '课程训练让我更容易进入数据、模型、前端工程与验证链路；后续 AI 产品、3D 交互与商业交付实践，也都建立在这套基础之上。',
  courses: ['人工智能', '数字图像处理', '机器学习', '数据挖掘'],
} as const

export const CONTACT_NOTES = [
  '岗位匹配、到岗安排与后续沟通方式。',
  '项目细节、正式简历与补充材料。',
] as const

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}

export function getNeighbours(slug: string): { prev: Project; next: Project } {
  const i = PROJECTS.findIndex((project) => project.slug === slug)
  const total = PROJECTS.length
  return {
    prev: PROJECTS[(i - 1 + total) % total],
    next: PROJECTS[(i + 1) % total],
  }
}
