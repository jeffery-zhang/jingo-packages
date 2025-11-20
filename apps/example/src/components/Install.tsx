import { useState } from 'react'

enum Consoles {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

export function Install({ scripts }: { scripts: string[] }) {
  const [console, setConsole] = useState<Consoles>(Consoles.NPM)

  return (
    <div>
      <div role='tablist' className='tabs tabs-lift tabs-sm'>
        {Object.values(Consoles).map((value, index) => (
          <a key={index} className={`tab tab-lifted ${console === value ? 'tab-active' : ''}`} onClick={() => setConsole(value)}>
            {value}
          </a>
        ))}
      </div>
      <div className='mockup-code w-full'>
        {scripts.map((line, index) => (
          <pre key={`codeLine_${index}`} data-prefix='$'>
            <code>{line.replace('npm', console)}</code>
          </pre>
        ))}
      </div>
    </div>
  )
}
