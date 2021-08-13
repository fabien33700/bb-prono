<script lang="ts">
  import Tailwind from './Tailwind.svelte'

  import { Router, Route } from 'svelte-routing'

  import MainForm from 'views/MainForm.svelte'
  import ResultsTable from 'views/ResultsTable.svelte'

  export let url = ""
</script>

<Tailwind/>

<main>
  <Router {url}>
    <Route path="results" component="{ResultsTable}" />
    <Route path="/" component="{MainForm}" />
  </Router>
</main>
