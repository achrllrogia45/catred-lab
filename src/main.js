import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// .js gate for reveals: hidden-until-observed styles only apply when JS runs,
// so no-JS/paused-JS users always see full content.
document.documentElement.classList.add('js')

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
