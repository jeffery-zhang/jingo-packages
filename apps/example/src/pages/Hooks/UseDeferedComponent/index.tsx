import { Introduce } from '@/components/Introduce'
import { Section } from '@/components/Section'
import { Install } from '@/components/Install'
import { OutputTable, ParamTable } from '@/components/Table'
import { Code } from '@/components/Code'
import { Demo } from './Demo'
import { useState } from 'react'

const codes = [
  {
    name: 'index.tsx',
    code: `
      import Skelecton from './Skeleton'
      import { useDeferredComponent } from '@jingoz/hooks'

      export default function Demo() {
        const HeroComponent = useDeferredComponent(() => import('./Hero'))

        return <div className='flex p-5'>{HeroComponent ? <HeroComponent /> : <Skelecton />}</div>
      }
    `,
  },
  {
    name: 'Skeleton.tsx',
    code: `
      export default function Skelecton() {
        return (
          <div className='flex w-52 flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <div className='skeleton h-16 w-16 shrink-0 rounded-full'></div>
              <div className='flex flex-col gap-4'>
                <div className='skeleton h-4 w-20'></div>
                <div className='skeleton h-4 w-28'></div>
              </div>
            </div>
            <div className='skeleton h-32 w-full'></div>
          </div>
        )
      }
    `,
  },
  {
    name: 'Hero.tsx',
    code: `
      export default function Hero() {
        return (
          <div className='hero bg-base-200'>
            <div className='hero-content flex-col lg:flex-row'>
              <img src='https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp' className='max-w-sm rounded-lg shadow-2xl' />
              <div>
                <h1 className='text-5xl font-bold'>Box Office News!</h1>
                <p className='py-6'>
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <button className='btn btn-primary'>Get Started</button>
              </div>
            </div>
          </div>
        )
      }
    `,
  },
]

export default function UseDeferedComponentExample() {
  const [show, setShow] = useState(true)

  const reloadDemo = () => {
    setShow(false)
    setTimeout(() => {
      setShow(true)
    }, 1000)
  }

  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce title='useDeferredComponent' desc='The useDeferredComponent hook allows you to import a component lazily.' />
      <Section title='Install'>
        <Install scripts={['npm i @jingoz/hooks']} />
      </Section>
      <Section title='Params'>
        <ParamTable
          data={[
            {
              name: 'importFn',
              type: '() => Promise<{ default: ComponentType }>',
              default: '-',
              description: 'The function that imports the component.',
            },
          ]}
        />
      </Section>
      <Section title='Outputs'>
        <OutputTable data={[{ name: 'Component', type: 'ComponentType | null', description: 'The lazily imported component.' }]} />
      </Section>
      <Section title='Demo'>
        <div data-theme='dark'>
          <button className='btn btn-sm' onClick={reloadDemo}>
            Reload
          </button>
          {show && <Demo />}
        </div>
      </Section>
      <Section title='Usage'>
        <Code codes={codes} />
      </Section>
    </div>
  )
}
