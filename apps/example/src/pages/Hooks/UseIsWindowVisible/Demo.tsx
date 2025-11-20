import { useInterval, useisWindowVisible } from '@jingoz/hooks'
import { useCallback, useEffect, useState } from 'react'

export function Demo() {
  const isWindowVisible = useisWindowVisible()
  const [count, setCount] = useState<number>(0)

  const asyncCallback = useCallback((): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setCount(prev => prev + 1)
        resolve()
      }, 500)
    })
  }, [])

  const [onStart, onStop] = useInterval(asyncCallback, 500, false)

  useEffect(() => {
    if (!isWindowVisible) {
      onStop()
    }
  }, [isWindowVisible])

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
      <p>Auto stop counting when the window is not visible: {count}</p>
    </div>
  )
}
