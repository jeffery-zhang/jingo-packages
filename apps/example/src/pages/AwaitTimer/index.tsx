import { useEffect, useRef, useState } from 'react'

import { AwaitTimer, IAwaitTimer } from '@jingoz/await-timer'

export default function AwaitTimerExample() {
  const [count, setCount] = useState<number>(0)
  const timer = useRef<IAwaitTimer | null>(null)

  const loopCallback = (): Promise<void> => {
    console.log('loopCallback')

    return new Promise(resolve => {
      setTimeout(() => {
        setCount(prev => prev + 1)
        resolve()
      }, 1000)
    })
  }

  const onStart = () => {
    timer.current?.start()
  }

  const onStop = () => {
    timer.current?.stop()
  }

  useEffect(() => {
    if (!timer.current) {
      timer.current = new AwaitTimer(loopCallback, 1000, {
        immediate: false,
        autoStart: false,
      })
    }
  }, [])

  return (
    <div className='p-5'>
      <div className='flex mb-4'>
        <button className='btn btn-neutral' onClick={onStart}>
          Start
        </button>
        <div className='divider divider-horizontal'></div>
        <button className='btn' onClick={onStop}>
          Stop
        </button>
      </div>
      <p>{count}</p>
    </div>
  )
}
