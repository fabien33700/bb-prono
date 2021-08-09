import { writable } from 'svelte/store'
import type { Range } from '../lib/NumberUtils'

export const selectedPage = writable(0)

export const firstNames = writable<string[]>()
export const birthDateTime = writable<Date>()
export const weight = writable<Range>()
export const size = writable<Range>()
