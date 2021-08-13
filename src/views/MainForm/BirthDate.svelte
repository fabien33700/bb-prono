<script lang="ts">
  // Libraries
  import {
    formatLongDate,
    formatLongDateTime,
    getCurrentYear,
    getDaysInMonth,
    getMonthsNames,
  } from 'lib/DateUtils'
  import { differenceInCalendarDays } from 'date-fns'
  import { formatTermDistance } from 'lib/FormatUtils'

  // Types
  import type { Range } from 'lib/NumberUtils'

  // Components
  import RangeSlider from 'svelte-range-slider-pips'
  import Accordion from 'components/Accordion.svelte'
  import NumField from 'components/NumField.svelte'
  import SingleChoice from 'components/SingleChoice.svelte'
  import BlockOverlay from 'components/BlockOverlay.svelte'

  // Stores
  import { birthDateTime, selectedPage } from 'src/stores'

  // Default values and settings
  const PageIndex = 1
  import { DateOfTerm, MinTermDistance, MaxTermDistance } from 'src/config'


  // Internal states & properties
  const monthsNames = getMonthsNames()
  let day = DateOfTerm.getDate()
  let month: string = monthsNames[DateOfTerm.getMonth()]
  let year = DateOfTerm.getFullYear()
  let hours = 0
  let minutes = 0
  let daysInMonth: number

  const sliderOpts = {
    id: 'termGap',
    min: MinTermDistance,
    max: MaxTermDistance,
    step: 1,
    all: 'label',
    range: true,
    pips: true,
    pipstep: 1,
    float: true,
    formatter: labelDistanceFormatter,
  }

  // Reactive state
  $: monthNo = monthsNames.indexOf(month)
  $: daysInMonth = getDaysInMonth(monthNo)
  $: termDistance = differenceInCalendarDays($birthDateTime, DateOfTerm)
  $: $birthDateTime = new Date(year, monthNo, day, hours, minutes)

  function getDistanceRange(distance: number): Range {
    return [...[0, distance].sort()] as Range
  }

  function labelDistanceFormatter(distance: number): string {
    if (distance === MinTermDistance) return 'Avant terme'
    if (distance === MaxTermDistance) return 'Après terme'
    if (distance === 0) return 'Terme'
    if (distance % 5 === 0) return `${Math.abs(distance)}j`

    return ''
  }

</script>

<Accordion
  expanded={$selectedPage === PageIndex}
  on:expand={() => $selectedPage = PageIndex}
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

  <div class="flex flex-row items-center mb-5">
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
    Date du terme prévu : <em>{ formatLongDate(DateOfTerm) }</em>
  </div>
  <div>
    Naissance prévue <strong>{ formatTermDistance(termDistance) }</strong>
  </div>

  <div class="m-5">
    <BlockOverlay>
      <RangeSlider
        values={getDistanceRange(termDistance)}
        {...sliderOpts}
      />
    </BlockOverlay>
  </div>

</Accordion>

<style lang="postcss">
  :global(#termGap.rangeSlider > .rangeHandle) {
    display: none;
  }
  :global(#termGap.rangeSlider > .rangePips > .pip > .pipVal) {
    @apply text-xs;
  }
</style>

