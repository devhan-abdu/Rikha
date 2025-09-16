export default function GoogleButton() {
  const handleSignIn = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className='my-4'>
      <div className="flex items-center mb-4 ">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-3 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button
        onClick={handleSignIn}
        className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
      >
        {/* Google G logo as inline SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 48 48"
        >
          <path
            fill="#4285F4"
            d="M24 9.5c3.94 0 7.05 1.62 9.19 2.97l6.79-6.79C35.35 2.61 29.98 0 24 0 14.69 0 6.62 5.37 2.69 13.19l7.91 6.14C12.08 13.55 17.55 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.53 24.55c0-1.57-.14-3.08-.39-4.55H24v9.09h12.7c-.55 2.97-2.2 5.49-4.72 7.18l7.43 5.76c4.34-4 6.82-9.88 6.82-17.48z"
          />
          <path
            fill="#FBBC05"
            d="M10.6 28.14c-.48-1.43-.75-2.96-.75-4.55s.27-3.12.75-4.55l-7.91-6.14C1.01 15.79 0 19.76 0 23.59s1.01 7.8 2.69 10.69l7.91-6.14z"
          />
          <path
            fill="#EA4335"
            d="M24 48c6.48 0 11.91-2.13 15.88-5.79l-7.43-5.76c-2.04 1.39-4.66 2.21-8.45 2.21-6.45 0-11.92-4.05-13.88-9.64l-7.91 6.14C6.62 42.63 14.69 48 24 48z"
          />
        </svg>

        <span className="text-gray-700 font-medium">Continue with Google</span>
      </button>
    </div>
  );
}