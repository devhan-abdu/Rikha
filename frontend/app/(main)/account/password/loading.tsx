export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-sm mx-auto animate-pulse">
                <div className="h-12 bg-gray-200 rounded-xl w-80 mx-auto mb-10"></div>

                <div className="bg-white rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-200">
                    <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-32"></div>
                        <div className="h-12 bg-gray-100 rounded-xl border border-gray-300"></div>
                        <div className="h-4 bg-gray-200 rounded w-40 ml-auto"></div>
                    </div>

                    <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-36"></div>
                        <div className="h-12 bg-gray-100 rounded-xl border border-gray-300"></div>
                    </div>

                    <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-40"></div>
                        <div className="h-12 bg-gray-100 rounded-xl border border-gray-300"></div>
                    </div>

                    <div className="h-12 bg-primary/20 rounded-xl w-48 mt-8"></div>
                </div>

                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
}