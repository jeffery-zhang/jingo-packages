import { useStorage } from '@jingoz/hooks'
import { useState } from 'react'

export function Demo() {
  const [count, setCount] = useStorage('storedCount', 0, 'session')
  const [storageCount, setStorageCount] = useState<number | null>(null)

  const onAdd = () => {
    if (count !== null) setCount(count + 1)
  }

  const getValueFromStorage = () => {
    const value = sessionStorage.getItem('storedCount')
    if (value !== null) setStorageCount(JSON.parse(value))
  }

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        <button className='btn btn-primary' onClick={onAdd}>
          Add
        </button>
        <div className='m-4'>
          <p>Value from component:</p>
          <p>{count}</p>
        </div>
        <div className='m-4'>
          <p>Value from storage:</p>
          <p>{storageCount}</p>
          <button className='btn' onClick={getValueFromStorage}>
            getItem
          </button>
        </div>
      </div>
    </div>
  )
}
