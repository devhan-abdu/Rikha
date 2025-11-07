export default function Loading() {
    return (
        <div className="px-6 py-12 bg-white rounded-lg shadow-sm max-w-5xl mx-auto min-h-screen animate-pulse">
            <h2 className="text-3xl font-semibold font-cinzel text-center mb-10">
                <div className="h-12 bg-gray-200 rounded w-72 mx-auto"></div>
            </h2>

            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm"
                    >
                        <div className="space-y-3">
                            <div className="h-5 bg-gray-200 rounded w-48"></div>
                            <div className="h-4 bg-gray-200 rounded w-36"></div>
                            <div className="h-4 bg-gray-200 rounded w-44"></div>
                            <div className="h-4 bg-gray-200 rounded w-28"></div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="my-12 border-gray-200" />

            <div className="bg-gray-50 rounded-xl p-8 space-y-6">
                <div className="h-8 bg-gray-200 rounded w-48"></div>
                <div className="space-y-4">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-primary/20 rounded w-36"></div>
                </div>
            </div>
        </div>
    );
}