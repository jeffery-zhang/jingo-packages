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
      import { AutoSizer, FixedHeightVirtualList, IVirtualListRef } from '@jingoz/components'
      import { data } from './data'
      import { useRef } from 'react'

      export function Demo() {
        const list = useRef<IVirtualListRef>(null)

        return (
          <div className='flex p-5'>
            <div className='w-1/2'>
              <h1>Fixed Height</h1>
              <button className='btn' onClick={() => list.current?.scrollTo(500)}>
                Scroll to 500
              </button>
              <div className='w-full h-[400px]'>
                <AutoSizer>
                  {({ height }) => (
                    <FixedHeightVirtualList ref={list} className='mt-5' total={data.length} rowHeight={60} viewHeight={height}>
                      {index => <div className='p-4 border-b border-gray-300'>{data[index].name}</div>}
                    </FixedHeightVirtualList>
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
      <Introduce title='FixedHeightVirtualList' desc='FixedHeightVirtualList is a virtual list component that every row has a fixed height.' />
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
              name: 'rowHeight',
              type: 'number',
              default: '40',
              description: 'The height of each row in the list.',
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
