# Seedance 分镜提示词生成器

一款纯前端 Web 应用，帮助您快速生成 Seedance 视频生成提示词。支持剧本管理、角色库、配方库和提示词生成功能。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Web%20App-orange)

## 功能特性

### 📝 剧本管理
- 创建、编辑、删除剧本
- 剧本列表展示
- 剧本信息编辑（名称、简介）

### 👤 角色库管理
- 添加、编辑、删除角色
- 角色信息：名称、外貌、服装、武器
- 支持 `@[角色名]` 语法引用角色

### 🎬 分镜提示词生成
- 创建、编辑、删除分镜
- 选择配方类型
- 自动组装提示词
- 一键复制提示词

### 🧪 配方库
内置 13 种经过验证的配方：

| 配方ID | 名称 | 适用场景 |
|--------|------|----------|
| EPIC_ARMY_MARCH_001 | 史诗大远景 | 军队行进、史诗场面 |
| HERO_RIDING_MEDIUM_001 | 英雄骑马中近景 | 英雄登场、骑马行进 |
| DIALOGUE_SPEAKING_MEDIUM_001 | 对话中景 | 对话、说话场景 |
| EMOTION_FACE_CLOSEUP_001 | 情绪特写 | 面部情绪特写 |
| XIANXIA_EMOTION_CLOSEUP_001 | 仙侠情感唯美 | 仙侠情感、唯美展示 |
| XIANXIA_AWAKENING_TENSE_001 | 觉醒紧张 | 觉醒、变身、突破 |
| XIANXIA_ROMANCE_CLOSEUP_001 | 暧昧浪漫 | 仙侠情感、暧昧互动 |
| XIANXIA_CLOSE_COMBAT_001 | 近身格斗 | 近身格斗、拳脚对决 |
| XIANXIA_SWORD_DUEL_001 | 剑法对决 | 剑客对决、兵器交锋 |
| XIANXIA_SPELL_CASTING_001 | 法术释放 | 法术对决、灵力释放 |
| XIANXIA_LIGHTNESS_SKILL_001 | 轻功身法 | 轻功飞行、空中动作 |
| XIANXIA_ULTIMATE_SKILL_001 | 大招爆发 | 大招释放、最终决战 |
| XIANXIA_CHASE_001 | 追逐战 | 追逐、逃亡 |

### ⚙️ API 配置
- 预设小鲸API端点
- 支持自定义API配置
- 数据本地存储

### 💾 数据管理
- LocalStorage 本地存储
- JSON 数据导出/导入
- 数据备份与恢复

## 技术栈

- **HTML5** - 语义化标签
- **CSS3** - 现代样式，响应式设计
- **JavaScript** - 原生 ES6+，无框架依赖
- **LocalStorage** - 本地数据持久化

## 目录结构

```
seedance-prompt-generator/
├── index.html              # 主页面
├── css/
│   └── style.css           # 样式文件
├── js/
│   ├── app.js              # 主应用逻辑
│   ├── recipe-library.js   # 配方库数据
│   └── prompt-generator.js # 提示词生成逻辑
└── README.md               # 使用说明
```

## 快速开始

### 本地预览

#### 方法一：直接打开
直接用浏览器打开 `index.html` 文件即可使用。

#### 方法二：使用本地服务器

**Python（推荐）：**
```bash
# 进入项目目录
cd seedance-prompt-generator

# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# 访问 http://localhost:8080
```

**Node.js：**
```bash
# 安装 http-server
npx http-server -p 8080

# 访问 http://localhost:8080
```

**VS Code Live Server：**
如果使用 VS Code，安装 "Live Server" 插件，右键点击 `index.html` 选择 "Open with Live Server"。

## 使用指南

### 1. 创建剧本
1. 点击右上角「新建剧本」按钮
2. 输入剧本名称和简介
3. 点击「创建」完成

### 2. 管理角色
1. 进入剧本详情，点击「角色库」标签
2. 点击「添加角色」按钮
3. 填写角色信息（名称必填，其他可选）：
   - **角色名称**：如"霍惊尘"
   - **外貌描述**：如"20岁青年，剑眉星目"
   - **服装描述**：如"黑色玄铁铠甲"
   - **武器描述**：如"青锋长剑"

