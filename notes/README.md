# Notes

前沿技术的阅读笔记。**事实、推断、观点分开写；每个数字都带出处。**

线上地址：<https://aayloo.github.io/notes/>

## 这个目录在哪

Notes **不是独立仓库**，它是个人站 `Aayloo.github.io` 的一部分，线上路径是 `/notes/`。

| | 位置 | 放什么 |
| --- | --- | --- |
| 写作副本 | 本地知识库 `notes/` | 全部源文件：页面、图、生成脚本、草稿、归档 |
| 发布副本 | `Aayloo.github.io/notes/` | 只放站点实际会请求的文件 |

同步时**只上传站点文件**。下面这些留在本地、不上传：

| 只在本地 | 为什么 |
| --- | --- |
| `tools/` | 取数、画图、生成页面与分享封面的脚本（50 多个） |
| `library/` | 归档内容的源文件 |
| `_preview/` | 分享封面与版式的预览页（截图产物才是要发布的） |

> **仓库是公开的。** `meta/roadmap.md` 与 `meta/notes.json` 里写了还没发布的题目，任何人打开 GitHub 都能读到。不想公开的东西不要写进这两个文件。

## 目录结构（发布副本）

```
notes/
├── index.html              目录页（卡片由 meta 生成）
├── about/index.html        写作原则
├── <slug>/index.html       单篇笔记（网址 /notes/<slug>/）
├── assets/
│   ├── tokens.css          设计令牌（从个人站抽取，勿手改）
│   ├── site.css / site.js  组件与交互
│   ├── figs/*.svg|png      自绘图：SVG 给页面，PNG 是给 LinkedIn / PPT 的副本
│   └── share/*.png         链接分享封面（og:image）与 LinkedIn 竖版
├── meta/notes.json         全部笔记的元数据（唯一真相）
├── share-kit/index.html    分享素材下载页（每篇页脚有入口，noindex）
├── style-kit/              版式备选样张（内部参考，noindex、无入口）
├── feed.xml / sitemap.xml  由 meta 自动生成，勿手改
└── robots.txt / 404.html   在仓库根目录，不在 notes/ 里
```

## 本地预览

```bash
cd notes
python -m http.server 8000
# 打开 http://localhost:8000/
```

## 写一篇新笔记

1. 在 `meta/notes.json` 里加一条（slug、中英标题、标签、日期、状态、摘要、阅读时长）。
2. 复制 `trend-following/index.html` 作为模板，改正文（它是最新的一套骨架与样式）。
3. 图放 `assets/figs/`，命名 `fN-*` 或 `<slug缩写>-*`；图注格式：`图 N｜标题（来源：…）`。
4. 生成分享封面：`python tools/make_share_cards.py` → `node tools/shoot_share.js`，
   输出到 `assets/share/`，再把绝对地址填进页面 `<head>` 的 `og:image`。
5. 跑 `python tools/build_index.py` 重建目录页、`feed.xml` 与 `sitemap.xml`。

## 每篇笔记的固定骨架

页头（标签 · 日期 · 版本 · 阅读时长）→ TL;DR → 为什么写 → 它是什么 → 它不是什么 →
机制 → 对比 → 怎么用 → 实测 → 成本与延迟 → 局限与反方 → 我的判断 →
来源 · 更新日志 · 引用格式 → 英文版（`<section class="en" id="en-version">`）。

其中 `它是什么`、`对比`、`来源` 属于事实层，`机制`/`怎么用` 允许推断但要标注，
`我的判断` 一律用紫色卡片明确标成观点。

每篇结尾固定附一段**分享版摘要**（≥3 句、可直接贴 LinkedIn），不写英文讲稿，也不做中英全文对照。

## 三种状态与收录规则

`meta/notes.json` 里每条笔记有一个 `status`，决定它是否出现在公网：

| status | 出现在目录页 | 出现在 feed / sitemap | 页面上 |
| --- | --- | --- | --- |
| `published` | 是 | 是 | 正常收录 |
| `library`（归档） | 否 | 否 | 页面仍在，带 `noindex, nofollow` |
| `planned` | 否 | 否 | 只有一条记录，没有页面 |

