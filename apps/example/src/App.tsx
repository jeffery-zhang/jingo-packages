import { useEffect, useRef, useState } from 'react'

import { AwaitTimer, IAwaitTimer } from '@jingo/await-timer'

function App() {
  const [count, setCount] = useState<number>(0)
  const timer = useRef<IAwaitTimer | null>(null)

  const loopCallback = (): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setCount(prev => prev + 1)
        resolve()
      }, 1000)
    })
  }

  useEffect(() => {
    if (!timer.current) {
      timer.current = new AwaitTimer(loopCallback, 1000, {
        immediate: true,
        autoStart: false,
      })
      timer.current.start()
    }
  }, [])

  useEffect(() => {
    if (count >= 10) {
      timer.current?.stop()
    }
  }, [count])

  return <div>example: {count}</div>
}

export default App
