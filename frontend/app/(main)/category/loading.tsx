import { ProductCardsSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="px-4 md:px-6 py-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse">


      <div className="space-y-8 mt-12">
        <div className="flex justify-between gap-12">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-52"></div>
        </div>
        <ProductCardsSkeleton />
      </div>
    </div>
  );
}