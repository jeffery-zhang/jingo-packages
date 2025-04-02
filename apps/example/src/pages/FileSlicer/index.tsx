import { FileSlicer, IChunkItem, IFileSlicer } from '@jingoz/file-slicer'
import { ChangeEvent, useRef, useState } from 'react'

const code = `import { FileSlicer, IChunkItem, IFileSlicer } from '@jingoz/file-slicer'
import { ChangeEvent, useRef, useState } from 'react'

export default function FileSlicerExample() {
  const [name, setName] = useState('')
  const [size, setSize] = useState(0)
  const [fullHash, setFullHash] = useState('')
  const [list, setList] = useState<IChunkItem[]>([])
  const slicer = useRef<IFileSlicer | null>(null)

  const calcFullHash = async () => {
    if (!slicer.current) return
    await slicer.current.calcFileHash()
    setFullHash(slicer.current.fullHash)
  }

  const splitFile = async () => {
    if (!slicer.current) return
    await slicer.current.splitFile()
    setList(slicer.current.chunks)
  }

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const file = files[0]
      slicer.current = new FileSlicer(file, 1 * 1024 * 1024)
      setName(slicer.current.fileName)
      setSize(slicer.current.fileSize)
      await calcFullHash()
    }
  }

  return (
    <div className='p-5'>
      <div className='mb-12'>
        <input type='file' className='file-input' onChange={onChange} />
      </div>
      {name && (
        <div className='card bg-base-100 mb-5'>
          <div className='card-body'>
            <h2 className='card-title'>{name}</h2>
            <p>full file hash: {fullHash}</p>
            <p>file size: {size}</p>
            <div className='card-actions justify-end'>
              <button className='btn btn-primary' onClick={splitFile}>
                Split File
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className='list'>
        {list.map(chunk => (
          <li className='list-row'>
            <div>
              <p>partial hash: {chunk.partialHash}</p>
              <p>partial length: {chunk.offset}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
`

export default function FileSlicerExample() {
  const [name, setName] = useState('')
  const [size, setSize] = useState(0)
  const [fullHash, setFullHash] = useState('')
  const [list, setList] = useState<IChunkItem[]>([])
  const slicer = useRef<IFileSlicer | null>(null)

  const calcFullHash = async () => {
    if (!slicer.current) return
    await slicer.current.calcFileHash()
    setFullHash(slicer.current.fullHash)
  }

  const splitFile = async () => {
    if (!slicer.current) return
    await slicer.current.splitFile()
    setList(slicer.current.chunks)
  }

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const file = files[0]
      slicer.current = new FileSlicer(file, 1 * 1024 * 1024)
      setName(slicer.current.fileName)
      setSize(slicer.current.fileSize)
      await calcFullHash()
    }
  }

  return (
    <div className='flex p-5'>
      <div className='w-1/2'>
        <div className='mb-12'>
          <input type='file' className='file-input' onChange={onChange} />
        </div>
        {name && (
          <div className='card bg-base-100 mb-5'>
            <div className='card-body'>
              <h2 className='card-title'>{name}</h2>
              <p>full file hash: {fullHash}</p>
              <p>file size: {size}</p>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary' onClick={splitFile}>
                  Split File
                </button>
              </div>
            </div>
          </div>
        )}
        <ul className='list'>
          {list.map(chunk => (
            <li className='list-row'>
              <div>
                <p>partial hash: {chunk.partialHash}</p>
                <p>partial length: {chunk.offset}</p>
              </div>
            </li>
          ))}
        </ul>
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
