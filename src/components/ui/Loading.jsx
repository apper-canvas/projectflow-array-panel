import { motion } from "framer-motion";

const Loading = ({ type = "page" }) => {
  if (type === "stats") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-surface-100 dark:bg-surface-700 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-20 mb-2"></div>
                <div className="h-8 bg-surface-200 dark:bg-surface-600 rounded w-16 mb-2"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-12"></div>
              </div>
              <div className="w-12 h-12 bg-surface-200 dark:bg-surface-600 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-surface-100 dark:bg-surface-700 rounded-xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-surface-200 dark:bg-surface-600 rounded w-32"></div>
              <div className="h-6 bg-surface-200 dark:bg-surface-600 rounded w-16"></div>
            </div>
            <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-full mb-2"></div>
            <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-3/4 mb-4"></div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-surface-200 dark:bg-surface-600 rounded w-20"></div>
              <div className="h-8 bg-surface-200 dark:bg-surface-600 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.div
          className="inline-block w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-4 text-surface-600 dark:text-surface-400">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;