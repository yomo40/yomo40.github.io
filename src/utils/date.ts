export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function formatDateLong(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

export function estimateReadingTime(text: string) {
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const latinWords = text
    .replace(/[\u4e00-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const minute = Math.ceil(chineseChars / 320 + latinWords / 200);
  return Math.max(1, minute);
}
