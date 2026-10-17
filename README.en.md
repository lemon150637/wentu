# Wentu 文图

**An AI product-content and marketing-visual workspace for merchants.**

[Live preview](https://lemon150637.github.io/wentu/) · [简体中文](README.md) · [Source](https://github.com/lemon150637/wentu)

Wentu helps merchants prepare product information, plan copy and visuals, and work with product images, detail pages, translations and social content. Its interface combines warm paper colors, botanical green and numbered editorial layouts.

## Static preview vs. full application

The **GitHub Pages preview** serves only `pages/`. You can explore the interface, preview reference images locally, enter product details and download a JSON brief. Images are not uploaded. The exported brief contains filenames, not image bytes. Unsaved page state is cleared on refresh.

**The preview does not run AI generation, translation, database operations or server-side jobs, and never asks for an API key.** The full Next.js application must run locally or on a Node.js server. GitHub Pages cannot run its backend.

## Run locally

Requirements: Git and **Node.js 24**.

```bash
git clone https://github.com/lemon150637/wentu.git
cd wentu
npm ci
cp .env.example .env
```

On Windows PowerShell, use `npm.cmd` instead of `npm` and `Copy-Item .env.example .env` instead of `cp`.

Set `APP_SECRET` in `.env` to a random secret of at least 12 characters. Generate one locally with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Then run each command:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run docs:sync
npm run dev
```

Open the `Local:` URL printed in the terminal. Port 3000 is attempted first; another port may be selected when occupied. Keep the terminal open.

## Model configuration and limitations

Configure your provider URL and API key in the local application's settings. Keys remain in the current browser and are passed to the local server per request. Never commit them.

For the official DeepSeek endpoint, use `https://api.deepseek.com`. Official-domain requests use JSON Object mode with the target schema included in the prompt, followed by local Zod validation. Other compatible providers retain strict JSON Schema mode. Select model IDs actually returned by the provider; the service label does not select a model.

- A working DeepSeek text connection does not provide image generation or vision capabilities.
- The inherited V4 detail workflow still requires specific models (`gpt-6-luna` and `gpt-image-2.5-flare`). Arbitrary-model and multi-provider end-to-end compatibility is not implemented.
- Image analysis, generation and editing require separately supported capabilities.
- Compatibility tests use mocked providers; successful real paid end-to-end generation is not claimed.
- Model calls may incur charges. Verify product specifications, claims and translations manually.

## Structure

- `app/`, `components/`: full application UI and routes.
- `lib/`: providers, tasks, editing and storage.
- `prisma/`: schema and migrations, without user databases.
- `pages/`: self-contained static preview.
- `.github/workflows/pages.yml`: GitHub Pages deployment.
- `tests/`: isolated database and mocked-provider tests.

## Checks

```bash
npm run typecheck
node --import tsx --test tests/provider-compatibility.test.ts tests/provider-errors.test.ts
node --check pages/app.js
```

To preview the static site without npm dependencies:

```bash
python -m http.server 8080 --directory pages
```

Open `http://localhost:8080`.

## GitHub Pages

Choose **GitHub Actions** under Settings → Pages → Source. Pushes to `main` affecting the static site deploy `pages/` with the supplied workflow. You can also run “Deploy Wentu to GitHub Pages” manually. Never publish `.env`, `.next`, `node_modules` or application databases.

The public snapshot excludes keys, environment files, dependencies, runtime storage, personal uploads, logs, original sample product imagery, Word tutorials and local operation notes.

## Attribution and license

Based on [MxPage by 灵矩绘境](https://github.com/ziguishian/MxPage). The upstream provides the foundational workflows, editing, tasks and storage. Wentu adds merchant-facing branding, a retro botanical interface, DeepSeek JSON-mode compatibility and an independent Pages preview.

Licensed under MIT; the original copyright notice and [LICENSE](LICENSE) are preserved. Historical upstream documents under `docs/` are references, not new feature guarantees. Assets, generated outputs and model services remain subject to their respective terms.