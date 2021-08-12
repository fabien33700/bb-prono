import { Readable, writable } from 'svelte/store'
import type { Range } from 'lib/NumberUtils'

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
export function snapshot() {
  return {
    firstNames: read(firstNames),
    birthDateTime: read(birthDateTime),
    weight: read(weight),
    size: read(size),
    messageText: read(messageText),
    author: read(author),
  }
}

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
