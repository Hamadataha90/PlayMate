import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import app from '@/config/Firebase';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

function Form() {
  const router = useRouter();
  const db = getFirestore(app);
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    game: '',
    location: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'posts'), {
        ...formData,
        createdAt: serverTimestamp(),
        userEmail: session?.user?.email || '',
        userName: session?.user?.name || '',
        userImage: session?.user?.image || '',
      });
      toast.success("Post created successfully! 🎉");
      router.push('/');
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to create post. Please try again. ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Decorative Background Blob */}
      <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-30 dark:opacity-40 -z-10"></div>
      
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50">
        
        <div className="text-center mb-4">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 tracking-tight">Create a Post</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">Share your game details and find players nearby.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            required 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="e.g. Sunset Beach Volleyball"
            className="px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="desc" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Description</label>
          <textarea 
            name="desc" 
            id="desc" 
            required 
            rows="4"
            value={formData.desc} 
            onChange={handleChange} 
            placeholder="Describe the game, requirements, etc."
            className="px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Game/Sport</label>
            <input 
              type="text" 
              name="game" 
              id="game" 
              required 
              value={formData.game} 
              onChange={handleChange} 
              placeholder="e.g. Volleyball"
              className="px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Location</label>
            <input 
              type="text" 
              name="location" 
              id="location" 
              required 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="e.g. Miami Beach, FL"
              className="px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Image URL</label>
          <input 
            type="url" 
            name="image" 
            id="image" 
            required 
            value={formData.image} 
            onChange={handleChange} 
            placeholder="https://example.com/image.jpg"
            className="px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`mt-6 w-full py-5 rounded-2xl cursor-pointer font-black text-white text-lg transition-all duration-300 ${loading ? 'bg-blue-400 cursor-not-allowed opacity-70' : 'bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1'}`}
        >
          {loading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default Form;