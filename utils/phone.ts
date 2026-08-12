// Normalise un numéro camerounais en format international sans "+" pour wa.me
export function toWhatsAppDigits(value?: string | null) {
  if (!value) return "";

  const digits = value.replace(/[^\d]/g, "");

  if (digits.startsWith("237")) return digits;
  if (digits.length === 9) return `237${digits}`;

  return digits;
}
