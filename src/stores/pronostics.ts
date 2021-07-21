import { writable } from 'svelte/store'
import { Range } from '../lib/number-utils'

export interface Pronostics {
  prenoms: string[]
  dateHeureNaissance: Date
  taille: Range
  poids: Range
  localisationPere: string
  dureeAccouchement: number
}

export default writable({} as Pronostics)
