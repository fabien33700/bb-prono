import type { Range } from './number-utils'

export function formatWeight(weight: number): string {
  const kilos = Math.trunc(weight / 1000)
  const grams = weight % 1000
  const result = []

  if (kilos > 0) result.push( `${kilos} kg` )
  if (grams > 0) result.push( `${grams} g` )

  return result.join(' ');
}

export function formatSizeRange(size: Range) {
  const [min, max] = size
  return min !== max
    ? `Entre <b>${min}</b> et <b>${max}</b> centimètres`
    : `Exactement <b>${min}</b> centimètres`
}

export function formatWeightRange(weight: Range) {
  const [min, max] = weight
  return min !== max
    ? `Entre <b>${formatWeight(min)}</b> et <b>${formatWeight(max)}</b>`
    : `Exactement <b>${formatWeight(min)}</b>`
}
