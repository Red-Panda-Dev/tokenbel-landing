

## Add "Формирование портфеля" benefit to login page

Add a new benefit card to the "Преимущества личного кабинета" grid on `login/index.html`, following the existing card pattern.

### What will be added

A new card with:
- **Title**: "Формирование портфеля"
- **Description**: Text about creating, managing, tracking personal token portfolios and calculating financial parameters (HHI, Entropy, leverage ratios, etc.)
- **Icon**: Portfolio/pie-chart style icon in a teal/cyan color scheme (`bg-teal-100`, `text-teal-600`) to differentiate from existing cards
- **Position**: After the last existing benefit (RSS), maintaining the 2-column grid layout

### Technical details

**File: `login/index.html`**

Insert a new benefit `<div>` block after the RSS benefit card (around line 720), using the same pattern:

```html
<div class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
  <div class="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
    <svg ...> <!-- pie-chart or portfolio icon --> </svg>
  </div>
  <div>
    <h3 class="font-semibold text-gray-900 mb-1">Формирование портфеля</h3>
    <p class="text-gray-600 text-sm">
      Создавайте персональный портфель токенов, отслеживайте его состав
      и рассчитывайте финансовые показатели: доходность, HHI, энтропию
      и коэффициент рычага
    </p>
  </div>
</div>
```

Also update the JSON-LD `featureList` array to include "Формирование и аналитика портфеля токенов".

No other files need changes.

