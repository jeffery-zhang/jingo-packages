import { Introduce } from '@/components/Introduce'
import { Section } from '@/components/Section'
import { Install } from '@/components/Install'
import { OutputTable, ParamTable } from '@/components/Table'
import { Code } from '@/components/Code'
import { Demo } from './Demo'

const codes = [
  {
    name: 'index.tsx',
    code: `
      import { useIsOnline } from '@jingoz/hooks'

      export function Demo() {
        const isOnline = useIsOnline()

        return (
          <div className='flex p-5'>
            <div className='w-1/2'>
              {isOnline ? (
                <>
                  <div className='flex items-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
                    </svg>
                    <span>Online</span>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex items-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
                    </svg>
                    <span>Offline</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      }
    `,
  },
]

export default function UseIsOnline() {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <Introduce title='useIsOnline' desc='The useIsOnline hook allows you to determine whether the network is online.' />
      <Section title='Install'>
        <Install scripts={['npm i @jingoz/hooks']} />
      </Section>
      <Section title='Outputs'>
        <OutputTable data={[{ name: 'isOnline', type: 'boolean', description: 'Whether the network is online.' }]} />
      </Section>
      <Section title='Demo'>
        <div data-theme='dark'>
          <Demo />
        </div>
      </Section>
      <Section title='Usage'>
        <Code codes={codes} />
      </Section>
    </div>
  )
}
