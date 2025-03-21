import { useEffect, useRef, useState } from 'react'
import { ParsedStructureCollection } from './modules/structuredTextParser'

export const testString =
  "<T d='1' p='0' fname='SimSun' fsize='48' color='#FF0000' bold='1' i='1'>ELECTION RESULTS EDITION</T><T d='1' p='1' italic='1' sline='single' fname='SimSun' fsize='24' color='#000000' bold='1' i='1'>The People Speak</T><T d='1' p='2' fname='SimSun' i='1'>Worts Just Say No!</T><IG d='1' p='3' fname='SimSun' fsize='24' uline='single' spacing='-2' i='1'> 1996</IG><A d='1' fname='SimSun' uline='double' fsize='24' spacing='-2'>https://google.com</A>"

export default function Demo() {
  const parsed = useRef<boolean>(false)
  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (parsed.current) return
    try {
      const t = ParsedStructureCollection.fromStructuredText(testString)
      parsed.current = true

      let content = ''
      for (let i = 0; i < t.collection.length; i++) {
        const { textContent } = t.collection[i]
        content += textContent
      }

      setText(content)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <div className='p-5'>
      <div className='my-4'>original:</div>
      <p className='p-5 rounded-lg bg-neutral-300'>{testString}</p>
      <div className='my-4'>content:</div>
      <p className='p-5 rounded-lg bg-primary-content underline'>{text}</p>
    </div>
  )
}
