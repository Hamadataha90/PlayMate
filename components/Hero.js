import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FiArrowDown, FiPlus } from 'react-icons/fi'

function Hero() {
  const router = useRouter()

  const scrollToPosts = () => {
    if (router.pathname !== '/') {
      // Navigate home, then scroll after the page loads
      router.push('/#community-posts')
      return
    }
    const el = document.getElementById('community-posts')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="relative flex flex-col items-center justify-center py-20 px-4 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
          Connect. Play. Dominate.
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight drop-shadow-sm">
          Find Your Friends To Play With <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600">Around Your Area</span>
        </h1>
        <p className="mt-2 text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Your Guide To Finding Your Friend And Discovering New Gamers
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <button
            id="find-players-btn"
            onClick={scrollToPosts}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            Find Players
            <FiArrowDown size={18} className="group-hover:translate-y-1 transition-transform duration-300 animate-bounce" />
          </button>
          <button
            id="post-match-btn"
            onClick={() => router.push('/create-post')}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold text-base hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <FiPlus size={18} className="group-hover:rotate-90 transition-transform duration-300 text-blue-600 dark:text-blue-400" />
            Post a Match
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
