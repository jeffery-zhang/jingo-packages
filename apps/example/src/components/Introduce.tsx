export function Introduce({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className='text-3xl text-primary'>{title}</h2>
      <p className='mt-4'>{desc}</p>
    </div>
  )
}
