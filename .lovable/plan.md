

## Страница "Статистика вторичного рынка"

Создание новой страницы `/statistics/secondmarket/` с 6 графиками, использующими данные из API `hype.tokenbel.info`.

### Что будет создано

Новая страница со следующими графиками (по скриншотам):

1. **Donut chart** -- Распределение по платформам и операциям (Finstore/Fainex, Покупка/Продажа)
2. **Horizontal bar chart** -- Топ токенов по количеству предложений (Покупка/Продажа)
3. **Horizontal bar chart** -- Топ компаний по количеству предложений (Покупка/Продажа)
4. **Line chart** -- Всего операций по дням
5. **Line chart** -- Операции по платформам по дням
6. **Stacked bar chart** -- Операции по платформам и типам

Страница будет включать переключатель периода (7d, 30d, 90d, all) как на скриншоте.

### Источники данных (4 API-эндпоинта)

| Endpoint | Параметры | Графики |
|----------|-----------|---------|
| `operations_by_platform_type` | `period` | Donut chart (#1), Stacked bar (#6) |
| `top_emissions` | `period`, `limit` | Bar chart (#2) |
| `top_companies` | `period`, `limit` | Bar chart (#3) |
| `operations_time_series` | `period` | Line charts (#4, #5) |

Base URL: `https://hype.tokenbel.info/api/statistics/secondmarket`

### Технические детали

**Новые файлы:**

1. `statistics/secondmarket/index.html` -- основная страница с Chart.js (CDN), Alpine.js для переключения периода, fetch-вызовы к API

**Изменяемые файлы:**

2. `vite.config.ts` -- добавить `statisticsSecondmarket` в `rollupOptions.input`
3. `tailwind.config.ts` -- добавить `./statistics/**/*.html` в `content`

**Библиотеки (CDN, без npm):**
- Chart.js 4.x via `https://cdn.jsdelivr.net/npm/chart.js`

**Архитектура страницы:**
- Alpine.js `x-data` для управления состоянием (выбранный период, загрузка)
- При смене периода -- повторный fetch всех 4 эндпоинтов
- Chart.js инстансы пересоздаются при обновлении данных
- Используется стандартный header/footer через Handlebars partials (`{{> header}}`, `{{> footer}}`)
- Цветовая схема графиков: синий/голубой (Finstore), оранжевый/красный (Fainex), зеленый (Покупка), розовый (Продажа) -- как на скриншотах

**Макет:**
- Верхний блок: заголовок + переключатель периода (кнопки-chips)
- Первый ряд: donut chart (слева) + stacked bar (справа) -- `grid-cols-1 lg:grid-cols-2`
- Второй ряд: два horizontal bar charts (топ токенов, топ компаний) -- `grid-cols-1 lg:grid-cols-2`
- Третий ряд: два line charts (всего операций, по платформам) -- `grid-cols-1 lg:grid-cols-2`

