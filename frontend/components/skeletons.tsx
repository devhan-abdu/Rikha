import React from "react";

const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function ProductCardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm w-[305px] mx-auto`}
        >
            <div className="h-[190px] w-full bg-gray-100" />

            <div className="flex flex-col flex-1 px-6 py-4 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                <div className="h-3 w-2/3 bg-gray-200 rounded-md" />

                <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 w-4 bg-gray-200 rounded-sm" />
                    ))}
                    <div className="h-3 w-8 bg-gray-200 rounded-md ml-1" />
                </div>

                <div className="flex items-baseline gap-3">
                    <div className="h-3 w-16 bg-gray-200 rounded-md" />
                    <div className="h-4 w-20 bg-gray-200 rounded-md" />
                </div>

                <div className="pt-2 flex justify-end">
                    <div className="h-8 w-24 bg-gray-200 rounded-md" />
                </div>
            </div>
        </div>
    );
}

export function ProductCardsSkeleton() {
    return (
        <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-x-6 gap-y-8  p-8 pt-10 pb-20 space-y-12">
            {
                Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))
            }
        </div>
    )
}

export function CategorySkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-fit mx-auto">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-[200px] h-[150px] bg-gray-200 rounded-xl animate-pulse" />
            ))}
        </div>
    );
}


export function OrderCardSkeleton() {
    return (
        <div className={`${shimmer} relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm p-6 w-full`}>
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />

            <div className="space-y-3 mb-4">
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="h-4 w-24 bg-gray-200 rounded-md" />
                <div className="h-6 w-20 bg-gray-200 rounded-md" />
            </div>

            <div className="pt-4 flex justify-end">
                <div className="h-8 w-28 bg-gray-200 rounded-md" />
            </div>
        </div>
    );
}

export const LoginFallback = () => (
    <div className="my-16 p-6 md:p-10 select-none pointer-events-none">
        <div className="max-w-[430px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-center my-10 text-gray-300">
                Sign in to your account
            </h2>

            <div className="space-y-5 md:space-y-6">
                <div className={`h-12 bg-gray-200 rounded-md ${shimmer}`}></div>
                <div className={`h-12 bg-gray-200 rounded-md ${shimmer}`}></div>
                <div className={`h-10 bg-gray-300 rounded-md mt-2 ${shimmer}`}></div>
            </div>

            <div className="mt-6 space-y-3">
                <div className={`h-12 bg-gray-200 rounded-md ${shimmer}`}></div>
                <div className={`h-12 bg-gray-200 rounded-md ${shimmer}`}></div>
            </div>

            <p className="text-md text-gray-400 text-center my-8">
                Don&rsquo;t have an account yet?{" "}
                <span className={`bg-gray-200 rounded w-16 h-4 inline-block align-middle ${shimmer}`}></span>
            </p>
        </div>
    </div>
);

export const ResetPasswordFallback = () => (
  <div className="my-16 p-6 md:p-10 select-none pointer-events-none">
    <div className="max-w-[430px] mx-auto space-y-4">
      <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-center text-gray-300">
        Set a New Password
      </h2>

      <p className="text-center text-gray-400 text-sm">
        Type your email so we can send you a password recovery email
      </p>

      <div className="mt-8 space-y-5">
        <div className={`h-12 bg-gray-200 rounded-md ${shimmer}`}></div>
        <div className={`h-12 bg-gray-200 rounded-md ${shimmer}`}></div>
        <div className={`h-10 bg-gray-300 rounded-md ${shimmer}`}></div>
      </div>

      <p className="text-md text-gray-400 text-center my-6">
        Don&rsquo;t get the email?{" "}
        <span className={`bg-gray-200 w-16 h-4 inline-block rounded align-middle ${shimmer}`}></span>
      </p>
    </div>
  </div>
);
