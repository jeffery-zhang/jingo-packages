import Skelecton from './Skeleton'
import { useDeferredComponent } from '@jingoz/hooks'

export function Demo() {
  const HeroComponent = useDeferredComponent(() => import('./Hero'))

  return <div className='flex p-5'>{HeroComponent ? <HeroComponent /> : <Skelecton />}</div>
}
