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
      import { useInterval } from '@jingoz/hooks'
      import { useCallback, useState } from 'react'

      export function Demo() {
        const [count, setCount] = useState<number>(0)

        const asyncCallback = useCallback((): Promise<void> => {
          return new Promise(resolve => {
            setTimeout(() => {
              setCount(prev => prev + 1)
              resolve()
            }, 1000)
          })
        }, [])

        const [onStart, onStop] = useInterval(asyncCallback, 1000, false)

        return (
          <div className='flex p-5'>
            <div>
              <div className='flex mb-4'>
                <button className='btn btn-neutral' onClick={onStart}>
                  Start
                </button>
                <div className='divider divider-horizontal'></div>
                <button className='btn' onClick={onStop}>
                  Stop
                </button>
              </div>
              <p>{count}</p>
            </div>
          </div>
        )
      }
    `,
  },
]

export default function UseInterval() {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce title='useInterval' desc='Schedule a function or async function to run at a specified interval.' />
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
              description: 'The function or async function to run at the specified interval.',
            },
            {
              name: 'interval',
              type: 'number',
              default: '1000',
              description: 'The interval in milliseconds at which the function or async function should be run.',
            },
          ]}
        />
      </Section>
      <Section title='Outputs'>
        <OutputTable
          data={[
            {
              name: 'onStart',
              type: '() => void',
              description: 'Starts the interval.',
            },
            {
              name: 'onStop',
              type: '() => void',
              description: 'Stops the interval.',
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
