import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Hero from "@/components/Hero";
import  Search from "@/components/Search";
import GameImages from "./../components/GameImages";
import app from "@/config/Firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import Posts from "@/components/Posts";
import uploadPosts from "@/utils/uploadPosts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const db = getFirestore(app);

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(()=>{
    getPosts();
  },[])

  const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push({ id: doc.id, ...doc.data() });
    });
    setPosts(fetchedPosts);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <Search />
      <GameImages />

      {/* <div className="flex justify-center my-8">
        <button
          onClick={async () => {
            setIsUploading(true);
            setIsUploaded(false);
            await uploadPosts();
            setIsUploading(false);
            setIsUploaded(true);
            getPosts(); // Refresh the posts list
            setTimeout(() => setIsUploaded(false), 3000); // Reset after 3s so it can be clicked again
          }}
          disabled={isUploading}
          className={`px-8 py-3 rounded-xl font-bold shadow-md transition-all duration-300 flex items-center gap-2 ${
            isUploaded 
              ? "bg-green-500 text-white cursor-pointer" 
              : isUploading
                ? "bg-blue-400 text-white cursor-wait"
                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:-translate-y-1 hover:shadow-lg"
          }`}
        >
          {isUploading && (
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isUploaded && !isUploading && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isUploading ? "Uploading..." : isUploaded ? "Posts Uploaded!" : "Upload Posts"}
        </button>
      </div> */}

      {posts.length > 0 ? (
        <Posts posts={posts} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20a2 2 0 012 2v10a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Posts Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">We couldn't find any community posts. Be the first to share something awesome!</p>
        </div>
      )}
    </div>
     
      
  );
}
