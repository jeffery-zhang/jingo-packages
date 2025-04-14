import { useEffect, useRef } from 'react'

export default function Demo() {
  const test = useRef(0)

  useEffect(() => {
    console.log('testRef changed')
  }, [test.current])

  return (
    <div>
      <button className='btn' onClick={() => test.current++}>
        Plus
      </button>
    </div>
  )
}
