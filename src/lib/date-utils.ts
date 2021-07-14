export function getNbreJour(mois: number, annee: number) {
  if (mois + 1 === 2) {
    const bissextile = ((annee % 4 === 0) && (annee % 100 !== 0)) || (annee % 400 === 0)
    return bissextile ? 29 : 28
  }
  if ([1, 3, 5, 7, 8, 10, 12].includes(mois + 1)) return 31
  return 30
}

export const nomsMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
