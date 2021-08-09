import type { Range } from './number-utils'

const capitalize = (s: string) => (s && s.charAt(0).toUpperCase() + s.slice(1)) || ''
const nonEmptyOrWhitespace = (s: string) => s?.trim?.()

const join = (pieces: string[], glue: string, options?: { first?: string, last?: string }): string => {
  if (pieces.length === 0) return ''


  return pieces.reduce((prev, curr, i, arr) => {
    if (i === 1) glue = options?.first ?? glue
    if (i === arr.length - 1) glue = options?.last ?? glue

    return `${prev}${glue}${curr}`
  })
}

export function formatWeight(weight: number): string {
  const kilos = Math.trunc(weight / 1000)
  const grams = weight % 1000
  const result = []

  if (kilos > 0) result.push( `${kilos} kg` )
  if (grams > 0) result.push( `${grams} g` )

  return result.join(' ');
}

export function formatSizeRange(size: Range): string {
  const [min, max] = size
  return min !== max
    ? `Entre <b>${min}</b> et <b>${max}</b> centimètres`
    : `Exactement <b>${min}</b> centimètres`
}

export function formatWeightRange(weight: Range): string {
  const [min, max] = weight
  return min !== max
    ? `Entre <b>${formatWeight(min)}</b> et <b>${formatWeight(max)}</b>`
    : `Exactement <b>${formatWeight(min)}</b>`
}

export function formatFirstNames(firstNames: string[]): string {
  const filteredNames = firstNames
    .filter(nonEmptyOrWhitespace)
    .map(capitalize)

  return join(filteredNames, ', ', { last: ' et ' })
}

export function formatTermDistance(distance: number): string {
  const s = Math.abs(distance) > 1 ? 's' : ''

  if (distance > 0) return `${Math.abs(distance)} jour${s} après le terme`
  else if (distance < 0) return `${Math.abs(distance)} jour${s} avant le terme`
  else return `le jour du terme`
}
