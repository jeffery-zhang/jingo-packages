import { useDebounce, useThrottle } from '@jingoz/hooks'

function callback(type: 'debounced' | 'throttled') {
  console.log(type)
}

const code = `
import { useDebounce, useThrottle } from '@jingoz/hooks'

function callback(type: 'debounced' | 'throttled') {
  console.log(type)
}

export default function UseDebounceAndUseThrottleExample() {
  const [debouncedCallback] = useDebounce(callback, 2000)
  const [throttledCallback] = useThrottle(callback, 2000)

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        <button className='m-2 ml-0 btn btn-primary' onClick={() => debouncedCallback('debounced')}>
          Call function debounced
        </button>
        <button className='m-2 btn btn-primary' onClick={() => throttledCallback('throttled')}>
          Call function throttled
        </button>
        <p>Check Results in the Console!</p>
      </div>
    </div>
  )
}
`

export default function UseDebounceAndUseThrottleExample() {
  const [debouncedCallback] = useDebounce(callback, 2000)
  const [throttledCallback] = useThrottle(callback, 2000)

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        <button className='m-2 ml-0 btn btn-primary' onClick={() => debouncedCallback('debounced')}>
          Call function debounced
        </button>
        <button className='m-2 btn btn-primary' onClick={() => throttledCallback('throttled')}>
          Call function throttled
        </button>
        <p>Check Results in the Console!</p>
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
