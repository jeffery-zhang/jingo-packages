import { useIsOnline } from '@jingoz/hooks'

const code = `
import { useIsOnline } from '@jingoz/hooks'

export default function UseIsOnline() {
  const isOnline = useIsOnline()

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        {isOnline ? (
          <>
            <div className='flex items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
              <span>Online</span>
            </div>
          </>
        ) : (
          <>
            <div className='flex items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
              <span>Offline</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
`

export default function UseIsOnline() {
  const isOnline = useIsOnline()

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        {isOnline ? (
          <>
            <div className='flex items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
              <span>Online</span>
            </div>
          </>
        ) : (
          <>
            <div className='flex items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
              </svg>
              <span>Offline</span>
            </div>
          </>
        )}
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
