import { Suspense } from 'react'
import LoginContent from './LoginContent'
import { LoginFallback } from '@/components/skeletons'


export default function Login() {
  return (
    <>
      <nav>
        <Suspense fallback={<LoginFallback />}>
          <LoginContent />
        </Suspense>
      </nav>
    </>
  )
}