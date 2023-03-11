import { render } from 'preact'
import { App } from './app'

import './index.css'

if (!navigator.geolocation) {
  alert('El navegador no tiene Geolocation')
  throw new Error('El navegador no tiene Geolocation')
}

render(<App />, document.getElementById('app') as HTMLElement)
