import { useEffect, useState } from "react";
import { Gem, Sparkles, Search, RefreshCw } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [filteredCreations, setFilteredCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { getToken } = useAuth();

  // Fetch data from server
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        // Ensure creations is an array (fallback to empty array)
        const creationsArray = Array.isArray(data.creations) ? data.creations : [];
        setCreations(creationsArray);
        setFilteredCreations(creationsArray);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // Filter creations based on search term (searches in multiple fields)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCreations(creations);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = creations.filter((item) => {
        // Try to search in common fields – adjust these based on your actual data structure
        const title = item.title?.toLowerCase() || "";
        const prompt = item.prompt?.toLowerCase() || "";
        const content = item.content?.toLowerCase() || "";
        const name = item.name?.toLowerCase() || "";
        return (
          title.includes(lowerSearch) ||
          prompt.includes(lowerSearch) ||
          content.includes(lowerSearch) ||
          name.includes(lowerSearch)
        );
      });
      setFilteredCreations(filtered);
    }
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, creations]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCreations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCreations.slice(indexOfFirstItem, indexOfLastItem);

  const handleRefresh = () => {
    setLoading(true);
    getDashboardData();
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4">
        {/* Total Creations Card */}
        <div className="flex w-full sm:w-72 items-center justify-between rounded-xl border border-gray-200 bg-white p-4 px-6">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex w-full sm:w-72 items-center justify-between rounded-xl border border-gray-200 bg-white p-4 px-6">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white">
            <Gem className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search and Refresh Bar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search creations by title, prompt, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Creations List */}
      {loading ? (
        <div className="flex h-3/4 items-center justify-center">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="mb-2 text-sm font-medium text-gray-600">
            Recent Creations {filteredCreations.length > 0 && `(${filteredCreations.length})`}
          </p>

          {filteredCreations.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
              <Sparkles className="h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-semibold text-gray-700">No creations yet</h3>
              <p className="text-sm text-gray-500">Get started by creating your first AI content.</p>
            </div>
          ) : (
            <>
              {currentItems.map((item) => (
                <CreationItem key={item.id} item={item} />
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;