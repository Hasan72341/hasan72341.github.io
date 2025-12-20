import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Mobile browser fixes - prevent default behaviors
if (typeof window !== 'undefined') {
  // Prevent pull-to-refresh on Android Chrome
  document.body.style.overscrollBehavior = 'none';
  
  // Prevent iOS bounce scroll
  document.addEventListener('touchmove', (e) => {
    // Only prevent default if at the top or bottom of the scroll
    // This allows normal scrolling but prevents overscroll
    if (document.body.scrollTop === 0 && e.touches[0].clientY > 0) {
      // At top, trying to scroll up
    }
  }, { passive: true });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
