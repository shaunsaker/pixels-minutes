import './index.css'

import dayjs from 'dayjs'
import Duration from 'dayjs/plugin/duration'
import RelativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

dayjs.extend(Duration)
dayjs.extend(RelativeTime)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
