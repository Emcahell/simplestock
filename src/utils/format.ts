export function formatUSDPrice(value: number | string): string {
  const num = typeof value === 'string' ? Number(value.replace(/[^0-9.,-]/g, '').replace(',', '.')) : value;
  const n = Number.isFinite(num) ? num : 0;
  // Formato USD: decimal con punto y miles con coma (en-US).
  return n.toLocaleString('en-US', {
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

const SHORT_MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

/**
 * Las fechas se guardan en SQLite con `datetime('now')` (UTC, "YYYY-MM-DD HH:MM:SS")
 * o con `Date.toISOString()` ("...T...Z"). Normaliza ambas para `new Date`.
 */
export function parseStoredDate(value: string): Date {
  const normalized = value.includes('T') ? value : value.replace(' ', 'T');
  const hasTz = normalized.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(normalized);
  return new Date(hasTz ? normalized : `${normalized}Z`);
}

/** Formatea una fecha guardada como "14 Nov 2023, 11:20 AM". */
export function formatDateTimeLabel(value: string): string {
  return formatStoredDate(parseStoredDate(value));
}

export function formatStoredDate(date: Date): string {
  const day = date.getDate();
  const month = SHORT_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes} ${meridiem}`;
}