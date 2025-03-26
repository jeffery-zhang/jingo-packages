import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { StructuredTextEditor } from './modules/structuredTextEditor'

export interface IItemHandler {
  setSelectedTextColor: (color: string) => void
}

export function generateTestString(d: number) {
  return `<T d='${d}' p='1' fname='SimSun' fsize='48' color='#00FF00' bold='1' i='1'>ELECTION RESULTS EDITION</T><T d='${d}' p='2' italic='1' sline='single' fname='SimSun' fsize='24' color='#000000' i='1'>The People Speak</T><T d='${d}' p='3' fname='SimSun' i='1'>Worts Just Say No!</T><IG d='${d}' p='4' fname='SimSun' fsize='24' sline='single' spacing='-2' i='1'> 1996</IG><A d='${d}' p='4' i='2' fname='SimSun' uline='double' bold='1' fsize='24' spacing='-2'>https://google.com</A>`
}
export async function mockTestData(): Promise<string[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array.from({ length: 10 }).map((_, index) => generateTestString(index + 1)))
    }, 1000)
  })
}

export default function Demo() {
  const loading = useRef(false)
  const [list, setList] = useState<string[]>([])
  const [editingIndex, setIndex] = useState<number>(-1)
  const items = useRef<{ [key: number]: IItemHandler | null }>({})

  const getData = async () => {
    if (loading.current) return
    loading.current = true
    const data = await mockTestData()

    setList(data)
  }

  const onChange = (index: number, text: string) => {
    setList(prev => {
      const newList = [...prev]
      newList[index] = text

      return newList
    })
  }

  const onSetColor = () => {
    items.current[editingIndex]?.setSelectedTextColor('#FF0000')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='p-5'>
      <div className='flex'>
        <button className='btn btn-primary' onClick={onSetColor}>
          设置红色字体
        </button>
        <div className='divider divider-horizontal'></div>
        <button className='btn btn-primary'>设置斜体</button>
      </div>
      {list.map((text, index) => (
        <div key={`display_${index}`} onClick={() => setIndex(index)}>
          <Item ref={i => (items.current[index] = i)} index={index} text={text} isEditing={index === editingIndex} onChange={onChange} />
        </div>
      ))}
      <div className='h-8'></div>
      {list.map((text, index) => (
        <div key={`text_${index}`} className='flex my-2'>
          <span className='inline-block w-8'>{index + 1}</span>
          <p className='flex-1 p-5 rounded-lg bg-neutral-200'>{text}</p>
        </div>
      ))}
    </div>
  )
}

const Item = forwardRef(function (
  {
    index,
    text,
    isEditing,
    onChange,
  }: {
    index: number
    text: string
    isEditing: boolean
    onChange?: (index: number, text: string) => void
  },
  ref: ForwardedRef<IItemHandler>,
) {
  const viewer = useRef<HTMLParagraphElement>(null)
  const instance = useRef<StructuredTextEditor | null>(null)

  useEffect(() => {
    if (!viewer.current) return
    try {
      instance.current = new StructuredTextEditor(viewer.current, text, {
        onChange(val) {
          onChange?.(index, val)
        },
      })
    } catch (error) {
      console.error(error)
    }

    return () => {
      instance.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!instance.current || !viewer.current) return
    if (isEditing) {
      instance.current.editable = true
    } else {
      instance.current.editable = false
    }
  }, [isEditing])

  useImperativeHandle(
    ref,
    () => ({
      setSelectedTextColor(color: string) {
        instance.current?.setTextColor(color)
      },
    }),
    [],
  )

  return (
    <div className='flex my-2'>
      <span className='inline-block w-8'>{index + 1}</span>
      <p ref={viewer} className={`flex-1 p-5 rounded-lg ${isEditing ? 'bg-secondary' : 'bg-accent'}`}></p>
    </div>
  )
})
