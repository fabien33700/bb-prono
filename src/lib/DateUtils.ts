import { fr } from 'date-fns/locale'
import { interval } from './NumberUtils'
import {
  getDaysInMonth as _getDaysInMonth,
  format,
} from 'date-fns'

// This library acts as a bridge between the app and the chosen date manipulation library

// Define the app locale to use for date manipulation
const locale = fr

/**
 * Get localized months names in a year
 * @returns An array containing the months names
 */
export function getMonthsNames(): string[] {
  return [...interval(0, 11)].map(m => locale.localize.month(m))
}

/**
 * Get the current year
 *
 * @returns the current year in a 4-digits format
 */
export function getCurrentYear(): number {
  return new Date().getFullYear()
}

/**
 * Get the number of days in the given month of the given year
 *
 * @param month The month
 * @param year The year
 * @returns the number of days
 */
export function getDaysInMonth(month: number, year = getCurrentYear()) {
  return _getDaysInMonth(new Date(year, month))
}

/**
 * Print the date in a long format for the current locale
 *
 * @param date The date to format
 * @returns the formatted date
 */
export function formatLongDate(date: Date): string {
  return format(date, `EEEE d LLLL u`, { locale })
}

/**
 * Print the date and time in a long format for the current
 *
 * @param date The date to format
 * @returns the formatted datetime
 */
export function formatLongDateTime(date: Date): string {
  return format(date, `EEEE d LLLL u 'à' H'h'mm`, { locale })
}
