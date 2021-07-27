import { fr } from 'date-fns/locale'
import { interval } from './number-utils'
import {
  getDaysInMonth as _getDaysInMonth,
  format,
  formatDistanceStrict,
  isAfter,
  isBefore,
  differenceInDays,
} from 'date-fns'

export function getMonthsNames(): string[] {
  return [...interval(0, 11)].map(m => fr.localize.month(m))
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function getDaysInMonth(month: number, year = getCurrentYear()) {
  return _getDaysInMonth(new Date(year, month))
}

export function formatLongDate(date: Date): string {
  return format(date, `EEEE d LLLL u`, { locale: fr })
}

export function formatLongDateTime(date: Date): string {
  return format(date, `EEEE d LLLL u 'à' H'h'mm`, { locale: fr })
}

