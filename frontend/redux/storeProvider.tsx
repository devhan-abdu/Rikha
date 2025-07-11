'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import type { ReactNode } from 'react' // ✅ Import the type properly

export function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
