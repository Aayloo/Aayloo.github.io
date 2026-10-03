# Notes

前沿技术的阅读笔记。**事实、推断、观点分开写；每个数字都带出处。**

线上地址：`https://aayloo.github.io/notes/`（启用 GitHub Pages 后）

> 这个仓库与个人站 `Aayloo.github.io` **完全独立**：个人站只读不写，Notes 站的所有文件都在这里。

---

## 目录结构

```
notes/
├── index.html              目录页（卡片由 meta 生成）
├── about/index.html        写作原则
├── <slug>/index.html       单篇笔记（网址 /notes/<slug>/）
├── assets/
│   ├── tokens.css          设计令牌（从个人站抽取，勿手改）
│   ├── site.css / site.js  组件与交互
│   └── figs/*.svg|png      自绘图
├── meta/notes.json         全部笔记的元数据（唯一真相）
├── tools/
│   ├── build_index.py      meta → 目录卡片 / feed.xml / sitemap.xml
│   ├── make_figs.py        生成定量图（F4 / F5）
│   └── sync_tokens.py      从个人站同步配色
└── feed.xml / sitemap.xml  自动生成
```

## 本地预览

```bash
cd notes
python -m http.server 8000
# 打开 http://localhost:8000/
```

## 写一篇新笔记

1. 在 `meta/notes.json` 里加一条（slug、中英标题、标签、状态、摘要）。
2. 复制 `jev-system-one-models/index.html` 作为模板，改正文。
3. 图放 `assets/figs/`，命名 `fN-*.svg`，图注格式：`图 N｜标题（来源：…）`。
4. 跑 `python tools/build_index.py` 重建目录页与订阅文件。

## 每篇笔记的固定骨架

页头（标签 · 日期 · 版本 · 阅读时长）→ TL;DR → 为什么写 → 它是什么 → 它不是什么 →
机制 → 对比 → 怎么用 → 实测 → 成本与延迟 → 局限与反方 → 我的判断 → 来源 · 更新日志 · 引用格式。

其中 `它是什么`、`对比`、`来源` 属于事实层，`机制`/`怎么用` 允许推断但要标注，
`我的判断` 一律用紫色卡片明确标成观点。

每篇结尾固定附一段**分享版摘要**（≥3 句、可直接贴 LinkedIn），不写英文讲稿，也不做中英全文对照。

## 分类与选题规则

## 字体与图表规范（复刻用）

### 字体体系（全站固定）

| 用途 | 字体 | 说明 |
| --- | --- | --- |
| 正文中文 | `Songti SC` / `Noto Serif SC` / `SimSun`（衬线） | 长文阅读友好；英文搭配 `Georgia` |
| 页面标题 | 同正文（衬线，600 字重） | 标题写结论句，不写名词 |
| 图表内文字 | `Noto Sans SC`（无衬线）+ 数字用等宽 | 与正文衬线形成层级；避免图表用衬线 |
| 代码 / 公式 | `Consolas` / `Cascadia Mono` | |

| 规格 | 值 |
| --- | --- |
| 正文字号 / 行距 / 行宽 | 17.6px / 1.88 / 720px（中文约 40 字一行） |
| 图内字号（pt） | 标题 12.4 · 副标题 9.6 · 轴标签 10 · 刻度 9.6 · 图例 9.6 · 来源 7.8 |
| 移动端 | 正文 16.8px / 1.84，图表字号按比例缩小 |

### 图表管线（统一格式）

- **工具**：matplotlib（Agg 后端）；样式底座为 `tools/research_style.py`，新文章直接 import 复用
- **输出**：**透明背景 SVG**（同时导出 300dpi PNG，供 LinkedIn / PPT 使用）
- **命名**：`assets/figs/fN-描述.svg`，N 与正文 Exhibit 编号对应
- **版面**：宽高比固定在 **1.8–2.6**；单面板 7.4–8.6 in 宽，双面板 10.4 in
- **图内规则**：只保留轴标签、刻度、数据标签与图例；**不放任何说明文字、箭头或浮动标注**，说明一律写进 HTML 图注
- **图例**：统一放在坐标区下方或整图下方（`rs.legend()` / `fig.legend`），永不与数据重叠
- **标题**：结论句（左对齐）+ 口径副标题 + 底部来源行
- **双语**：图内标题、轴标签与图例均为中英并列，方便英文读者与对外分享

