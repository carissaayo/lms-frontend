
import { Grid, List } from 'lucide-react';

const CoursesHeader = ({
  setViewMode,
  viewMode,
}: {
  setViewMode: (e: string) => void;
  viewMode:string;
}) => {
  return (
    <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Course Catalog
        </h1>
        <p className="text-gray-600">Discover your next learning adventure</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-3 rounded-xl transition-all duration-300 ${
            viewMode === "grid"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-3 rounded-xl transition-all duration-300 hover:cursor-pointer ${
            viewMode === "list"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CoursesHeader