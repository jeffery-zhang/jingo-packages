import { AutoSizer, FixedHeightVirtualList, IVirtualListRef } from '@jingoz/components'
import { data } from './data'
import { useRef } from 'react'

const code = `
import { AutoSizer, FixedHeightVirtualList, IVirtualListRef } from '@jingoz/components'
import { data } from './data'
import { useRef } from 'react'

export default function VirtualList() {
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
`

export default function VirtualList() {
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
      <div className='w-1/2'>
        <div className='mockup-code w-full'>
          {code.split('\n').map((line, index) => (
            <pre key={`codeLine_${index}`} data-prefix={index + 1}>
              <code>{line}</code>
            </pre>
          ))}
        </div>
      </div>
    </div>
  )
}
