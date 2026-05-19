import React from 'react'
import PostDetails from './PostDetails';

function Posts({posts}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16 relative">
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 tracking-tight mb-4 drop-shadow-sm">
          Community Posts
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
          Discover the latest updates, stories, and highlights from our players.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <PostDetails key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Posts