### 3. 创建分镜
1. 点击「分镜列表」标签
2. 点击「创建分镜」按钮
3. 填写分镜信息：
   - **时长**：视频秒数（1-60秒）
   - **配方选择**：从下拉菜单选择合适的配方
   - **场景描述**：描述画面场景，使用 `@[角色名]` 引用角色
   - **动作描述**：描述角色动作
   - **运镜补充**：如有特殊运镜要求可填写

### 4. 生成提示词
1. 在分镜卡片上点击「生成」按钮（灯泡图标）
2. 系统自动组合配方参数生成完整提示词
3. 点击提示词右上角的「复制」按钮复制到剪贴板

### 5. 使用提示词
将生成的提示词复制到 Seedance 或其他 AI 视频生成工具中使用。

## 角色引用语法

在场景描述或动作描述中使用 `@[角色名]` 引用角色：

```
@[霍惊尘] 与 @[黑衣刺客首领] 相对而立，剑尖指向对方
```

生成时会自动替换为角色的完整描述：
```
霍惊尘：20岁青年，剑眉星目，黑色玄铁铠甲，手持青锋长剑
```

## 部署到 GitHub Pages

### 步骤 1：创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角「+」→「New repository」
3. 填写仓库名称，如 `seedance-prompt-generator`
4. 选择 Public（公开）或 Private（私有）
5. 点击「Create repository」

### 步骤 2：上传代码

**方法一：使用 Git 命令行**
```bash
# 进入项目目录
cd seedance-prompt-generator

# 初始化 Git 仓库
git init

# 添加远程仓库（替换 YOUR_USERNAME 为你的用户名）
git remote add origin https://github.com/YOUR_USERNAME/seedance-prompt-generator.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送
git branch -M main
git push -u origin main
```

**方法二：使用 GitHub 网页上传**
1. 在仓库页面点击「uploading an existing file」
2. 将项目所有文件拖拽到上传区域
3. 点击「Commit changes」

### 步骤 3：启用 GitHub Pages

1. 进入仓库「Settings」选项卡
2. 左侧菜单找到「Pages」
3. 在「Source」部分：
   - 选择 `main` 分支
   - 选择 `/ (root)` 目录
4. 点击「Save」
5. 等待几秒钟，页面顶部会显示访问地址：
   ```
   Your site is published at https://YOUR_USERNAME.github.io/seedance-prompt-generator/
   ```

### 步骤 4：访问你的网站

通过显示的 URL 访问你的应用。

## 自定义域名（可选）

如果你有自己的域名，可以绑定到 GitHub Pages：

1. 在仓库「Settings」→「Pages」中
2. 输入你的自定义域名
3. 在你的域名 DNS 设置中添加：
   - A 记录：`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - CNAME 记录：`YOUR_USERNAME.github.io`

## 数据存储说明

所有数据存储在浏览器 LocalStorage 中：
- **剧本数据**：`seedance_scripts`
- **设置数据**：`seedance_settings`

### 数据导出
定期导出数据备份，防止浏览器清除导致数据丢失。

### 数据清除
清除浏览器数据会导致本地存储的数据丢失，请谨慎操作。

## 浏览器兼容性

| 浏览器 | 最低版本 | 支持状态 |
|--------|----------|----------|
| Chrome | 80+ | ✅ 完全支持 |
| Firefox | 75+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 80+ | ✅ 完全支持 |
| 移动端浏览器 | 现代版 | ✅ 支持 |

## 常见问题

### Q: 数据存储在哪里？
A: 数据存储在浏览器的 LocalStorage 中，不会上传到任何服务器。

### Q: 如何备份数据？
A: 在「设置」页面点击「导出数据」按钮，会下载一个 JSON 文件。

### Q: 如何恢复数据？
A: 在「设置」页面点击「导入数据」按钮，选择之前导出的 JSON 文件。

### Q: 可以离线使用吗？
A: 可以！首次加载后，应用会缓存到浏览器中，无需网络即可使用。

### Q: 如何添加新的配方？
A: 目前需要修改 `js/recipe-library.js` 文件添加新配方。未来版本会支持自定义配方。

## 更新日志

### v1.0.0 (2024-01-01)
- ✨ 初始版本发布
- 📝 剧本管理功能
- 👤 角色库管理
- 🎬 分镜提示词生成
- 🧪 13 种内置配方
- ⚙️ API 配置
- 💾 数据导入/导出

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

[MIT License](LICENSE)

---

Made with ❤️ for AI Video Creators
