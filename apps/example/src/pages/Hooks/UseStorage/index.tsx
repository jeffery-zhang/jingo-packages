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
      import { useStorage } from '@jingoz/hooks'
      import { useState } from 'react'

      export function Demo() {
        const [count, setCount] = useStorage('storedCount', 0, 'session')
        const [storageCount, setStorageCount] = useState<number | null>(null)

        const onAdd = () => {
          if (count !== null) setCount(count + 1)
        }

        const getValueFromStorage = () => {
          const value = sessionStorage.getItem('storedCount')
          if (value !== null) setStorageCount(JSON.parse(value))
        }

        return (
          <div className='flex p-5'>
            <div className='w-1/2'>
              <button className='btn btn-primary' onClick={onAdd}>
                Add
              </button>
              <div className='m-4'>
                <p>Value from component:</p>
                <p>{count}</p>
              </div>
              <div className='m-4'>
                <p>Value from storage:</p>
                <p>{storageCount}</p>
                <button className='btn' onClick={getValueFromStorage}>
                  getItem
                </button>
              </div>
            </div>
          </div>
        )
      }
    `,
  },
]

export default function UseStorage() {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce title='useStorage' desc='The useStorage hook allows you to synchronize the state of a component with localStorage or sessionStorage.' />
      <Section title='Install'>
        <Install scripts={['npm i @jingoz/hooks']} />
      </Section>
      <Section title='Params'>
        <ParamTable
          data={[
            {
              name: 'key',
              type: 'string',
              default: '-',
              description: 'The key to use in localStorage or sessionStorage.',
            },
            {
              name: 'initialValue',
              type: 'T | null',
              default: 'null',
              description: 'The initial value to use when the key is not in storage.',
            },
            {
              name: 'storageType',
              type: "'local' | 'session'",
              default: "'local'",
              description: 'The storage type to use.',
            },
          ]}
        />
      </Section>
      <Section title='Outputs'>
        <OutputTable
          data={[
            {
              name: 'value',
              type: 'T | null',
              description: 'The current value stored in storage.',
            },
            {
              name: 'setValue',
              type: '(value: T) => void',
              description: 'The function to set the value in storage.',
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
