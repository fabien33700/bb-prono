import App from './App.svelte'
import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.headers['Content-Type'] = 'application/json'

const app = new App({
  target: document.body,
})

export default app
