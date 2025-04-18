import React, { createContext, useCallback, useEffect, useState } from 'react'

import { AutoSizer } from '../lib/AutoSizer'
import { FixedHeightVirtualList } from '../lib/FixedHeight'
import { fetchMockData, TData } from './mockData'

interface IContext {
  data: TData[]
  refresh: () => Promise<void>
  updateData: (data: TData[]) => void
  deleteData: (ids: string[]) => void
}

const Context = createContext<IContext>({
  data: [],
  refresh: async () => {},
  updateData: () => {},
  deleteData: () => {},
})

export default function Example() {
  const [data, setData] = useState<TData[]>([])

  const refresh = useCallback(async () => {
    const data = await fetchMockData()
    setData(data)
  }, [])

  const updateData = useCallback((data: TData[]) => {
    setData(prev => {
      const temp = [...prev]
      temp.forEach((item, index) => {
        const idx = data.findIndex(i => i.id === item.id)
        if (index !== -1) temp[index] = data[idx]
      })

      return temp
    })
  }, [])

  const deleteData = useCallback((ids: string[]) => {
    setData(prev => prev.filter(item => !ids.includes(item.id)))
  }, [])

  useEffect(() => {
    refresh()

    return () => {
      setData([])
    }
  }, [])

  useEffect(() => {
    console.log(data.length)
  }, [data.length])

  return (
    <Context.Provider value={{ data, refresh, updateData, deleteData }}>
      <div style={{ width: 800, height: 600 }}>
        <AutoSizer>
          {({ height }) => {
            return (
              <FixedHeightVirtualList viewHeight={height} total={data.length}>
                {index => <DataItem data={data[index]} />}
              </FixedHeightVirtualList>
            )
          }}
        </AutoSizer>
      </div>
    </Context.Provider>
  )
}

const itemStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

function DataItem({ data }: { data: TData }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={itemStyle}>{data.title}</div>
      <div style={itemStyle}>{data.name}</div>
      <div style={itemStyle}>{data.description}</div>
      <div style={itemStyle}>{data.phone}</div>
    </div>
  )
}
