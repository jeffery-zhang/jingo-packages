import { bar } from '@packages/bar'
import { foo } from '@packages/foo'

function App() {
  foo()
  bar()

  return <div>pnpm-monorepo-boilerplate</div>
}

export default App
