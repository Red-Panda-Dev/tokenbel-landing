# Markdown for Agents: markdown-версия каждой страницы

Цель: агенты (ChatGPT, Claude, Perplexity, Cloudflare AI crawlers) получают чистый текст без HTML-разметки. Браузеры продолжают получать HTML.

## Что делаем

1. **Markdown-файл для каждой страницы** — статические `.md`, генерируемые в `dist/` при сборке:

```text
/               -> /index.md
/pricing/       -> /pricing/index.md
/faq/           -> /faq.md (уже есть, переиспользуем) + /faq/index.md
/statistics/secondmarket/ -> /statistics/secondmarket/index.md
/contacts/      -> /contacts/index.md
/rss/           -> /rss/index.md
/login/         -> /login/index.md
```

Каждый файл: H1 = заголовок страницы, краткое описание, основные секции текстом, ключевые ссылки списком, без навигации/футера/скриптов/аналитики. Содержимое пишем вручную по факту текущих страниц (контент лендинга статичен, автогенерация из HTML даст мусор).

2. **Content negotiation** — Cloudflare Pages Function `functions/_middleware.js`:
   - если `Accept` содержит `text/markdown` (и не содержит `text/html` с большим q), отдаём соответствующий `.md` с `Content-Type: text/markdown; charset=utf-8`;
   - иначе — обычный HTML;
   - всегда добавляем `Vary: Accept`;
   - если `.md` для маршрута нет — отдаём HTML как обычно.

3. **Обнаружимость** — в `<head>` каждой страницы:
   `<link rel="alternate" type="text/markdown" href="/<путь>/index.md">`
   Плюс суффикс-доступ: `/pricing/index.md` работает напрямую как статический файл (без negotiation), это фолбэк для агентов, не умеющих в Accept.

4. **Обновляем `public/llms.txt`** — секция со списком markdown-версий всех страниц.

5. **`public/robots.txt`** — явно `Allow: /*.md$` не требуется (всё уже Allow), но добавим комментарий-указатель на markdown-версии.

## Технические детали

- Файлы `.md` кладём в `public/` по путям, повторяющим маршруты (`public/pricing/index.md` и т.д.) — Vite копирует `public/` в `dist/` как есть, изменения в `vite.config.ts` не нужны.
- `functions/_middleware.js` — Cloudflare Pages Functions; при деплое на Lovable-хостинг функция не выполняется, но прямые `.md`-URL и `<link rel="alternate">` продолжают работать. То есть деградация мягкая.
- Никакого React/сборочной логики не добавляем — только статические файлы + одна edge-функция.
- Метаданные внутри каждого `.md` — YAML front matter (`title`, `description`, `url`, `updated`), как рекомендует Cloudflare.

## Проверка

- `curl -H "Accept: text/markdown" https://tokenbel.info/pricing/` -> markdown (после деплоя на Cloudflare).
- `curl https://tokenbel.info/pricing/index.md` -> markdown.
- Обычный запрос браузера -> HTML без изменений.
