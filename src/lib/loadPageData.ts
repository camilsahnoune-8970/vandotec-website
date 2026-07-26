export function loadPageData<T extends Record<string, unknown>>(
  data: T,
  fallback: Partial<T> = {}
): T {
  return { ...fallback, ...data };
}
