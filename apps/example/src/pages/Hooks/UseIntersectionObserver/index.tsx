import { Introduce } from '@/components/Introduce'
import { Section } from '@/components/Section'
import { Install } from '@/components/Install'
import { OutputTable, ParamTable } from '@/components/Table'
import { Code } from '@/components/Code'
import { Demo } from './Demo'

const codes = [
  {
    name: 'index.tsx',
    code: `
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
    `,
  },
  {
    name: 'data.ts',
    code: `
      export const data = [
        {
          name: 'image1',
          src: 'https://fuchsia-absolute-porcupine-16.mypinata.cloud/ipfs/bafkreihakmkdllcmpmjwyu5ox5vileuchdtgmeioyh5duwkkcg7a3uev3i',
        },
        {
          name: 'image2',
          src: 'https://fuchsia-absolute-porcupine-16.mypinata.cloud/ipfs/bafybeiexmgsbkkas72vx2dpasunkgw3fn55qgdl6gzwajthirc6vlnldji',
        },
        {
          name: 'image3',
          src: 'https://fuchsia-absolute-porcupine-16.mypinata.cloud/ipfs/bafkreig7ek7j7fd6tb7s375yctkl2d3g63ezp2xnrlcr2dhfywkwwq7sxi',
        },
        {
          name: 'image4',
          src: 'https://fuchsia-absolute-porcupine-16.mypinata.cloud/ipfs/bafkreigppjvj2zdaicj2l5qcutahmrvzoq7azlvunafeghvusw2vdhszx4',
        },
      ]
    `,
  },
]

export default function UseDebounceExample() {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce
        title='useIntersectionObserver'
        desc='The useIntersectionObserver hook allows you to observe the intersection of an element with the viewport.'
      />
      <Section title='Install'>
        <Install scripts={['npm i @jingoz/hooks']} />
      </Section>
      <Section title='Params'>
        <ParamTable
          data={[
            {
              name: 'options.root',
              type: 'Element | Document | null',
              default: 'null',
              description: 'Same definition as IntersectionObserverInit.root.',
            },
            {
              name: 'options.rootMargin',
              type: 'string',
              default: '0',
              description: 'Same definition as IntersectionObserverInit.rootMargin.',
            },
            {
              name: 'options.threshold',
              type: 'number | number[]',
              default: '0',
              description: 'Same definition as IntersectionObserverInit.threshold.',
            },
          ]}
        />
      </Section>
      <Section title='Outputs'>
        <OutputTable
          data={[
            {
              name: 'ref',
              type: 'RefObject<T>',
              description: 'The ref of the element to observe.',
            },
            {
              name: 'entry',
              type: 'IntersectionObserverEntry | null',
              description: 'The intersection observer entry.',
            },
          ]}
        />
      </Section>
      <Section title='Demo'>
        <div data-theme='dark'>
          <Demo />
        </div>
      </Section>
      <Section title='Usage'>
        <Code codes={codes} />
      </Section>
    </div>
  )
}
