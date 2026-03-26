export function withBase(path: string, base = import.meta.env.BASE_URL) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  const safeBase = typeof base === "string" && base ? base : "/";
  const normalizedBase = safeBase.endsWith("/")
    ? safeBase.slice(0, -1)
    : safeBase;
  if (!normalizedBase) {
    return path;
  }

  if (path.startsWith(`${normalizedBase}/`) || path === normalizedBase) {
    return path;
  }

  return `${normalizedBase}${path}`;
}
