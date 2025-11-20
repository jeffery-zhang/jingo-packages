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
      import { useDebounce } from '@jingoz/hooks'
      import { useState } from 'react'

      export function Demo() {
        const [count, setCount] = useState<number>(0)
        const [debouncedCallback] = useDebounce(() => {
          setCount(prev => prev + 1)
        }, 2000)

        return (
          <div className='p-5'>
            <button className='ml-0 btn btn-primary' onClick={debouncedCallback}>
              Add
            </button>
            <p className='mt-2'>Count: {count}</p>
          </div>
        )
      }
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
