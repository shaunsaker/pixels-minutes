import './index.css'

import dayjs from 'dayjs'
import Duration from 'dayjs/plugin/duration'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

dayjs.extend(Duration)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
