export const ResetPasswordFallback = () => (
    <div className='my-16 p-6 md:p-10 opacity-50 select-none pointer-events-none'>
        <div className='max-w-[430px] mx-auto space-y-2'>
            <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center animate-pulse'>Set A New Password</h2>
            <p className='text-center text-gray-400 text-sm animate-pulse'>
                type your email so we can send you a password recovery email
            </p>
            <div className='mt-8 space-y-5'>
                <div className='h-12 bg-gray-200 rounded-md animate-pulse'></div>
                <div className='h-12 bg-gray-200 rounded-md animate-pulse'></div>
                <div className='h-10 bg-gray-300 rounded-md animate-pulse'></div>
            </div>
            <p className='text-md text-gray-400 text-center animate-pulse'>
                Don’t get the email? <span className='bg-gray-200 w-16 h-4 inline-block rounded'></span>
            </p>
        </div>
    </div>
)