<script lang="ts">
  import { onMount } from 'svelte'
  import axios from 'axios'

  import type { Prognostic } from 'src/model/prognostic'

  import TableHeader from 'views/ResultsTable/TableHeader.svelte'
  import EmptyResults from 'views/ResultsTable/EmptyResults.svelte'
  import Loading from 'views/ResultsTable/Loading.svelte'
  import ResultLine from 'views/ResultsTable/ResultLine.svelte'

  let promise: Promise<Prognostic[]>

  onMount(() => (promise = fetchPrognostics()))

  async function fetchPrognostics(): Promise<Prognostic[]> {
    try {
      const response = await axios.get("/prognostics");
      return response?.data ?? [];
    } catch (e) {
      console.log("error while fetching prognostics: ", e);
      return [];
    }
  }
</script>

<div class="overflow-x-auto mx-auto w-full">
  <div
    class="min-w-screen min-h-screenflex items-center justify-center bg-gray-100 overflow-hidden"
  >
    <div class="w-full px-5">
      <div class="bg-white shadow-md rounded my-6">
        <table class="min-w-max w-full table-auto">
          <thead>
            <TableHeader />
          </thead>
          <tbody class="text-gray-600 text-sm">
            {#if promise}
            {#await promise}
              <Loading/>
            {:then prognostics}
              {#if prognostics?.length > 0}
                {#each prognostics as prognostic}
                  <ResultLine {prognostic} />
                {/each}
              {:else}
                <EmptyResults/>
              {/if}
            {/await}
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
