import { Readable, writable } from 'svelte/store'
import type { Range } from 'src/lib/NumberUtils'
import type { Prognostic } from 'src/model/prognostic'
import { DateOfTerm, MaxSize, MaxSizeRange, MaxWeight, MaxWeightRange, MinSize, MinWeight } from 'src/config'

/**
 * Store for current selected page
 */
export const selectedPage = writable(0)

/**
 * Store for first names
 */
export const firstNames = writable<string[]>()

/**
 * Store for birthdate
 */
export const birthDateTime = writable<Date>()

/**
 * Store for weight
 */
export const weight = writable<Range>()

/**
 * Store for size
 */
export const size = writable<Range>()

/**
 * Store for message text
 */
export const messageText = writable<string>()

/**
 * Store for message author name
 */
export const author = writable<string>()

/**
 * Take a snapshot of all form stores
 *
 * @returns the store snapshot
 */
export function snapshot(): Prognostic {
  return {
    firstNames: read(firstNames),
    birthDateTime: read(birthDateTime).toISOString(),
    weight: read(weight),
    size: read(size),
    messageText: read(messageText),
    author: read(author),
  }
}

export function reset() {
  selectedPage.set(0)
  firstNames.set(['', '', ''])
  birthDateTime.set(DateOfTerm)
  weight.set([
    (MinWeight + (MaxWeight - MinWeight) / 2) - (MaxWeightRange / 2),
    (MinWeight + (MaxWeight - MinWeight) / 2) + (MaxWeightRange / 2),
  ])
  size.set([
    (MinSize + (MaxSize - MinSize) / 2) - (MaxSizeRange / 2),
    (MinSize + (MaxSize - MinSize) / 2) + (MaxSizeRange / 2),
  ])
  messageText.set('')
  author.set('')
}

reset()

/**
 * Read the current value of a store (outside Svelte component files)
 *
 * @param store the store from which read value
 * @param <T> the type of value in the store
 * @returns the value
 */
function read<T>(store: Readable<T>): T {
  let value: T
  store.subscribe($ => value = $)()
  return value
}
