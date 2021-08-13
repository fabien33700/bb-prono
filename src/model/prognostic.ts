import type { Range } from 'lib/NumberUtils'

export interface Prognostic {
  firstNames?: string[]
  birthDateTime?: string
  weight?: Range
  size?: Range
  messageText?: string
  author: string
  submitDate?: string
}
