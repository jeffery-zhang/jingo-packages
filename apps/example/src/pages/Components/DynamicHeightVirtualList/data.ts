export const data = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1} `.repeat(Math.floor(Math.random() * 60) + 1),
}))
