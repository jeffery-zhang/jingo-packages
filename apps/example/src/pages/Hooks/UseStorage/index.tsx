import { useStorage } from '@jingoz/hooks'
import { useState } from 'react'

const code = `
import { useStorage } from '@jingoz/hooks'
import { useState } from 'react'

export default function UseStorage() {
  const [count, setCount, clearCount] = useStorage('storedCount', 0, 'session')
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
        <button className='btn ml-2' onClick={clearCount}>
          Clear
        </button>
        <div className='m-4'>
          <p>Value from hook:</p>
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
`

export default function UseStorage() {
  const [count, setCount, clearCount] = useStorage('storedCount', 0, 'session')
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
        <button className='btn ml-2' onClick={clearCount}>
          Clear
        </button>
        <div className='m-4'>
          <p>Value from hook:</p>
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
      <div className='w-1/2'>
        <div className='mockup-code w-full'>
          {code.split('\n').map((line, index) => (
            <pre key={`codeLine_${index}`} data-prefix={index + 1}>
              <code>{line}</code>
            </pre>
          ))}
        </div>
      </div>
    </div>
  )
}
