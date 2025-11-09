import { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm '
import { ResetPasswordFallback } from './ResetPasswordFallback '


export default function ResetPasswordPage() {
  return (
    <>
      <nav>
        <Suspense fallback={<ResetPasswordFallback/>}>
          <ResetPasswordForm />
        </Suspense>
      </nav>
    </>
  )
}