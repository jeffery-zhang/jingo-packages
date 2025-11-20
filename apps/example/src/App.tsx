import { Navigate, Route, Routes } from 'react-router'
import Layout from './pages'
import AwaitTimerExample from './pages/AwaitTimer'
import Demo from './pages/Demo'
import EnhancedAbortControllerExample from './pages/EnhancedAbortController'
import FileSlicerExample from './pages/FileSlicer'
import ZlightExample from './pages/Zlight'
import UseDeferedComponentExample from './pages/Hooks/UseDeferedComponent'
import UseDebounceExample from './pages/Hooks/UseDebounce'
import UseThrottleExample from './pages/Hooks/UseThrottle'
import UseIsOnlineExample from './pages/Hooks/UseIsOnline'
import UseIsWindowVisibleExample from './pages/Hooks/UseIsWindowVisible'
import UseIntervalExample from './pages/Hooks/UseInterval'
import UseStorageExample from './pages/Hooks/UseStorage'
import UseIntersectionObserver from './pages/Hooks/UseIntersectionObserver'
import FixedHeightVirtualListExample from './pages/Components/FixedHeightVirtualList'

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
            <Route path='useInterval' element={<UseIntervalExample />} />
            <Route path='useDebounce' element={<UseDebounceExample />} />
            <Route path='useThrottle' element={<UseThrottleExample />} />
            <Route path='useIsOnline' element={<UseIsOnlineExample />} />
            <Route path='useisWindowVisible' element={<UseIsWindowVisibleExample />} />
            <Route path='useStorage' element={<UseStorageExample />} />
            <Route path='useIntersectionObserver' element={<UseIntersectionObserver />} />
          </Route>
          <Route path='components'>
            <Route index element={<Navigate to='fixedHeightVirtualList' />} />
            <Route path='fixedHeightVirtualList' element={<FixedHeightVirtualListExample />} />
          </Route>
        </Route>
        <Route path='/demo' element={<Demo />} />
      </Routes>
    </>
  )
}

export default App
