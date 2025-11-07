export default function Loading() {
    return (
        <div className="max-w-2xl mx-auto p-6 py-16 min-h-screen rounded-2xl shadow-lg animate-pulse">
            <div className=" p-10 space-y-8">
                <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-10"></div>

                <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-12 bg-gray-100 rounded-lg"></div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-12 bg-gray-100 rounded-lg"></div>
                </div>

                <div className="h-12 bg-primary/20 rounded-lg w-40"></div>
            </div>
        </div>
    );
}