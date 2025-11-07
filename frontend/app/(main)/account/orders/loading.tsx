export default function Loading() {
    return (
        <div className="px-6 py-12 bg-white rounded-lg shadow-sm max-w-5xl mx-auto min-h-screen animate-pulse">
            <h2 className="text-3xl font-semibold font-cinzel text-center mb-10">
                <div className="h-12 bg-gray-200 rounded w-64 mx-auto"></div>
            </h2>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded-full w-28" />
                ))}
            </div>

            <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-6 bg-gray-200 rounded w-40"></div>
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-20 bg-gray-100 rounded-lg mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}