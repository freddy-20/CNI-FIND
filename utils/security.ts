export function hideName(
  value: string
) {
  if (!value)
    return "";

  return (
    value[0] +
    "*".repeat(
      value.length - 1
    )
  );
}

export function hideCni(
  value: string
) {
  if (!value)
    return "";

  return (
    "********" +
    value.slice(-4)
  );
}

export function hidePhone(
  value: string
) {
  if (!value)
    return "";

  return (
    value.slice(0, 3) +
    "******" +
    value.slice(-2)
  );
}
