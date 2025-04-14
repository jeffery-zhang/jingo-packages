import { useStore } from './store'

const code = `
// store.ts
import { create } from '@jingoz/weaver'

interface IStore {
  count: number
  setCount: (count: number) => void
}

export const useStore = create<IStore>(set => ({
  count: 1,
  setCount: (count: number) => set({ count }),
}))


// index.tsx
import { useStore } from './store'

export default function ZlightExample() {
  const count = useStore(state => state.count)
  const setCount = useStore(state => state.setCount)

  const onAdd = () => {
    setCount(count + 1)
  }

  return (
    <div className='flex flex-col gap-2 p-5'>
      <button className='btn btn-primary w-12' onClick={onAdd}>
        Add
      </button>
      <span>Inside parent component: {count}</span>
      <ChildComp />
    </div>
  )
}

function ChildComp() {
  const count = useStore(state => state.count)

  return <div>Inside child component: {count}</div>
}
`

export default function ZlightExample() {
  const count = useStore(state => state.count)
  const setCount = useStore(state => state.setCount)

  const onAdd = () => {
    setCount(count + 1)
  }

  return (
    <div className='flex p-5'>
      <div className='flex flex-col gap-4 w-1/2'>
        <button className='btn btn-primary w-12' onClick={onAdd}>
          Add
        </button>
        <span>Inside parent component: {count}</span>
        <ChildComp />
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

function ChildComp() {
  const count = useStore(state => state.count)

  return <div>Inside child component: {count}</div>
}
