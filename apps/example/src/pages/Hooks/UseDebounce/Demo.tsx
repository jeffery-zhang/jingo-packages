import { useDebounce } from '@jingoz/hooks'
import { useState } from 'react'

export function Demo() {
  const [count, setCount] = useState<number>(0)
  const [debouncedCallback] = useDebounce(() => {
    setCount(prev => prev + 1)
  }, 2000)

  return (
    <div className='p-5'>
      <button className='ml-0 btn btn-primary' onClick={debouncedCallback}>
        Add
      </button>
      <p className='mt-2'>Count: {count}</p>
    </div>
  )
}
