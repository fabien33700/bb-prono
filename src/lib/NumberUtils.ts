// A range is a tuple of two numeric values defining min and max value
export declare type Range = [number, number]

/**
 * A generator function for interval between min and max with step
 * e.g.   interval(0, 5) -> [0, 1, 2, 3, 4, 5]
 *        interval(0, 10, 2) -> [0, 2, 4, 6, 8, 10]
 *
 * @param min The minimum value
 * @param max The maximum value
 * @param step The step between each value
 * @generator each numbers between min and max, according to step
 * @throws RangeError if min is greather than max
 */
export function* interval(min: number, max: number, step = 1) {
  if (min > max)
    throw new RangeError('min cannot be greater than max')

  for (let n = min; n <= max; n+=step) yield n
}

/**
 * Round a number to the specified number of decimal places
 *
 * @param value the value to round
 * @param decimals the number of decimals
 * @returns the rounded number
 */
export function round(value: number, decimals: number = 0): number {
  if (decimals < 0) decimals = 0
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Format a decimal number with french locale
 *
 * @param value the number to format
 * @returns the formatted number
 */
export function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value)
}
