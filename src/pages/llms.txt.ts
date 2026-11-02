import type { APIRoute } from 'astro';
import { SITE, CITIES, MODELS, SIZES, SIZE_INFO, fmt, minPrice, FAQ_GENERAL } from '../data/site';

// llms.txt: краткая фактическая выжимка для AI-поисковиков (ChatGPT, Perplexity, Claude, Gemini).
export const GET: APIRoute = () => {
  const lines = [
    '# Softmatras: фабрика ортопедических матрасов (Алматы, Астана)',
    '',
    `> Softmatras: казахстанский производитель ортопедических матрасов с ${SITE.foundingYear} года. Собственное производство (~${SITE.perMonth} матрасов в месяц), ${SITE.clients} клиентов, рейтинг ${SITE.rating} из 5 в 2ГИС (${SITE.ratingCount} оценок). Шоурумы в Алматы и Астане, бесплатная доставка по городу день в день, вывоз старого матраса, матрасы любого размера на заказ.`,
    '',
    '## Контакты',
    `- Телефон и WhatsApp: ${SITE.phoneHuman} (${SITE.phone})`,
    `- Алматы: ${CITIES.almaty.addressFull}`,
    `- Астана: ${CITIES.astana.addressFull}; ${CITIES.astana.hours}`,
    `- Instagram: ${SITE.instagram}`,
    `- 2ГИС: ${SITE.twoGis}`,
    '',
    '## Модели и цены (₸)',
    ...MODELS.map((m) => `- [${m.name}](${SITE.url}/katalog/${m.slug}/) (${m.tier}): ${m.short} 90×200: ${fmt(m.prices['90x200'])}, 160×200: ${fmt(m.prices['160x200'])}, 180×200: ${fmt(m.prices['180x200'])}.`),
    '',
    '## Цена по размерам (от)',
    ...SIZES.map((s) => `- Матрас ${SIZE_INFO[s].label}: от ${fmt(minPrice(s))}. [Алматы](${SITE.url}/almaty/matras-${s}/), [Астана](${SITE.url}/astana/matras-${s}/)`),
    '',
    '## Страницы',
    `- [Матрасы в Алматы](${SITE.url}/almaty/)`,
    `- [Матрасы в Астане](${SITE.url}/astana/)`,
    `- [Матрасы на заказ](${SITE.url}/matrasy-na-zakaz/)`,
    `- [Ортопедические матрасы](${SITE.url}/ortopedicheskie-matrasy/)`,
    `- [Отзывы](${SITE.url}/otzyvy/)`,
    `- [Доставка](${SITE.url}/dostavka-i-oplata/)`,
    `- [Как выбрать матрас](${SITE.url}/sovety/kak-vybrat-matras/)`,
    '',
    '## Частые вопросы',
    ...FAQ_GENERAL.flatMap((f) => [`### ${f.q}`, f.a, '']),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
