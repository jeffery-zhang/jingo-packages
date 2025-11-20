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
      <Introduce title='useDebounce' desc='The useDebounce hook allows you to debounce a function or async function.' />
      <Section title='Install'>
        <Install scripts={['npm i @jingoz/hooks']} />
      </Section>
      <Section title='Params'>
        <ParamTable
          data={[
            {
              name: 'callback',
              type: '() => Promise<void> | void',
              default: '-',
              description: 'The function or async function to run debounced.',
            },
            {
              name: 'debounceTimeMs',
              type: 'number',
              default: '1000',
              description: 'The debounce time in milliseconds.',
            },
          ]}
        />
      </Section>
      <Section title='Outputs'>
        <OutputTable
          data={[
            {
              name: 'debouncedCallback',
              type: '() => Promise<void> | void',
              description: 'The debounced function or async function.',
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
