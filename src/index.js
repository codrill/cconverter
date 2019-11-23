import React from 'react'
import { render, hydrate } from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './styles/styles.scss'
import App from './App'

const rootElement = document.getElementById('root');
rootElement.hasChildNodes() ? hydrate(<App />, rootElement) : render(<App />, rootElement)

serviceWorker.unregister()
