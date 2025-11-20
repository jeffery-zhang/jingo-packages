import { useState } from 'react'

type CodeType = {
  name: string
  code: string
}

export function Code({ codes }: { codes: CodeType[] }) {
  const [tab, setTab] = useState<string>(codes[0].name)

  return (
    <div>
      <div role='tablist' className='tabs tabs-lift tabs-sm'>
        {codes.map(({ name, code }) => (
          <>
            <input
              type='radio'
              name={name}
              className={`tab ${codes.length <= 1 ? 'invisible' : 'visible'}`}
              aria-label={name}
              checked={tab === name}
              onChange={() => setTab(name)}
            />
            <div className='tab-content'>
              <div className='mockup-code w-full'>
                {code.split('\n').map((line, index) => (
                  <pre key={`codeLine_${index}`} data-prefix={index + 1}>
                    <code>{line}</code>
                  </pre>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
