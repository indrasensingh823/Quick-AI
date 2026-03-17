import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Heart, Search, ArrowUpDown } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { debounce } from "lodash"; // optional, for search debounce

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // "newest" or "mostLiked"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // show 9 items per load

  const { user } = useUser();
  const { getToken } = useAuth();

  // Fetch all published creations from server
  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        // Ensure it's an array
        setCreations(Array.isArray(data.creations) ? data.creations : []);
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
    if (user) {
      fetchCreations();
    }
  }, [user]);

  // Debounced search handler (optional, requires lodash)
  const debouncedSetSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  // Filter and sort creations (client-side)
  const processedCreations = useMemo(() => {
    let result = [...creations];

    // Filter by search term (case-insensitive, in prompt)
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((c) =>
        c.prompt?.toLowerCase().includes(lowerSearch)
      );
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "mostLiked") {
      result.sort((a, b) => b.likes.length - a.likes.length);
    }

    return result;
  }, [creations, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedCreations.length / itemsPerPage);
  const currentItems = processedCreations.slice(
    0,
    currentPage * itemsPerPage
  );
  const hasMore = currentPage < totalPages;

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Reset pagination when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  // Like toggle (unchanged, but refetches)
  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations(); // refetch to get updated likes
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
  );

  if (!user) return null; // or redirect

  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
      {/* Header with search and sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold">Community Creations</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              onChange={(e) => debouncedSetSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-64"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="newest">Newest</option>
              <option value="mostLiked">Most Liked</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Creations Grid */}
      {loading && creations.length === 0 ? (
        // Initial loading skeletons
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {processedCreations.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-12 text-center">
              <Heart className="h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-semibold text-gray-700">
                No creations found
              </h3>
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? "Try a different search term."
                  : "Be the first to publish your AI creation!"}
              </p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((creation) => (
                  <div
                    key={creation.id}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <img
                      src={creation.content}
                      alt={creation.prompt || "Community creation"}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="line-clamp-2 text-sm text-white">
                        {creation.prompt}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-200">
                          {creation.likes.length}{" "}
                          {creation.likes.length === 1 ? "like" : "likes"}
                        </span>
                        <Heart
                          onClick={() => imageLikeToggle(creation.id)}
                          className={`h-5 w-5 cursor-pointer transition hover:scale-110 ${
                            creation.likes.includes(user.id)
                              ? "fill-red-500 text-red-600"
                              : "text-white"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More button */}
              {hasMore && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={loadMore}
                    className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium transition hover:bg-gray-50"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Community;