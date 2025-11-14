import { Navigate, Route, Routes } from 'react-router'
import Layout from './pages'
import AwaitTimerExample from './pages/AwaitTimer'
import Demo from './pages/Demo'
import EnhancedAbortControllerExample from './pages/EnhancedAbortController'
import FileSlicerExample from './pages/FileSlicer'
import ZlightExample from './pages/Zlight'
import UseDeferedComponentExample from './pages/Hooks/UseDeferedComponentExample'
import UseDebounceAndUseThrottleExample from './pages/Hooks/UseDebounceAndUseThrottleExample'
import UseInterval from './pages/Hooks/UseInterval'
import VirtualList from './pages/Components/VirtualList'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='await-timer' element={<AwaitTimerExample />} />
          <Route path='file-slicer' element={<FileSlicerExample />} />
          <Route path='enhanced-abort-controller' element={<EnhancedAbortControllerExample />} />
          <Route path='zlight' element={<ZlightExample />} />
          <Route path='hooks'>
            <Route index element={<Navigate to='useDeferedComponent' />} />
            <Route path='useDeferedComponent' element={<UseDeferedComponentExample />} />
            <Route path='useInterval' element={<UseInterval />} />
            <Route path='useDebounceAndUseThrottleExample' element={<UseDebounceAndUseThrottleExample />} />
          </Route>
          <Route path='components'>
            <Route index element={<Navigate to='virtualList' />} />
            <Route path='virtualList' element={<VirtualList />} />
          </Route>
        </Route>
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </>
  )
}

export default App
