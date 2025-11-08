export default function Loading() {
  return (
    <div className="px-4 md:px-6 py-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse">
     

      <div className="space-y-8 mt-12">
        <div className="flex justify-between gap-12">
          <div className="h-10 bg-gray-200 rounded w-48"></div>
          <div className="h-12 bg-gray-200 rounded-xl w-52"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md h-96 p-4 space-y-4">
              <div className="h-64 bg-gray-200 rounded-xl"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-primary/20 rounded-lg w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}