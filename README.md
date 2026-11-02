# softmatras.kz

Новый сайт фабрики ортопедических матрасов Softmatras (Алматы, Астана). Astro 5, статическая сборка, 36 страниц.

```bash
npm install
npm run build   # → dist/
```

Деплой: любой статический хостинг (Vercel, Netlify, Cloudflare Pages, nginx). Папка для публикации — `dist/`.

## SEO / GEO
- Городские посадочные: `/almaty/`, `/astana/`
- Размеры × города: `/almaty/matras-160x200/`, `/astana/matras-180x200/` … (16 страниц)
- Каталог и 6 карточек моделей, «Матрасы на заказ», «Ортопедические матрасы», «Отзывы», «Доставка», «Советы» (OLX/барахолка, сравнение с брендами, как выбрать)
- JSON-LD: Organization, MattressStore ×2, Product/Offer, AggregateRating, Review, FAQPage, VideoObject, BreadcrumbList
- `sitemap-index.xml`, `robots.txt` (открыт для AI-краулеров), `llms.txt`, geo-метатеги, canonical, OpenGraph

## Перед запуском проверить
- актуальные цены (сейчас — прайс из 2ГИС, июль 2024)
- адрес и часы работы шоурума в Алматы, телефон WhatsApp
- условия гарантии/возврата и рассрочки
