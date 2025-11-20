import { ReactNode } from 'react'

export function Section({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className='flex flex-col gap-4 p-5'>
      <h3 className='text-2xl border-b border-base-300'>{title}</h3>
      {children}
    </div>
  )
}
