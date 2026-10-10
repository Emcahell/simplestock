export function formatUSDPrice(value: number | string): string {
  const num = typeof value === 'string' ? Number(value.replace(/[^0-9.,-]/g, '').replace(',', '.')) : value;
  const n = Number.isFinite(num) ? num : 0;
  // Formato simple con 2 decimales
  return n.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseUSDPrice(input: string): number {
  const s = input.replace(/[^0-9.,]/g, '');
  if (!s) return 0;
  // Intenta detectar: si hay coma y punto, usa coma como decimal? común ES
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');
  if (lastComma > lastDot) {
    const intPart = s.slice(0, lastComma).replace(/\./g, '').replace(/,/g, '');
    const decPart = s.slice(lastComma + 1);
    return Number(`${intPart}.${decPart}`) || 0;
  }
  const intPart = s.slice(0, lastDot).replace(/,/g, '');
  const decPart = lastDot >= 0 ? s.slice(lastDot + 1) : '';
  return Number(`${intPart}.${decPart}`) || 0;
}