import { AutoSizer, FixedHeightVirtualList, IVirtualListRef } from '@jingoz/components'
import { data } from './data'
import { useRef } from 'react'

export function Demo() {
  const list = useRef<IVirtualListRef>(null)

  return (
    <div className='flex p-5'>
      <div className='w-full'>
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
