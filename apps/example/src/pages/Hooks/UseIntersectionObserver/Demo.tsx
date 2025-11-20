import { useIntersectionObserver } from '@jingoz/hooks/lib/hooks/useIntersectionObserver'
import { data } from './data'
import { useRef } from 'react'

export function Demo() {
  const ref = useRef(null)

  return (
    <div ref={ref} className='p-5 h-64 overflow-y-auto'>
      {data.map(item => (
        <Section key={item.name} root={ref.current} name={item.name} src={item.src} />
      ))}
    </div>
  )
}

function Section({ root, name, src }: { root: Element | null; name: string; src: string }) {
  const [ref, entry] = useIntersectionObserver<HTMLElement>({
    root,
    threshold: 0.5,
  })

  return (
    <section>
      <figure className='p-4 shadow-sm w-64 mx-auto flex flex-col gap-2'>
        <div ref={ref} className='w-full h-72'>
          {entry?.isIntersecting ? <img className='w-full h-full object-cover' src={src} alt={name} /> : <div className='skeleton h-full w-full'></div>}
        </div>
        <figcaption className='h-6 text-center'>{name}</figcaption>
      </figure>
    </section>
  )
}