归档页**不删文件**，改成三件事：从 `notes.json` 的状态改掉、在页面 `<head>` 里加
`<meta name="robots" content="noindex, nofollow">`、重跑 `build_index.py`。
不要再往 `robots.txt` 里加 `Disallow` —— 那样爬虫读不到 noindex，链接反而可能仍被收录。

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
- **图内规则**：只保留轴标签、刻度、数据标签与图例；**数据图不放任何说明文字、箭头或浮动标注**，说明一律写进 HTML 图注；**示意图（象限图、流程图）相反，文字就是内容**
- **图例**：统一放在坐标区下方或整图下方（`rs.legend()` / `fig.legend`），永不与数据重叠
- **标题**：结论句（左对齐）+ 口径副标题 + 底部来源行
- **双语**：图内标题、轴标签与图例均为中英并列，方便英文读者与对外分享

### 渲染质检（每次改图后运行）

```bash
python tools/qa.py                # 页面结构、链接、标签一致性
python tools/build_index.py --check   # meta 与目录页/feed/sitemap 是否一致
```

## 六条能力线（与个人站的技能线一致，一人六面）

| 标签 | 名称 | 回答的问题 |
| --- | --- | --- |
| `signal` | 信号 | 数据能不能变成信号 |
| `portfolio` | 组合 | 信号怎么变成权重、约束值多少钱 |
| `cost`（并入组合叙述） | 成本与实现 | 换手、容量、冲击成本 |
| `attribution` | 归因 | 赚的钱和承担的风险从哪来 |
| `data-eng` | 数据与工程 | 数据管道、可复现、交付 |
| `models` | 模型与验证 | 前沿模型能不能信、怎么验 |
| `craft` | 研究与表达 | 验证严谨性、写作与表达 |

## 选题三道题（各 0-2 分，合计 ≥4 才写）

1. 它回答哪个**投资决策**？（答不出 0 分，间接 1 分，直接对应一个决策 2 分）
2. 它展示了什么**别人反驳不了**的能力？（谁都能写 0 分，需要你独有的经验 2 分）
3. 一年后它还有价值吗？（只是新闻 0 分，方法不过期 2 分）

## 三条纪律

- **主线优先**：`signal` / `portfolio` / `attribution` 三条线的篇数合计不得少于总数的一半；置顶位永远留给主线。
- **热点配额**：热点解读每季度不超过 2 篇，且不能连续两篇都是热点；每篇热点必须有一句投资决策落点，写不出就降级成短笔记。
- **不展示计划**：未发布的题目只留在 `meta/notes.json`，不出现在公网目录页。

## 发布前检查

- 一个问题 / 一个可复现产物 / 一张图 / 一个结论 / 一个明确局限
- 来源可点开（期刊 DOI 用 Crossref 核对，arXiv 直接访问确认）；官方口径与本人推断分开标注
- 不出现任何任职机构的真实数据、系统名、字段名与流程；行业场景一律加「模拟 / 示意」标注
- `<head>` 里的 `og:image` 是绝对地址，且图片已上传
- `python tools/qa.py` 与 `python tools/build_index.py --check` 通过

## 发布流程

1. 在本地写作副本里改**生成脚本**，不手改生成物
2. 重跑：`make_<slug>_data.py` → `make_<slug>_figs.py` → `make_<slug>_note.py`
3. 审计：`_notes_qa/check_bilingual_layout.js`、`check_notes_regression.js`、`check_share.js`
4. `meta/notes.json` 改状态 → `python tools/build_index.py`
5. 同步到 `Aayloo.github.io/notes/` → commit → push → 等 60 秒验证线上

> 同步要**连 `meta/` 一起带上**。曾经出现过目录页和 feed 是新版、但仓库里的
> `meta/notes.json` 还是旧版的情况——那种状态下任何人拿仓库重建一次，最新一篇就会消失。

## 口径与免责

- 涉及第三方产品时，官方口径与本文推断分开标注。
- 涉及机构流程的场景一律使用合成数据，不出现任何雇主的真实系统名、字段名或数据。
- 图表若为示意而非实测，图注会写明。

## License

MIT（正文内容版权归作者，引用请注明来源）。