# Softmatras: сайт фабрики матрасов (Алматы, Астана)

Статический сайт на Astro 5. Цель: продажи через WhatsApp и SEO/GEO по Алматы и Астане.

## Команды
- `npm install` · `npm run dev` · `npm run build` (результат в `dist/`) · `npm run preview`

## Где что
- `src/data/site.ts`: ВСЕ данные: контакты, адреса, модели и цены, размеры, отзывы, видео, FAQ. Меняйте цены/контакты только здесь.
- `src/data/articles.ts`: статьи раздела «Советы».
- `src/lib/schema.ts`: JSON-LD (Organization, MattressStore, Product, FAQ, Review, VideoObject, BreadcrumbList).
- `src/pages/[city]/index.astro`: /almaty/, /astana/; `src/pages/[city]/[size].astro`: 16 страниц «матрас 160×200 в Астане» и т.п.
- `src/pages/llms.txt.ts`: выжимка для AI-поисковиков.

## Правила
- Отзывы только реальные (2ГИС), тексты не редактировать.
- Каталог и цены: `src/data/products.ts` (перенесено с softmatras.kz, ноябрь 2026). 22 товара: матрасы, топперы, наматрасники, подушки.
- Дизайн: фон #f1f1f1, чистый чёрный, акцент #e5528a, шрифт Onest, номера разделов «(01)». Референс: mt-webdesign.ru.
- Не использовать длинное тире (—) в текстах сайта: читается как текст ИИ.
- Дизайн-скиллы проекта в `.claude/skills` (frontend-design, taste-skill, impeccable, emil-design-eng и др.).
