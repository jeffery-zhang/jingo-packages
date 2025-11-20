import { useThrottle } from '@jingoz/hooks'
import { useState } from 'react'

export function Demo() {
  const [count, setCount] = useState<number>(0)
  const [throttledCallback] = useThrottle(() => {
    setCount(prev => prev + 1)
  }, 2000)

  return (
    <div className='p-5'>
      <button className='ml-0 btn btn-primary' onClick={throttledCallback}>
        Add
      </button>
      <p className='mt-2'>Count: {count}</p>
    </div>
  )
}
