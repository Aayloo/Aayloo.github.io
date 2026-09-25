# aayloo.github.io

个人网站源码 —— 数据科学家 · 量化策略师 · AI 工程师
Personal site — Data Scientist · Quantitative Strategist · AI Engineer

**网站地址：<https://aayloo.github.io/>**

---

## 这是什么

一个**单文件静态站点**：页面结构、样式与交互脚本全部写在 `index.html` 里，图片放在 `assets/`。
没有构建步骤、没有依赖、没有框架 —— 改完直接提交，GitHub Pages 自动发布。

## 目录结构

```
.
├── index.html          整个网站（结构 + 样式 + 交互脚本），中英双语
├── assets/
│   └── psyduck.png     站点图标 / 头像
└── README.md           本文件
```

## 本地预览

直接双击 `index.html` 即可在浏览器中查看完整效果。
若想更接近线上环境，可用本地服务器：

```powershell
python -m http.server 8000
# 然后打开 http://localhost:8000
```

## 发布方式

- 分支：`main`，发布目录：仓库根目录 `/`
- 推送到 `main` 后，GitHub Pages 通常在 1 分钟内自动更新
- 线上地址：<https://aayloo.github.io/>

## 内容说明

- 站内仅包含公开内容：研究方向、公开项目与技能概览
- 不含任何雇主机密、内部工作数据或未公开材料
- 公开项目代码在 [quant-research-hub](https://github.com/Aayloo/quant-research-hub)

## License

**代码**（本仓库内的 HTML / CSS / JavaScript）：[MIT](LICENSE) —— 可以自由使用、修改、分发，保留版权声明即可。

**内容**（站内文字、图像、笔记与项目说明）：© 2026 Aylon，保留所有权利。
欢迎引用并附上来源链接，但请勿整篇转载或作为自己的作品发布。

## 联系

- GitHub：[@Aayloo](https://github.com/Aayloo)
- 站内联系入口：<https://aayloo.github.io/#contact>

---

<sub>© 2026 Aylon · Hong Kong</sub>
