# TextTool - 专业的在线文本处理工具平台

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fryos.cc)](https://ryos.cc)

## 项目简介

TextTool 是一个功能强大的在线文本处理工具平台，提供 20+ 种实用的文本处理功能。所有功能完全在浏览器中运行，不会上传您的数据到服务器，确保隐私安全。

### 核心特点

- ✨ **功能丰富** - 20+ 种实用文本处理功能
- 🔒 **隐私安全** - 纯前端运行，数据不上传
- 💯 **完全免费** - 所有功能永久免费使用
- 🎨 **界面美观** - 现代化设计，支持深色模式
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🌐 **无需注册** - 打开即用，无需账号

## 主要功能

### 📝 文本格式化
- 大小写转换（全大写、全小写、标题格式、句子格式）
- 去空格、去空行
- 批量添加/去除前后缀
- 文本去重
- 行反转、字符反转

### 💻 Markdown & HTML
- Markdown 实时预览
- 代码语法高亮
- HTML 渲染
- 文本对比与差异高亮

### 🔄 数据转换
- Base64 编码/解码
- ROT13 加密/解密
- 二维码生成与识别

### 🔍 文本分析
- 字数统计（字数、词数、行数）
- 词频统计
- 行频统计
- 时间格式求和

### 🛠️ 高级处理
- 正则表达式查找替换
- 文本排序（字母、数字、倒序）
- 行内排序
- 按分隔符分割/合并

## 网站结构

```
/
├── index.html          # 首页（工具主界面）
├── blog.html           # 博客列表
├── blog/               # 博客文章详情
│   ├── text-processing-tips.html
│   ├── regex-guide.html
│   ├── markdown-tutorial.html
│   └── base64-explained.html
├── guide.html          # 工具使用指南
├── about.html          # 关于我们
├── contact.html        # 联系我们
├── resources.html      # 资源推荐
├── privacy.html        # 隐私政策
├── style.css           # 样式文件
├── script.js           # 脚本文件
└── sitemap.xml         # 站点地图
```

## 技术栈

- **前端框架**: 无框架，原生 JavaScript
- **样式**: Tailwind CSS + 自定义 CSS
- **Markdown 渲染**: marked.js
- **代码高亮**: highlight.js
- **二维码**: qrcodejs + jsQR
- **部署**: GitHub Pages

## 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/galenran/text-tool.git
cd text-tool
```

2. 使用任意本地服务器运行（推荐使用 VS Code Live Server）：
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server

# 使用 PHP
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

## 功能使用说明

### 基础文本处理
1. 在文本输入框中输入或粘贴您的文本
2. 点击相应的功能按钮进行处理
3. 处理结果会直接显示在输入框中

### Markdown 预览
1. 在 Markdown 输入框中输入 Markdown 或 HTML 内容
2. 实时预览会自动更新
3. 支持代码语法高亮

### 二维码功能
- **生成二维码**: 输入文本后点击"生成二维码"按钮
- **识别二维码**: 点击"识别二维码图片"按钮，上传图片文件

### 文本对比
1. 在两个文本框中分别输入需要对比的内容
2. 点击"文本对比"按钮
3. 差异会用不同颜色高亮显示

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 邮箱: ranyong330@hotmail.com
- 网站: [https://ryos.cc](https://ryos.cc)

## 更新日志

### v2.0.0 (2025-02-03)
- 🎉 网站全面改版，新增多个内容页面
- ✨ 新增博客系统，包含4篇技术文章
- 📚 新增详细的工具使用指南
- 🌙 支持深色模式切换
- 📱 优化移动端体验
- 🔍 增强 SEO 优化
- 🎨 全新的 UI 设计

### v1.0.0 (2025-01-15)
- 🎊 初始版本发布
- 📝 基础文本处理功能
- 💻 Markdown 预览
- 🔄 编码转换
- 📊 文本分析

## 致谢

感谢所有使用和支持 TextTool 的用户！

---

💡 **提示**: 如果您觉得这个工具有用，请给我们一个 ⭐️ Star！
