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
      import { useThrottle } from '@jingoz/hooks'
      import { useState } from 'react'

      export function Demo() {
        const [count, setCount] = useState<number>(0)
        const [throttledCallback] = useThrottle(() => {
          setCount(prev => prev + 1)
        }, 2000)

        return (
          <div className='p-5'>
            <button className='ml-0 btn btn-primary' onClick={throttledCallback}>
              Add
            </button>
            <p className='mt-2'>Count: {count}</p>
          </div>
        )
      }
    `,
  },
]

export default function UseUseThrottleExample() {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce title='useThrottle' desc='The useThrottle hook allows you to throttle a function or async function.' />
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
              description: 'The function or async function to run throttled.',
            },
            {
              name: 'throttleTimeMs',
              type: 'number',
              default: '1000',
              description: 'The throttle time in milliseconds.',
            },
          ]}
        />
      </Section>
      <Section title='Outputs'>
        <OutputTable
          data={[
            {
              name: 'throttledCallback',
              type: '() => Promise<void> | void',
              description: 'The throttled function or async function.',
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
