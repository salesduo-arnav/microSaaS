import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Import the Global Design System
import '@salesduo/ui/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
