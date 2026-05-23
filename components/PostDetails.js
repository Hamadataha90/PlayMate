import React, { useState } from 'react';
import { useRouter } from 'next/router';

function PostDetails({ post }) {
  const [imgError, setImgError] = useState(false);
  const router = useRouter();
  const imgSrc = post?.image || post?.img;

  const formattedDate = post?.createdAt
    ? new Date(post.createdAt?.seconds ? post.createdAt.seconds * 1000 : post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : '';

  return (
    <div className="group flex flex-col cursor-pointer bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      
      {/* Image */}
      <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-900">
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={post?.title}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <span className="text-sm font-medium">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Sport badge */}
        {post?.game && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-white/95 text-blue-700 dark:bg-gray-900/95 dark:text-blue-400 shadow-sm border border-blue-100/50 dark:border-blue-900/50">
              {post.game}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col grow relative bg-white dark:bg-gray-800 z-10">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {post?.title}
        </h3>

        {/* Location */}
        {post?.location && (
          <div className="mb-3 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 mr-1 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {typeof post.location === 'object'
              ? `${post.location.city}, ${post.location.country}`
              : post.location}
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed grow font-medium">
          {post?.desc}
        </p>

        {/* Footer row: author + date */}
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center gap-3">
          
          {/* Author */}
          {(post?.userName || post?.userImage) && (
            <div className="flex items-center gap-2 min-w-0">
              {post.userImage && (
                <img
                  src={post.userImage}
                  alt={post.userName || 'Author'}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900/40 shrink-0"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400 truncate">
                {post.userName || 'Anonymous'}
              </span>
            </div>
          )}

          {formattedDate && (
            <span className="flex items-center text-xs font-semibold text-gray-400 dark:text-gray-500 shrink-0 ml-auto">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
