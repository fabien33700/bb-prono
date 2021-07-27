export declare type Range = [number, number]

export function* interval(min: number, max: number, step = 1) {
  if (min > max)
    throw new RangeError('min cannot be greater than max')

  for (let n = min; n <= max; n+=step) yield n
}

export function round(value: number, decimals: number = 0): number {
  if (decimals < 0) decimals = 0
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value)
}
