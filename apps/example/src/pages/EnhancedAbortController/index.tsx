import { EnhancedAbortController } from '@jingoz/enhanced-abort-controller'
import { useRef, useState } from 'react'

const code = `import { EnhancedAbortController } from '@jingoz/enhanced-abort-controller'
import { useRef, useState } from 'react'

async function testAsyncFunc(signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve('method finished'), 10000)

    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject('method aborted')
    })
  })
}

export default function EnhancedAbortControllerExample() {
  const abortController = useRef<EnhancedAbortController>(null)
  const [tip, setTip] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const onStart = async () => {
    if (abortController.current) abortController.current.destroy()
    abortController.current = new EnhancedAbortController(8000)

    setTip('will auto abort in 8s')
    try {
      setResult('')
      const res = await testAsyncFunc(abortController.current.signal)
      setResult(res)
    } catch (error) {
      setResult(error as string)
    }
  }

  const onAbort = () => {
    if (abortController.current) {
      abortController.current.abortAfter(2000)
      setTip('will abort in 2s from now')
    }
  }

  return (
    <div className='flex p-5'>
      <div>
        <div className='flex mb-4'>
          <button className='btn btn-neutral' onClick={onStart}>
            Start
          </button>
          <div className='divider divider-horizontal'></div>
          <button className='btn' onClick={onAbort}>
            Manual Abort
          </button>
        </div>
        <div className='mt-8'>
          <span className='inline-block h-4 text-primary'>{tip}</span>
          <p className='w-60 h-8 px-2 rounded bg-info text-info-content'>{result}</p>
        </div>
      </div>
    </div>
  )
}
`

async function testAsyncFunc(signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve('method finished'), 10000)

    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject('method aborted')
    })
  })
}

export default function EnhancedAbortControllerExample() {
  const abortController = useRef<EnhancedAbortController>(null)
  const [tip, setTip] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const onStart = async () => {
    if (abortController.current) abortController.current.destroy()
    abortController.current = new EnhancedAbortController(8000)

    setTip('will auto abort in 8s')
    try {
      setResult('')
      const res = await testAsyncFunc(abortController.current.signal)
      setResult(res)
    } catch (error) {
      setResult(error as string)
    }
  }

  const onAbort = () => {
    if (abortController.current) {
      abortController.current.abortAfter(2000)
      setTip('will abort in 2s from now')
    }
  }

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        <div className='flex mb-4'>
          <button className='btn btn-neutral' onClick={onStart}>
            Start
          </button>
          <div className='divider divider-horizontal'></div>
          <button className='btn' onClick={onAbort}>
            Manual Abort
          </button>
        </div>
        <div className='mt-8'>
          <span className='inline-block h-4 text-primary'>{tip}</span>
          <p className='w-60 h-8 px-2 rounded bg-info text-info-content'>{result}</p>
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
