import { AwaitTimer, IAwaitTimer } from '@jingoz/await-timer'
import { useEffect, useRef, useState } from 'react'

const code = `import { AwaitTimer, IAwaitTimer } from '@jingoz/await-timer'
import { useEffect, useRef, useState } from 'react'

export default function() {
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
`

export default function AwaitTimerExample() {
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
