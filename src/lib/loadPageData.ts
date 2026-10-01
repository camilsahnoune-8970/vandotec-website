export function loadPageData<T extends Record<string, unknown>>(
  data: T,
  fallback: Partial<T> = {}
): T {
  // Alle stats in de JSON-bestanden zijn geverifieerd (mediakit Group Vandotec 2026,
  // zie docs/mediakit-2026.pdf). Vroeger filterde deze helper ongeverifieerde
  // placeholders — niet meer nodig, maar de functie blijft als merge-punt.
  return { ...fallback, ...data };
}
