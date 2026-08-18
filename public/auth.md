# auth.md

Документ описывает, как AI-агенты и автоматизированные клиенты получают доступ к данным TokenBel.
Version: 1.0 · Updated: 2026-08-18 · Contact: https://tokenbel.info/contacts/

## Audience

Этот документ адресован автономным агентам (AI-ассистентам, MCP-клиентам, краулерам),
а не браузерным пользователям. Люди входят в личный кабинет через
https://dashboard.tokenbel.info/ (страница входа: https://tokenbel.info/login/).

## Resources

| Resource | URL | Auth |
| --- | --- | --- |
| Публичный сайт и markdown-версии страниц | `https://tokenbel.info/` (см. `/llms.txt`) | не требуется |
| MCP-сервер (streamable-http) | `https://mcp.tokenbel.info/mcp` | не требуется (анонимный доступ) |
| MCP server card | `https://tokenbel.info/.well-known/mcp/server-card.json` | не требуется |
| AI catalog | `https://tokenbel.info/.well-known/ai-catalog.json` | не требуется |

## Authentication model

OAuth Authorization Server для агентов не публикуется, поэтому этот документ
самодостаточен: OAuth Protected Resource Metadata и Authorization Server Metadata
отсутствуют намеренно, а не по ошибке.

Публичные read-only ресурсы (сайт, markdown-версии, MCP-инструменты поиска по токенам,
акциям, облигациям и эмитентам) доступны **анонимно**: bearer-токен не требуется и
не проверяется. Если клиент всё же отправит `Authorization`, заголовок игнорируется.

## Registration / provisioning

Отдельная регистрация агента для публичного доступа не нужна. Регистрация требуется
только для повышенных лимитов, коммерческого использования и приватных данных
личного кабинета; она выполняется людьми, а не программно.

```json
{
  "agent_auth": {
    "skill": "https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md",
    "register_uri": "https://tokenbel.info/contacts/",
    "identity_types_supported": ["anonymous"],
    "anonymous": {
      "credential_types_supported": ["none"],
      "claim_uri": "https://tokenbel.info/auth.md"
    },
    "methods": [
      {
        "type": "anonymous",
        "description": "Публичный доступ без учётных данных к сайту, markdown-версиям страниц и MCP-серверу.",
        "resource": "https://mcp.tokenbel.info/mcp",
        "credential_types_supported": ["none"],
        "bearer_methods_supported": [],
        "register_uri": "https://tokenbel.info/contacts/",
        "claim_uri": "https://tokenbel.info/auth.md"
      },
      {
        "type": "manual_provisioning",
        "description": "Запрос повышенных лимитов или доступа к приватным данным: заявка через страницу контактов, ответ и условия — по email/Telegram.",
        "register_uri": "https://tokenbel.info/contacts/",
        "credential_types_supported": ["none"]
      }
    ]
  }
}
```

## Credential use

Для анонимного доступа учётные данные не выпускаются и не требуются:
запросы отправляются без заголовка `Authorization`. Если по итогам ручного
согласования агенту выдадут ключ, он передаётся как `Authorization: Bearer <token>`
по HTTPS, не логируется и не публикуется в URL.

## Rate limits and etiquette

- Идентифицируйте себя понятным `User-Agent` со ссылкой на оператора агента.
- Предпочитайте markdown-представления (`Accept: text/markdown` или `<путь>/index.md`) вместо парсинга HTML.
- Соблюдайте `robots.txt`: https://tokenbel.info/robots.txt
- Разумный темп: не более ~1 запроса в секунду; при 429 используйте экспоненциальную паузу.
- Не выполняйте POST на служебные эндпоинты при пассивном сканировании.
