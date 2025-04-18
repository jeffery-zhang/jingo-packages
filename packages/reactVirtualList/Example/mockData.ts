export type TData = {
  id: string
  title: string
  name: string
  description: string
  phone: number
}

function generateId() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

export async function fetchMockData(): Promise<TData[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 9999 }).map((_, index) => ({
          id: generateId(),
          title: `title-${index}`,
          name: `name-${index}`,
          description: `description-${index}`,
          phone: Math.ceil((Math.random() + 1) * 10000000000),
        })),
      )
    }, 1000)
  })
}
