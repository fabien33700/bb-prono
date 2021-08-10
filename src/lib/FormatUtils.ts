// Type usage
import type { Range } from './NumberUtils'

/**
 * Capitalize the given string,
 * returning it with the first letter in upper case and the rest in lower case
 *
 * @param s the string
 * @returns the capitalized string
 */
const capitalize = (s: string) => (s && s.charAt(0).toUpperCase() + s.slice(1)) || ''

/**
 * Determine if the given string is non null, non empty and does not contains only whitespaces characters
 *
 * @param s the string
 * @returns true if the string is non null, non empty and not whitespaces only, false otherwise
 */
export const nonEmptyOrWhitespace = (s: string) => s?.trim?.()

/**
 * Joins string pieces into a single string, using a glue substring.
 * Specific glue substring for first and last item can be defined in options
 *
 * @param pieces an array of string containing pieces to join
 * @param glue the glue substring to use for joining
 * @param options
 * @param options.first glue substring for joining first and second pieces
 * @param options.last glue substring for joining penultimate and last pieces
 * @returns the joined string
 */
const join = (pieces: string[], glue: string, options?: { first?: string, last?: string }): string => {
  if (pieces.length === 0) return ''

  return pieces.reduce((prev, curr, i, arr) => {
    if (i === 1) glue = options?.first ?? glue
    if (i === arr.length - 1) glue = options?.last ?? glue

    return `${prev}${glue}${curr}`
  })
}

/**
 * Format weight with french units, in {x} kg {y} g format
 *
 * @param weight the weight value
 * @returns the formatted weight
 */
export function formatWeight(weight: number): string {
  const kilos = Math.trunc(weight / 1000)
  const grams = weight % 1000
  const result = []

  if (kilos > 0) result.push( `${kilos} kg` )
  if (grams > 0) result.push( `${grams} g` )

  return result.join(' ');
}

/**
 * Format size range in french
 *
 * @param size the size range
 * @returns the formatted range
 */
export function formatSizeRange(size: Range): string {
  const [min, max] = size
  return min !== max
    ? `Entre <b>${min}</b> et <b>${max}</b> centimètres`
    : `Exactement <b>${min}</b> centimètres`
}

/**
 * Format weight range in french
 *
 * @param weight the weight range
 * @returns the formatted range
 */
export function formatWeightRange(weight: Range): string {
  const [min, max] = weight
  return min !== max
    ? `Entre <b>${formatWeight(min)}</b> et <b>${formatWeight(max)}</b>`
    : `Exactement <b>${formatWeight(min)}</b>`
}

/**
 * Format first names array in french
 * @param firstNames the first names list
 * @returns the formatted list of names
 */
export function formatFirstNames(firstNames: string[]): string {
  const filteredNames = firstNames
    .filter(nonEmptyOrWhitespace)
    .map(capitalize)
    .map(s => `<b>${s}</b>`)

  return join(filteredNames, ', ', { last: ' et ' })
}

/**
 * Format the distance with the term of pregnancy
 *
 * @param distance the number of days
 * @returns a sentence representing the distance
 */
export function formatTermDistance(distance: number): string {
  const s = Math.abs(distance) > 1 ? 's' : ''

  if (distance > 0) return `${Math.abs(distance)} jour${s} après le terme`
  else if (distance < 0) return `${Math.abs(distance)} jour${s} avant le terme`
  else return `le jour du terme`
}
