/** Deterministic (not random) string hash — the same input always picks the same variant,
 *  so a given city's wording stays stable across visits instead of changing on every render. */
export function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function pickVariant<T>(variants: T[], key: string): T {
  return variants[hashString(key) % variants.length];
}

/**
 * Narrower phrasings of each service — "Врезка замка в железную дверь" under "Установка замков".
 *
 * These were previously rotated per city to fill the Title and H1, which cost far more than the
 * duplication it avoided: the head term survived in only a fraction of cities (7 of 70 for
 * установка), and Moscow's install page was headed "Врезка ночной задвижки". A city page has to
 * win its own head term first; uniqueness comes from the per-city intro, price and geography.
 *
 * They stay here as the raw material for in-page section headings (one H2 per variant, with a
 * couple of sentences under each), which reaches the same long tail without the cost.
 */
export const SERVICE_NAME_VARIANTS: Record<string, string[]> = {
  "vskrytie-zamkov": [
    "Вскрытие замков",
    "Аварийное вскрытие замков",
    "Срочное вскрытие замков",
    "Вскрытие дверного замка",
  ],
  "vskrytie-dverey": [
    "Вскрытие дверей",
    "Вскрытие входной двери",
    "Вскрытие межкомнатной двери",
    "Открытие заклинившей двери",
  ],
  "vskrytie-kvartir": [
    "Вскрытие квартир",
    "Вскрытие входной двери квартиры",
    "Вскрытие замка в квартире",
    "Экстренное вскрытие квартиры",
  ],
  "vskrytie-domov": [
    "Вскрытие домов",
    "Вскрытие частного дома",
    "Вскрытие калитки и ворот",
    "Вскрытие загородного дома",
  ],
  "vskrytie-garazhey": [
    "Вскрытие гаражей",
    "Вскрытие гаражного замка",
    "Вскрытие навесного замка на гараже",
    "Вскрытие гаражных ворот",
  ],
  "vskrytie-avtomobiley": [
    "Вскрытие автомобилей",
    "Вскрытие машины",
    "Разблокировка автомобиля",
    "Вскрытие двери автомобиля",
  ],
  "vskrytie-seyfov": [
    "Вскрытие сейфов",
    "Вскрытие кодового замка сейфа",
    "Вскрытие оружейного шкафа",
    "Аварийное вскрытие сейфа",
  ],
  "zamena-zamkov": [
    "Замена замков",
    "Замена замка в деревянной двери",
    "Замена замка в железной двери",
    "Замена накладного замка",
  ],
  "zamena-lichinki": [
    "Замена личинки замка",
    "Замена цилиндра замка",
    "Замена кода замка",
    "Смена личинки входной двери",
  ],
  "ustanovka-zamkov": [
    "Установка замков",
    "Врезка замка в деревянную дверь",
    "Врезка замка в железную дверь",
    "Врезка ручки в дверь",
    "Врезка дополнительного замка",
    "Врезка ночной задвижки",
  ],
  "izvlechenie-slomannogo-klyucha": [
    "Извлечение сломанного ключа",
    "Извлечение ключа из замка",
    "Удаление обломка ключа",
    "Извлечение ключа из двери",
  ],
  "perekodirovka-zamka": [
    "Перекодировка замка",
    "Перекодировка личинки",
    "Смена кода замка",
    "Перенастройка замка под новый ключ",
  ],
};

/**
 * Alternate hero-intro wordings for a service — rotated per city so the city+service page
 * doesn't show byte-for-byte the same paragraph (with only the city name swapped) as every
 * other city. Uses the same {{token}} placeholders as content/services/*.json descriptions.
 */
export const SERVICE_INTRO_VARIANTS: Record<string, string[]> = {
  "vskrytie-zamkov": [
    "Если ключ потерян, сломан в замке или замок заклинило изнутри, мастер приедет в {{cityAccusative}} и откроет дверь без повреждения полотна и короба. Работаем со всеми типами запирающих механизмов — от простых цилиндровых до многоточечных сувальдных.",
    "Выезжаем по {{cityDative}} на вскрытие замков любой сложности — от захлопнувшейся двери до провернувшейся личинки. Мастер подбирает инструмент под конкретный механизм на месте, стараясь обойтись без повреждения двери.",
    "Потеряли ключи или замок заклинило? В {{cityPrepositional}} мастер приезжает с полным набором инструмента для вскрытия и диагностирует механизм прямо на месте, прежде чем начать работу.",
    "Срочное вскрытие замков в {{cityPrepositional}} — для ситуаций, когда ключ сломался в скважине, личинка провернулась или дверь захлопнулась сама. Приезжаем с инструментом под цилиндровые, сувальдные и кодовые замки.",
  ],
};

export function getLocalizedServiceIntro(
  citySlug: string,
  service: { slug: string; description: string },
  vars: Record<string, string | undefined>
): string {
  const variants = SERVICE_INTRO_VARIANTS[service.slug];
  const template = variants ? pickVariant(variants, `${citySlug}:${service.slug}:intro`) : service.description;
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    const value = vars[key];
    return value !== undefined ? value : match;
  });
}
