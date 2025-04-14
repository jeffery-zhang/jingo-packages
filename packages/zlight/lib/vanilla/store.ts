import { TGetStateFn, TListener, TSetStateFn } from './types'

/**
 * The store API
 */
export interface IStoreApi<S> {
  // setter
  setState: TSetStateFn<S>
  // getter
  getState: TGetStateFn<S>
  // initial state getter
  getInitialState: TGetStateFn<S>
  // subscriber
  subscribe: (listener: (state: S) => void) => () => void
}

/**
 * The store API implementation
 */
export class VanillaStoreApi<S> implements IStoreApi<S> {
  private isInitialized: boolean = false
  private initialState: S = {} as S
  private state: S = {} as S
  private listeners: Set<TListener<S>> = new Set()

  public setState: TSetStateFn<S> = partial => {
    const nextState = typeof partial === 'function' ? (partial as TSetStateFn<S>)(this.state) : partial

    if (!this.isInitialized) {
      this.initialState = nextState as S
      this.state = nextState as S
      this.isInitialized = true
      return
    }

    if (!Object.is(nextState, this.state)) {
      // Update if the new state isn't equal to the current state
      const prevState = this.state
      this.state = Object.assign({}, prevState, nextState)
      for (const listener of this.listeners) {
        listener(this.state, prevState)
      }
    }
  }
  public getState: TGetStateFn<S> = () => this.state
  public getInitialState: TGetStateFn<S> = () => this.initialState
  public subscribe = (listener: TListener<S>) => {
    this.listeners.add(listener)

    return () => this.listeners.delete(listener)
  }
}
