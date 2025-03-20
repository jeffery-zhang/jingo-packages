import { useEffect, useRef, useState } from 'react'

import { AwaitTimer, IAwaitTimer } from '@jingoz/await-timer'
import { Route, Routes } from 'react-router'
import Layout from './pages'
import AwaitTimerExample from './pages/AwaitTimer'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='await-timer' element={<AwaitTimerExample />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
