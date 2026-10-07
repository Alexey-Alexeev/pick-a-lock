import type { City } from "@/types/city";

type TemplateVars = Record<string, string | undefined>;

export function cityTemplateVars(city: City): TemplateVars {
  return {
    city: city.name,
    cityGenitive: city.genitiveName,
    cityDative: city.dativeName,
    cityPrepositional: city.prepositionalName,
    cityAccusative: city.accusativeName,
  };
}

/** Replaces {{token}} placeholders; leaves unknown tokens untouched so missing data is visible, not silently blank. */
export function interpolate(template: string, vars: TemplateVars): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    const value = vars[key];
    return value !== undefined ? value : match;
  });
}

export function interpolateAll(templates: string[], vars: TemplateVars): string[] {
  return templates.map((t) => interpolate(t, vars));
}
