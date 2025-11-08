export const LoginFallback = () => (
  <div className='my-16 p-6 md:p-10 opacity-50 select-none pointer-events-none'>
    <div className='max-w-[430px] mx-auto'>
      <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center my-10 animate-pulse'>Sign in to your account</h2>
      <div className='space-y-5 md:space-y-6'>
        <div className='h-12 bg-gray-200 rounded-md animate-pulse'></div>
        <div className='h-12 bg-gray-200 rounded-md animate-pulse'></div>
        <div className='h-10 bg-gray-300 rounded-md animate-pulse mt-2'></div>
      </div>
      <div className='mt-6 space-y-3'>
        <div className='h-12 bg-gray-200 rounded-md animate-pulse'></div>
        <div className='h-12 bg-gray-200 rounded-md animate-pulse'></div>
      </div>
      <p className='text-md text-gray-400 text-center my-8 animate-pulse'>
        Don&apps;t have an account yet? <span className='bg-gray-200 rounded w-16 h-4 inline-block'></span>
      </p>
    </div>
  </div>
)