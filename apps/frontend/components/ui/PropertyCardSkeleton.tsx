export default function PropertyCardSkeleton() {
  return (
    <div
      className={`group rounded-[2.5rem] overflow-hidden shadow-sm bg-white animate-pulse`}
    >
      <div className="relative h-64 overflow-hidden bg-gray-300">
        {/* Image placeholder */}
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="h-6 w-48 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 w-32 bg-gray-300 rounded-md"></div>
          </div>
          <div className="text-right">
            <div className="h-7 w-24 bg-gray-300 rounded-md mb-1"></div>
            <div className="h-3 w-16 bg-gray-300 rounded-md mx-auto"></div>
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 bg-gray-300 h-6 w-28"></span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 bg-gray-300 h-6 w-32"></span>
        </div>
        <div className="w-full h-12 bg-primary/10 rounded-2xl"></div>
      </div>
    </div>
  );
}
