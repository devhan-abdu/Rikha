import { useRouter } from "next/navigation";

export default function OAuthButtons() {
  const router = useRouter();

  return (
    <div className="my-4">
      <div className="flex items-center mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-3 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 48 48"
          >
            <path fill="#4285F4" d="M24 9.5c3.94 0 7.05 1.62 9.19 2.97l6.79-6.79C35.35 2.61 29.98 0 24 0 14.69 0 6.62 5.37 2.69 13.19l7.91 6.14C12.08 13.55 17.55 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.53 24.55c0-1.57-.14-3.08-.39-4.55H24v9.09h12.7c-.55 2.97-2.2 5.49-4.72 7.18l7.43 5.76c4.34-4 6.82-9.88 6.82-17.48z"/>
            <path fill="#FBBC05" d="M10.6 28.14c-.48-1.43-.75-2.96-.75-4.55s.27-3.12.75-4.55l-7.91-6.14C1.01 15.79 0 19.76 0 23.59s1.01 7.8 2.69 10.69l7.91-6.14z"/>
            <path fill="#EA4335" d="M24 48c6.48 0 11.91-2.13 15.88-5.79l-7.43-5.76c-2.04 1.39-4.66 2.21-8.45 2.21-6.45 0-11.92-4.05-13.88-9.64l-7.91 6.14C6.62 42.63 14.69 48 24 48z"/>
          </svg>
          <span className="text-gray-700 font-medium">Google</span>
        </button>

        <button
          onClick={() => router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/github`)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.931 0-1.31.465-2.382 1.235-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.44 11.44 0 013.003-.404c1.018.005 2.043.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.803 5.628-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span className="text-gray-700 font-medium">GitHub</span>
        </button>
      </div>
    </div>
  );
}
