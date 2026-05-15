export function HostelDetailsSkeleton() {
  return (
    <main className="max-w-7xl mx-auto p-4 pt-20 min-h-screen sm:px-6 lg:px-8 animate-pulse">
      {/* Header section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          {/* Hostel Name */}
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md mb-2"></div>
          {/* Address */}
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        </div>
        <div className="flex gap-4">
          {/* Share Button */}
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          {/* Save Button */}
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        </div>
      </div>

      {/* Image Placeholder */}
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-xl my-4 shadow-xl"></div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-12">
          {/* Info cards */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xs border border-gray-300 dark:border-gray-600 flex flex-wrap gap-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md mb-1"></div>
                <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md mb-1"></div>
                <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* About section */}
          <section>
            <div className="h-8 w-60 bg-gray-200 dark:bg-gray-800 rounded-md mb-6"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
          </section>

          <hr className="border-t border-outline-variant/20 dark:border-gray-700" />

          {/* Location Overview section */}
          <section>
            <div className="h-8 w-60 bg-gray-200 dark:bg-gray-800 rounded-md mb-6"></div>
            {/* You can add a map skeleton here if applicable */}
          </section>
        </div>

        {/* Right sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 rounded-[2rem] p-8 shadow-2xl border border-outline-variant/20 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="mb-8">
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
              <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="h-14 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 flex items-start gap-4">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-600 rounded-md shrink-0"></div>
              <div>
                <div className="h-5 w-40 bg-gray-200 dark:bg-gray-600 rounded-md mb-1"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
