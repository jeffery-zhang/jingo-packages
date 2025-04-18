import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Example from './Example/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Example />
  </StrictMode>,
)
