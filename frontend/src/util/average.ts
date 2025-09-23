export function average(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}
