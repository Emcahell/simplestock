export const PRICE_MAX_DIGITS = 13;

/** Quita todo lo que no sea un dígito y limita la longitud. */
export function toPriceDigits(input: string): string {
  const stripped = input.replace(/[^0-9]/g, '');
  return stripped.slice(0, PRICE_MAX_DIGITS).replace(/^0+(?=\d)/, '');
}

/**
 * Renderiza la secuencia de dígitos al estilo caja registradora: cada dígito
 * que se escribe se agrega por la derecha y el punto decimal queda fijo a dos
 * posiciones (una para el primer dígito). Uso de puntos como separadores de
 * miles y decimales (solo USD).
 *
 *   "1"  -> "0.1"          "1234"   -> "12.34"
 *   "12" -> "0.12"         "123456" -> "1.234.56"
 *   "123"-> "1.23"         "1234567"-> "12.345.67"
 */
export function renderPriceDigits(digits: string): string {
  if (!digits) return '';
  if (digits === '0') return '0.00';
  if (digits.length === 1) return `0.${digits}`;
  const intPart = digits.slice(0, -2);
  const decPart = digits.slice(-2);
  const grouped = intPart ? groupThousands(intPart) : '0';
  return `${grouped}.${decPart}`;
}

/** Interpreta la secuencia de dígitos como valor numérico en dólares. */
export function priceDigitsToValue(digits: string): number {
  if (!digits) return 0;
  if (digits.length === 1) return Number(digits) / 10;
  return Number(digits) / 100;
}

/** Convierte un precio guardado de vuelta a la secuencia de dígitos. */
export function valueToPriceDigits(value: number): string {
  if (!value || value <= 0) return '';
  const cents = Math.round(value * 100);
  return String(cents).padStart(2, '0');
}

/** Detecta el dígito nuevo cuando se insertó uno en medio de la secuencia. */
export function findExtraDigit(raw: string, prev: string): string {
  let i = 0;
  let j = 0;
  while (i < raw.length) {
    if (j < prev.length && raw[i] === prev[j]) {
      i += 1;
      j += 1;
    } else {
      return raw[i];
    }
  }
  return raw[raw.length - 1];
}

function groupThousands(intPart: string): string {
  if (intPart.length <= 3) return intPart;
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}