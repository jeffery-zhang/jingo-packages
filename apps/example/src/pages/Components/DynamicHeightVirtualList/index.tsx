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
      import { AutoSizer, DynamicHeightVirtualList, IVirtualListRef } from '@jingoz/components'
      import { data } from './data'
      import { useRef, useState } from 'react'
      
      export function Demo() {
        const list = useRef<IVirtualListRef>(null)
        const [input, setInput] = useState('200')
      
        return (
          <div className='flex p-5'>
            <div className='w-full'>
              <h1>Dynamic Height</h1>
              <button
                className='btn'
                onClick={() => {
                  const inputNumber = Number(input)
                  if (Number.isNaN(inputNumber)) return
                  list.current?.scrollTo(inputNumber)
                }}
              >
                Scroll to
              </button>
              <input type='text' className='input w-32 ml-4' value={input} onChange={e => setInput(e.target.value)} />
              <div className='w-full h-[400px]'>
                <AutoSizer>
                  {({ height }) => (
                    <DynamicHeightVirtualList ref={list} className='mt-5' total={data.length} estimateRowHeight={60} viewHeight={height}>
                      {index => <div className='p-4 border-b border-gray-300'>{data[index].name}</div>}
                    </DynamicHeightVirtualList>
                  )}
                </AutoSizer>
              </div>
            </div>
          </div>
        )
      }
    `,
  },
  {
    name: 'data.ts',
    code: `
      export const data = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: \`Item \${index + 1}\`,
      }))
    `,
  },
]

export default function FixedHeightVirtualList() {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce title='DynamicHeightVirtualList' desc='DynamicHeightVirtualList is a virtual list component that every row height is based on the content.' />
      <Section title='Install'>
        <Install scripts={['npm i @jingoz/components']} />
      </Section>
      <Section title='Props'>
        <ParamTable
          data={[
            {
              name: 'total',
              type: 'number',
              default: '0',
              description: 'The total number of items in the list.',
            },
            {
              name: 'estimateHeight',
              type: 'number',
              default: '40',
              description: 'The height of each row when the component mounts.',
            },
            {
              name: 'viewHeight',
              type: 'number',
              default: '300',
              description: 'The height of the viewport.',
            },
            {
              name: 'padding',
              type: 'number',
              default: '2',
              description: 'The padding between rows.',
            },
            {
              name: 'className',
              type: 'string',
              default: '""',
              description: 'The class name of the top container of the component.',
            },
            {
              name: 'style',
              type: 'CSSProperties',
              default: '{}',
              description: 'The style of the top container of the component.',
            },
          ]}
        />
      </Section>
      <Section title='Reference Methods'>
        <OutputTable
          data={[
            {
              name: 'scrollTo',
              type: '(index: number) => void',
              description: 'Scroll to a specific row with the given index.',
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
