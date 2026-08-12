export function maskName(
  value: string
) {
  if (!value) return "";

  return (
    value.charAt(0) +
    "*".repeat(
      Math.max(
        value.length - 1,
        2
      )
    )
  );
}

export function maskCni(
  value: string
) {
  if (!value) return "";

  if (value.length < 4)
    return "****";

  return (
    "********" +
    value.slice(-4)
  );
}
