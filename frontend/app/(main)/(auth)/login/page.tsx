import { Suspense } from 'react'
import LoginContent from './LoginContent'
import { LoginFallback } from './LoginFallback'


export default function Login() {
  return (
    <>
      <nav>
        <Suspense fallback={<LoginFallback/>}>
          <LoginContent />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}