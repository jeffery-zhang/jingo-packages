import { useInterval } from '@jingoz/hooks'
import { useCallback, useState } from 'react'

const code = `
import { useInterval } from '@jingoz/hooks'
import { useCallback, useState } from 'react'

export default function UseDeferedComponentExample() {
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
    <div className='flex p-5'>
      <div>
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
    </div>
  )
}
`

export default function UseDeferedComponentExample() {
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
    <div className='flex p-5'>
      <div className='w-1/2'>
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
