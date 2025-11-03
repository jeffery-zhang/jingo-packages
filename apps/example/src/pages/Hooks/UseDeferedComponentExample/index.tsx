import Skelecton from './Skeleton'
import { useDeferredComponent } from '@jingoz/hooks'

const code = `import Skelecton from './Skeleton'
import { useDeferredComponent } from '@jingoz/hooks'

export default function UseDeferedComponentExample() {
  const HeroComponent = useDeferredComponent(() => import('./Hero'))

  return <div className='flex p-5'>{HeroComponent ? <HeroComponent /> : <Skelecton />}</div>
}
`

export default function UseDeferedComponentExample() {
  const HeroComponent = useDeferredComponent(() => import('./Hero'))

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        <div>{HeroComponent ? <HeroComponent /> : <Skelecton />}</div>
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
