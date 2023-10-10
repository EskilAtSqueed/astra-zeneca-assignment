export const arrayGuard = <T>(
  arr: any,
  guard: (obj: any) => obj is T
): arr is T[] => Array.isArray(arr) && arr.every(guard);
