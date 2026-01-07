# Makefile для автоматизации работы с Tailwind CSS 4.1

# Пути к файлам
INPUT_CSS = static/input.css
OUTPUT_CSS = static/landing.css

# Команда для установки зависимостей (если нужно)
install:
	npm install

# run dev server
dev:
	npm run dev

# Основная команда для отслеживания изменений и обновления стилей "на лету"
# Используется CLI @tailwindcss/cli v4
# Флаг -c указывает на файл конфигурации, так как он находится в корне
watch:
	NODE_ENV=production npx @tailwindcss/cli -i $(INPUT_CSS) -o $(OUTPUT_CSS) -c tailwind.config.ts --watch

# Сборка стилей для продакшена (минификация)
build:
	npx @tailwindcss/cli -i $(INPUT_CSS) -o $(OUTPUT_CSS) -c tailwind.config.ts --minify

# Automatically format and refactor HTML code in site/ directory
refactor-html:
	@echo "Installing/updating prettier..."
	npm install --save-dev prettier
	@echo "Formatting HTML files in site/ directory..."
	npx prettier --write **/*.html || \
	(echo "HTML formatting completed with some errors. Check the output above for syntax issues."; exit 0)

.PHONY: install watch build