### 渲染质检（每次改图后运行）

```bash
python tools/make_lca_figs.py     # 渲染时自动调用 research_style.audit()，逐张打印"✓ 无文字重叠 / ⚠ 重叠明细"
python tools/qa.py                # 页面结构、链接、标签一致性
```

重叠审计按包围盒两两求交，覆盖**文字之间、图例与文字之间、图例与图例之间**三类；`research_style.frame()` 的偏移量必须按坐标区高度换算，否则会在图上方留下大片空白（这是已修复过的坑）。

分类只存在于 `meta/notes.json`，**URL 永远保持 `/notes/<slug>/` 扁平结构**，改分类不会产生死链。

### 六条能力线（与个人站的技能线一致，一人六面）

| 标签 | 名称 | 回答的问题 |
| --- | --- | --- |
| `signal` | 信号 | 数据能不能变成信号 |
| `portfolio` | 组合 | 信号怎么变成权重、约束值多少钱 |
| `cost`（并入组合叙述） | 成本与实现 | 换手、容量、冲击成本 |
| `attribution` | 归因 | 赚的钱和承担的风险从哪来 |
| `data-eng` | 数据与工程 | 数据管道、可复现、交付 |
| `models` | 模型与验证 | 前沿模型能不能信、怎么验 |
| `craft` | 研究与表达 | 验证严谨性、写作与表达 |

### 选题三道题（各 0-2 分，合计 ≥4 才写）

1. 它回答哪个**投资决策**？（答不出 0 分，间接 1 分，直接对应一个决策 2 分）
2. 它展示了什么**别人反驳不了**的能力？（谁都能写 0 分，需要你独有的经验 2 分）
3. 一年后它还有价值吗？（只是新闻 0 分，方法不过期 2 分）

### 三条纪律

- **主线优先**：`signal` / `portfolio` / `attribution` 三条线的篇数合计不得少于总数的一半；置顶位永远留给主线。
- **热点配额**：热点解读每季度不超过 2 篇，且不能连续两篇都是热点；每篇热点必须有一句投资决策落点，写不出就降级成短笔记。
- **不展示计划**：未发布的题目只留在 `meta/notes.json`，不出现在公网目录页（`build_index.py` 只渲染 `status = published`）。

### 发布前检查

- 一个问题 / 一个可复现产物 / 一张图 / 一个结论 / 一个明确局限
- 来源可点开（期刊 DOI 用 Crossref 核对，arXiv 直接访问确认）；官方口径与本人推断分开标注
- 不出现任何任职机构的真实数据、系统名、字段名与流程；行业场景一律加「模拟 / 示意」标注
- `python tools/qa.py` 与 `python tools/build_index.py --check` 通过

## 发布到 GitHub Pages

```bash
git init
git add .
git commit -m "Add notes site"
git remote add origin https://github.com/Aayloo/notes.git
git push -u origin main
```

然后在 GitHub 仓库 Settings → Pages：Source 选 `Deploy from a branch`，分支 `main`，目录 `/ (root)`。

启用后想让人从个人站点进来，只需把个人站导航里那一行 `href="#notes"` 改成
`href="https://aayloo.github.io/notes/"` —— 这一行由你自己决定要不要改，本仓库不会碰个人站。

## 口径与免责

- 涉及第三方产品（如 TypeSafe AI 的 Jev）时，官方口径与本文推断分开标注。
- 涉及机构流程的场景一律使用合成数据，不出现任何雇主的真实系统名、字段名或数据。
- 图表若为示意而非实测，图注会写明。

## License

MIT（正文内容版权归作者，引用请注明来源）。
