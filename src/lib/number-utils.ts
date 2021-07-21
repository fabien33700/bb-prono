export declare type Range = [number, number]

export function round(value: number, decimals: number = 0): number {
  if (decimals < 0) decimals = 0
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value)
}
