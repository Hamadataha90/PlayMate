import { Geist, Geist_Mono } from "next/font/google";
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import GameImages from "./../components/GameImages";
import app from "@/config/Firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import Posts from "@/components/Posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const db = getFirestore(app);

// Skeleton loader for posts grid
function PostsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-md animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 w-full aspect-4/3"></div>
            <div className="p-7 flex flex-col gap-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-4/6"></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSport, setActiveSport] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
    } finally {
      setLoading(false);
    }
  };

  // Called by <Search> on every keystroke
  const handleSearch = useCallback((filtered) => {
    setFilteredPosts(filtered);
    setActiveSport(null); // clear sport filter badge when searching
  }, []);

  // Called by <GameImages> when a sport card is clicked
  const handleSportFilter = useCallback((sportName) => {
    if (activeSport === sportName) {
      // Toggle off — show all
      setActiveSport(null);
      setFilteredPosts(posts);
    } else {
      setActiveSport(sportName);
      const q = sportName.toLowerCase();
      setFilteredPosts(posts.filter((p) => (p.game ?? '').toLowerCase().includes(q)));
      // Scroll to posts section
      document.getElementById('community-posts')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSport, posts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <GameImages onSportClick={handleSportFilter} activeSport={activeSport} />

      {/* Community Posts anchor */}
      <div id="community-posts">
        <Search posts={posts} onSearch={handleSearch} />

        {/* Active sport filter badge */}
        {activeSport && (
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold border border-blue-200 dark:border-blue-800">
              Filtering: {activeSport}
              <button
                onClick={() => handleSportFilter(activeSport)}
                className="ml-1 hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Clear sport filter"
              >
                ✕
              </button>
            </span>
          </div>
        )}

        {loading ? (
          <PostsSkeleton />
        ) : filteredPosts.length > 0 ? (
          <Posts posts={filteredPosts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20a2 2 0 012 2v10a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {posts.length === 0 ? 'No Posts Yet' : 'No Results Found'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              {posts.length === 0
                ? "We couldn't find any community posts. Be the first to share something awesome!"
                : 'Try a different keyword or sport filter.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
