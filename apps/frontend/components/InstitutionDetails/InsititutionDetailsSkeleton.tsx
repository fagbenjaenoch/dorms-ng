export function InstitutionDetailsSkeleton() {
  return (
    <main className="pt-20 animate-pulse">
      {/* Section 1: Header */}
      <section className="relative px-8 py-12 pb-32 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 z-10">
            {/* H1 */}
            <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md mb-4"></div>
            {/* P (acronym + city) */}
            <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md mb-8"></div>
            {/* Grid of 3 cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-[2rem]"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-[2rem]"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-[2rem]"></div>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <div className="h-12 w-52 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Hostels Near */}
      <section className="py-24 px-8 bg-gray-200/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              {/* H2 */}
              <div className="h-10 w-3/5 bg-gray-200 dark:bg-gray-800 rounded-md mb-2"></div>
              {/* P (description) */}
              <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
            {/* Filter/Sort */}
            <div className="flex gap-2">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div className="h-12 w-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
          </div>
          {/* SearchResultCard grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Section 3: Prime Location */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="rounded-[3rem] overflow-hidden shadow-xl border border-outline-variant/20 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left column */}
            <div className="lg:col-span-1 p-10 flex flex-col justify-center">
              {/* Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
              {/* Paragraph */}
              <div className="space-y-2 mb-8">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
              {/* Two info cards */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-200/50 dark:bg-gray-700/50">
                  <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                  <div>
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-1"></div>
                    <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-200/50 dark:bg-gray-700/50">
                  <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
                  <div>
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-1"></div>
                    <div className="h-4 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right column: Map/Image */}
            <div className="lg:col-span-2 relative min-h-[500px] bg-gray-300 dark:bg-gray-700">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-12 h-12 bg-gray-400 dark:bg-gray-600 rounded-full border-4 border-white"></div>
              </div>
              <div className="absolute top-[40%] left-[30%] w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full border-2 border-white"></div>
              <div className="absolute top-[60%] left-[45%] w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
