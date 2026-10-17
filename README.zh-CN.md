# 文图 Wentu

**面向商家的 AI 商品图文与营销素材工作台。**

[在线预览](https://lemon150637.github.io/wentu/) · [English](README.en.md) · [源码](https://github.com/lemon150637/wentu)

文图围绕日常上新与内容制作，提供商品资料整理、商品主图与详情页工作流、图片编辑、批量翻译和推广图文入口。界面使用纸张色、墨绿和编号排版，强调清晰的操作层级与商家工作流程。

## 两种使用方式

### GitHub Pages 在线预览

访问 https://lemon150637.github.io/wentu/ 。Pages 部署的是 `pages/` 内独立的静态界面：

- 查看复古清新的工作台设计，以及商品创作、翻译、小红书图文入口。
- 在浏览器内选择与预览参考图，填写商品名称、平台和卖点。
- 导出用户填写的 JSON 创作资料。

**在线预览不执行 AI 生成、图片翻译、数据库读写或服务端任务。** 图片只在当前页面中预览，不上传；导出资料包含图片文件名，不包含图片本身。页面不要求 API Key。刷新页面会清空尚未导出的表单和图片选择。

### 本地完整应用

仓库保留 Next.js、SQLite 和模型调用源码。完整功能需要在自己的电脑或支持 Node.js 的服务器上运行。GitHub Pages 不能托管这部分后端。

## 本地运行

准备 Git 和 **Node.js 24**。Windows PowerShell：

```powershell
git clone https://github.com/lemon150637/wentu.git
cd wentu
npm.cmd ci
Copy-Item .env.example .env
```

在 `.env` 中将 `APP_SECRET` 设置为至少 12 字符的随机密钥。可用下面的命令生成一个值，再填入文件；请勿公开：

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

然后逐行运行：

```powershell
npm.cmd run prisma:generate
npm.cmd run prisma:migrate
npm.cmd run docs:sync
npm.cmd run dev
```

打开终端 `Local:` 显示的网址。默认尝试 `http://localhost:3000`，被占用时可能改用 3001。保持终端开启。macOS/Linux 使用 `npm` 替代 `npm.cmd`，使用 `cp .env.example .env` 复制配置。

## 模型配置与实际限制

在本地应用的“API 配置”中填写自己的服务地址与密钥。密钥保存在当前浏览器，并随本地请求传递，不应提交到仓库。

DeepSeek 官方地址：`https://api.deepseek.com`。本项目为官方域名使用 `json_object`，在提示词中提供目标 Schema，并在返回后由 Zod 校验；其他 OpenAI 兼容服务保留严格 JSON Schema 请求。模型名称应从服务实际返回的模型列表中选择，服务名称只是备注。

- DeepSeek 文本连接成功，不等于图片生成或图片识别已可用。
- 当前继承的 V4 详情工作流仍要求特定模型（`gpt-6-luna`、`gpt-image-2.5-flare`）；任意模型及跨服务组合的整套适配尚未完成。
- 视觉分析、图片生成和编辑需要服务支持对应能力。模型名称与实际能力以服务端验证为准。
- 本次适配已通过模拟接口测试，未宣称在真实付费服务上完成全流程验收。
- API 调用可能产生费用。商品参数、营销说法和翻译结果需人工核实。

## 项目结构

- `app/`、`components/`：本地应用页面与交互。
- `lib/`：模型调用、任务、图片与存储逻辑。
- `prisma/`：数据库结构与迁移，不包含个人数据库。
- `pages/`：独立静态预览，GitHub Pages 只发布此目录。
- `.github/workflows/pages.yml`：推送 main 后自动部署静态页面。
- `tests/`：隔离数据库与模拟 Provider 的测试。

## 开发与验证

```powershell
npm.cmd run typecheck
node --import tsx --test tests/provider-compatibility.test.ts tests/provider-errors.test.ts
node --check pages/app.js
```

Pages 不需要安装 npm 依赖。可以用 `python -m http.server 8080 --directory pages` 本地预览静态页面；在浏览器打开 `http://localhost:8080`。

## GitHub Pages 部署

仓库 Settings → Pages → Source 选择 **GitHub Actions**。`.github/workflows/pages.yml` 会把 `pages/` 发布到项目站点；无需把 Next.js 的 `.next` 或 `node_modules` 上传。也可在 Actions 中手动运行 “Deploy Wentu to GitHub Pages”。

## 公开文件范围

不提交 `.env`、API Key、`node_modules/`、`.next/`、`storage/`、SQLite 数据库、个人上传文件及运行日志。此发布副本也不包含上游示例商品图片、Word 教程或个人本地操作记录。原始本地数据与项目不受发布影响。

## 开源来源与许可

文图基于 [灵矩绘境维护的 MxPage](https://github.com/ziguishian/MxPage) 二次开发。基础工作流、图片编辑、任务和本地存储能力来自上游；本仓库的主要改动为文图品牌、商家定位、复古清新 UI、DeepSeek JSON 模式兼容与独立 Pages 预览。

源码采用 MIT，保留原作者版权及 [LICENSE](LICENSE)。上游文档保留于 `docs/`，其中历史品牌与版本描述不代表本仓库新增承诺。素材、生成结果和模型服务需遵守各自适用的条款。