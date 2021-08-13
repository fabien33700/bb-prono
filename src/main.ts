import App from './App.svelte'
import axios from 'axios'

axios.defaults.baseURL = '/api'

const app = new App({
  target: document.body,
})

export default app
