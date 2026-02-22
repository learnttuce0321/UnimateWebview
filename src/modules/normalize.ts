export const normalizeString = (
  value: string | string[] | undefined | null
): string => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? '';
};
