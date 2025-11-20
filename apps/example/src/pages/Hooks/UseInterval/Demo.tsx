import { useInterval } from '@jingoz/hooks'
import { useCallback, useState } from 'react'

export function Demo() {
  const [count, setCount] = useState<number>(0)

  const asyncCallback = useCallback((): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setCount(prev => prev + 1)
        resolve()
      }, 1000)
    })
  }, [])

  const [onStart, onStop] = useInterval(asyncCallback, 1000, false)

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
