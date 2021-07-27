<script lang="ts">
  // Libraries
  import {
    formatLongDate,
    formatLongDateTime,
    getCurrentYear,
    getDaysInMonth,
    getMonthsNames,
  } from '../lib/date-utils'
  import type { Range } from '../lib/number-utils'
  import { differenceInCalendarDays, differenceInDays } from 'date-fns'

  // Components
  import RangeSlider from 'svelte-range-slider-pips'
  import Accordion from '../components/Accordion.svelte'
  import NumField from '../components/NumField.svelte'
  import SingleChoice from '../components/SingleChoice.svelte'

  // Stores
  import { birthDateTime, selectedPage } from '../stores'

  // Settings
  const pageIndex = 1
  const dateOfTerm = new Date(2021, 8, 11)

  // Internal states & properties
  const monthsNames = getMonthsNames()
  let day = dateOfTerm.getDate()
  let month: string = monthsNames[dateOfTerm.getMonth()]
  let year = dateOfTerm.getFullYear()
  let hours = 0
  let minutes = 0
  let daysInMonth: number
  console.log(monthsNames, month)

  // Reactive state
  $: monthNo = monthsNames.indexOf(month)
  $: daysInMonth = getDaysInMonth(monthNo)
  $: $birthDateTime = new Date(year, monthNo, day, hours, minutes)
  $: termDistance = differenceInCalendarDays($birthDateTime, dateOfTerm)
  $: console.log(getDistanceRange(termDistance))

  function formatTermDistance(distance: number): string {
    const s = Math.abs(distance) > 1 ? 's' : ''

    if (distance > 0) return `${Math.abs(distance)} jour${s} après le terme`
    else if (distance < 0) return `${Math.abs(distance)} jour${s} avant le terme`
    else return `le jour du terme`
  }

  function getDistanceRange(distance: number): Range {
    return [...[50, 50 + distance].sort()] as Range
  }

</script>

<Accordion
  expanded={$selectedPage === pageIndex}
  on:expand={() => $selectedPage = pageIndex}
  >
  <h1 slot="title">📆 Date & Heure de naissance</h1>
  <h2 slot="description" class="text-sm italic text-gray-500">{@html formatLongDateTime($birthDateTime)}</h2>
  <div class="flex flex-row items-center">
    <!-- Jour du mois -->
    <h3 class="mt-2">Jour</h3>
    <NumField
      bind:value={day}
      bind:max={daysInMonth}
      width={"50px"}
      min={1}
    />
    <!-- Mois de l'année -->
    <h3 class="mt-2">Mois</h3>
    <SingleChoice
      bind:selected={month}
      items={monthsNames} />
    <!-- Année -->
    <h3 class="mt-2">Année</h3>
    <NumField
      bind:value={year}
      width="100px"
      min={1900}
      max={getCurrentYear() + 1}
    />
  </div>

  <div class="flex flex-row items-center">
    <!-- Heure -->
    <h3 class="mt-2">Heure</h3>
    <NumField
      bind:value={hours}
      width={"50px"}
      min={0}
      max={23}
    />
    <!-- Minutes -->
    <h3 class="mt-2">Minutes</h3>
    <NumField
      bind:value={minutes}
      width={"50px"}
      min={0}
      max={59}
    />
  </div>

  <div>
    Date du terme prévu : <em>{ formatLongDate(dateOfTerm) }</em>
  </div>
  <div>
    Naissance prévue <strong>{ formatTermDistance(termDistance) }</strong>
  </div>

  <RangeSlider
    id="termGap"
    min="0"
    max="100"
    values={getDistanceRange(termDistance)}
    step="1"
    all="label"
    range
    pips
    pipstep="5"
    float
    formatter={(v) => getDistanceRange(v) }
  />

</Accordion>

<style lang="postcss">
  :global(#termGap.rangeSlider > .rangeHandle) {
    display: none
  }
</style>

