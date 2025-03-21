import { Route, Routes } from 'react-router'
import Demo from './Demo'
import Layout from './pages'
import AwaitTimerExample from './pages/AwaitTimer'
import FileSlicerExample from './pages/FileSlicer'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='await-timer' element={<AwaitTimerExample />} />
          <Route path='file-slicer' element={<FileSlicerExample />} />
        </Route>
        <Route path='demo' element={<Demo />} />
      </Routes>
    </>
  )
}

export default App
