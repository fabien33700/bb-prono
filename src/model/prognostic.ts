import type { Range } from 'lib/NumberUtils'

export interface Prognostic {
  firstNames: string[]
  birthDateTime: Date
  weight: Range
  size: Range
  messageText: string
  author: string
  submitDate: Date
}
