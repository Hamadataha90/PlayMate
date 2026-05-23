import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import app from '@/config/Firebase';
import { toast } from 'react-hot-toast';
import { FiLogOut, FiTrash2, FiMapPin, FiMail, FiUser, FiActivity, FiArrowRight, FiLogIn, FiPlusCircle, FiEdit, FiX } from 'react-icons/fi';
import Image from 'next/image';

const db = getFirestore(app);

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State for fetching/listing posts
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  
  // State for deletion confirmation
  const [deletingId, setDeletingId] = useState(null);
  const [confirmTimeoutId, setConfirmTimeoutId] = useState(null);
  
  // State for post editing modal
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    desc: '',
    game: '',
    location: '',
    image: '',
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setLoadingPosts(false);
    } else if (status === 'authenticated' && session?.user?.email) {
      fetchUserPosts();
    }
  }, [status, session]);

  const fetchUserPosts = async () => {
    setLoadingPosts(true);
    try {
      const q = query(
        collection(db, 'posts'),
        where('userEmail', '==', session.user.email)
      );
      const querySnapshot = await getDocs(q);
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      // Sort posts by createdAt (descending)
      fetchedPosts.sort((a, b) => {
        const dateA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt).getTime();
        const dateB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt).getTime();
        return (dateB || 0) - (dateA || 0);
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      toast.error('Failed to load your posts. Please refresh.');
    } finally {
      setLoadingPosts(false);
    }
  };

  // Edit actions
  const handleEditClick = (post) => {
    setEditingPost(post);
    setEditFormData({
      title: post.title || '',
      desc: post.desc || '',
      game: post.game || '',
      location: post.location || '',
      image: post.image || post.img || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const postRef = doc(db, 'posts', editingPost.id);
      await updateDoc(postRef, {
        title: editFormData.title,
        desc: editFormData.desc,
        game: editFormData.game,
        location: editFormData.location,
        image: editFormData.image,
      });

      // Update posts state locally
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === editingPost.id
            ? { ...p, ...editFormData }
            : p
        )
      );

      toast.success('Post updated successfully! 📝');
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating document: ', error);
      toast.error('Failed to update post. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Delete actions
  const handleDeleteClick = (postId) => {
    if (deletingId === postId) {
      executeDelete(postId);
    } else {
      setDeletingId(postId);
      if (confirmTimeoutId) clearTimeout(confirmTimeoutId);
      const timeout = setTimeout(() => {
        setDeletingId(null);
      }, 3000);
      setConfirmTimeoutId(timeout);
    }
  };

  const executeDelete = async (postId) => {
    if (confirmTimeoutId) {
      clearTimeout(confirmTimeoutId);
      setConfirmTimeoutId(null);
    }
    
    const previousPosts = [...posts];
    setPosts(posts.filter((p) => p.id !== postId));
    setDeletingId(null);

    try {
      await deleteDoc(doc(db, 'posts', postId));
      toast.success('Post deleted successfully! 🗑️');
    } catch (error) {
      console.error('Error deleting document: ', error);
      toast.error('Failed to delete post. Please try again.');
      setPosts(previousPosts);
    }
  };

  useEffect(() => {
    return () => {
      if (confirmTimeoutId) clearTimeout(confirmTimeoutId);
    };
  }, [confirmTimeoutId]);

  // Loading Session State
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-gray-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
          </div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 animate-pulse">Loading profile details...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated State
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-linear-to-tr from-gray-50 via-gray-100 to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl -z-10"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl -z-10"></div>

        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/60 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center p-5 bg-blue-50 dark:bg-blue-950/50 rounded-2xl text-blue-600 dark:text-blue-400 mb-6">
            <FiUser size={36} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-3">Sign In Required</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
            Please sign in to access your personal dashboard, view statistics, and manage your community match posts.
          </p>
          <button
            onClick={() => signIn()}
            className="group inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-white shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <FiLogIn size={18} className="group-hover:translate-x-0.5 transition-transform" />
            Sign In with Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Profile Details Card */}
        <div className="relative group overflow-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full -z-10"></div>
          
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-blue-500/20 overflow-hidden shrink-0">
              <img
                src={session?.user?.image || "/profile.png"}
                alt="user avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {session?.user?.name}
              </h1>
              <span className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">
                <FiMail className="mr-1.5 text-blue-500 shrink-0" size={14} />
                {session?.user?.email}
              </span>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-4 sm:gap-6 shrink-0">
            {/* Stats Card */}
            <div className="flex items-center gap-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50 py-3.5 px-6 rounded-2xl">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                <FiActivity size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">My Posts</span>
                <span className="text-xl font-black text-gray-900 dark:text-white">
                  {loadingPosts ? '...' : posts.length}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => signOut()}
              className="group flex items-center justify-center gap-2 py-4 px-6 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-950 bg-white dark:bg-gray-800 hover:bg-red-50/50 dark:hover:bg-red-950/10 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 rounded-2xl font-bold transition-all duration-300 cursor-pointer"
            >
              <FiLogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>

        {/* User Posts Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800/60 pb-5">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">My Active Posts</h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                Manage the games and sports gatherings you've posted.
              </p>
            </div>
            
            {posts.length > 0 && (
              <button
                onClick={() => router.push("/create-post")}
                className="group flex items-center gap-1.5 py-3 px-5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <FiPlusCircle size={16} />
                Create Post
              </button>
            )}
          </div>

          {/* Posts Grid loading state */}
          {loadingPosts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-md animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 w-full aspect-4/3"></div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const formattedDate = post?.createdAt
                  ? new Date(post.createdAt?.seconds ? post.createdAt.seconds * 1000 : post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  : '';
                const isConfirming = deletingId === post.id;

                return (
                  <div key={post.id} className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5">
                    {/* Post Image */}
                    <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-900">
                      {post.image || post.img ? (
                        <img
                          src={post.image || post.img}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                          <span className="text-xs font-semibold">No Image Available</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {post.game && (
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-white/95 text-blue-700 dark:bg-gray-900/95 dark:text-blue-400 shadow-sm border border-gray-100/50 dark:border-gray-800/50">
                            {post.game}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6 flex flex-col grow">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-1">
                        {post.title}
                      </h3>

                      {post.location && (
                        <span className="flex items-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4">
                          <FiMapPin className="mr-1 text-red-500 shrink-0" size={14} />
                          {typeof post.location === 'object'
                            ? `${post.location.city}, ${post.location.country}`
                            : post.location}
                        </span>
                      )}

                      <p className="text-gray-500 dark:text-gray-400 line-clamp-3 text-sm leading-relaxed mb-6 grow font-medium">
                        {post.desc}
                      </p>

                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                          {!isConfirming && (
                            <button
                              onClick={() => handleEditClick(post)}
                              className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                            >
                              <FiEdit size={14} />
                              Edit
                            </button>
                          )}

                          {/* Interactive Deletion Action */}
                          <button
                            onClick={() => handleDeleteClick(post.id)}
                            className={`flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                              isConfirming
                                ? 'bg-red-600 text-white shadow-md shadow-red-500/20 animate-pulse'
                                : 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white'
                            }`}
                          >
                            <FiTrash2 size={14} />
                            {isConfirming ? 'Confirm?' : 'Delete'}
                          </button>
                        </div>
                        
                        {formattedDate && (
                          <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                            {formattedDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State Container */
            <div className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-8 sm:p-12 text-center shadow-md max-w-xl mx-auto w-full mt-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-bl-full -z-10"></div>
              
              <div className="inline-flex items-center justify-center p-5 bg-blue-50 dark:bg-blue-950/30 rounded-2xl text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                <FiPlusCircle size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">No Posts Created Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-md mx-auto font-medium">
                You haven't posted any sports matches or events yet. Pitch an event to gather sports enthusiasts and find hitting partners!
              </p>
              
              <button
                onClick={() => router.push("/create-post")}
                className="group inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Create Your First Post
                <FiArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Post Glassmorphic Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-2xl p-6 sm:p-8 max-w-lg w-full flex flex-col gap-6 max-h-[95vh] overflow-y-auto animate-in slide-in-from-bottom-8 duration-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700/50 pb-4">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Edit Post Details</h3>
              <button
                onClick={() => setEditingPost(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full bg-gray-50 dark:bg-gray-900 transition-all duration-200 cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-title" className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">Title</label>
                <input
                  type="text"
                  name="title"
                  id="edit-title"
                  required
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300 text-sm font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-desc" className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">Description</label>
                <textarea
                  name="desc"
                  id="edit-desc"
                  required
                  rows="3"
                  value={editFormData.desc}
                  onChange={handleEditChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300 text-sm font-semibold resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-game" className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">Game/Sport</label>
                  <input
                    type="text"
                    name="game"
                    id="edit-game"
                    required
                    value={editFormData.game}
                    onChange={handleEditChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300 text-sm font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-location" className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="edit-location"
                    required
                    value={editFormData.location}
                    onChange={handleEditChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-image" className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  id="edit-image"
                  required
                  value={editFormData.image}
                  onChange={handleEditChange}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/30 transition-all duration-300 text-sm font-semibold"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4 border-t border-gray-100 dark:border-gray-700/50 pt-5">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  disabled={updating}
                  className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {updating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;