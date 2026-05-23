import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Form from '../FormPost/Form'
import { FiLogIn, FiArrowLeft, FiPlusCircle } from 'react-icons/fi'

function CreatePost() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // Loading State
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-gray-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
          </div>
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 animate-pulse">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Unauthenticated State
  if (status === 'unauthenticated' || !session) {
    return (
      <div className="min-h-screen bg-linear-to-tr from-gray-50 via-gray-100 to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/20 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl -z-10"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl -z-10"></div>

        <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800/60 shadow-2xl rounded-3xl p-8 sm:p-12 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center p-5 bg-blue-50 dark:bg-blue-950/50 rounded-2xl text-blue-600 dark:text-blue-400 mb-6">
            <FiPlusCircle size={36} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-3">Sign In Required</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 font-medium">
            Please sign in to share a sports match, find hitting partners, and connect with other players in your community.
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => signIn()}
              className="group inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-white shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <FiLogIn size={18} className="group-hover:translate-x-0.5 transition-transform" />
              Sign In with Account
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 font-bold text-gray-700 dark:text-gray-300 transition-all duration-300 cursor-pointer"
            >
              <FiArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated State
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto">
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center'>Create a New Post</h1>
            <Form />
        </div>
    </div>
  )
}

export default CreatePost