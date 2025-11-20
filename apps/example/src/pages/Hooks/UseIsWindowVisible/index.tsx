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
      import { useInterval, useisWindowVisible } from '@jingoz/hooks'
      import { useCallback, useEffect, useState } from 'react'

      export function Demo() {
        const isWindowVisible = useisWindowVisible()
        const [count, setCount] = useState<number>(0)

        const asyncCallback = useCallback((): Promise<void> => {
          return new Promise(resolve => {
            setTimeout(() => {
              setCount(prev => prev + 1)
              resolve()
            }, 500)
          })
        }, [])

        const [onStart, onStop] = useInterval(asyncCallback, 500, false)

        useEffect(() => {
          if (!isWindowVisible) {
            onStop()
          }
        }, [isWindowVisible])

        return (
          <div className='flex p-5'>
            <div className='w-1/2'>
              <div className='flex mb-4'>
                <button className='btn btn-neutral' onClick={onStart}>
                  Start
                </button>
                <div className='divider divider-horizontal'></div>
                <button className='btn' onClick={onStop}>
                  Stop
                </button>
              </div>
              <p>Auto stop counting when the window is not visible: {count}</p>
            </div>
          </div>
        )
      }
    `,
  },
]

export default function UseIsWindowVisible() {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce title='useIsWindowVisible' desc='The useIsWindowVisible hook allows you to determine whether the window is visible.' />
      <Section title='Install'>
        <Install scripts={['npm i @jingoz/hooks']} />
      </Section>
      <Section title='Outputs'>
        <OutputTable data={[{ name: 'isWindowVisible', type: 'boolean', description: 'Whether the window is visible.' }]} />
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
