import { writable } from 'svelte/store'

export interface Pronostics {
  prenoms: string[]
  dateHeureNaissance: Date
  taille: number
  poids: number
  localisationPere: string
  dureeAccouchement: number
}

export default writable({} as Pronostics)