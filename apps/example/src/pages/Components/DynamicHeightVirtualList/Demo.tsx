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
