import React, { useState, useEffect } from 'react'
import { FiUserPlus, FiPlus, FiLogOut, FiSun, FiMoon } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Headrer() {
  const router = useRouter()
  const { data: session } = useSession()

  // Dark mode toggle — reads OS preference on first load
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    } else if (stored === 'light') {
      document.documentElement.classList.remove('dark')
      setDark(false)
    } else {
      // Respect OS preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
      if (prefersDark) document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105" onClick={() => router.push("/")}>
          <img
            src="/logo.png"
            alt="PlayMate logo"
            width={100}
            height={100}
            className="h-16 w-16 object-contain sm:h-20 sm:w-20 drop-shadow-sm"
          />
          <span className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600 tracking-tight hidden md:block">
            PlayMate
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-row items-center gap-3 sm:gap-4">

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="group relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-300 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 shadow-sm"
          >
            {dark
              ? <FiSun size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              : <FiMoon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
            }
          </button>

          {/* Sign In / Sign Out */}
          {!session ? (
            <button
              onClick={() => signIn()}
              className="group relative inline-flex items-center gap-2 rounded-full cursor-pointer border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-0.5"
            >
              <FiUserPlus size={18} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="group relative inline-flex items-center gap-2 rounded-full cursor-pointer border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 transition-all duration-300 hover:shadow-md hover:border-red-300 dark:hover:border-red-900 hover:-translate-y-0.5"
            >
              <FiLogOut size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}

          {/* Create Post */}
          <button
            onClick={() => router.push("/create-post")}
            className="group relative inline-flex items-center gap-2 rounded-full cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:-translate-y-0.5"
          >
            <FiPlus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Create Post</span>
          </button>

          {/* Profile avatar — only when logged in */}
          {session && (
            <div className="relative group cursor-pointer ml-1" onClick={() => router.push("/profile")}>
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
              <Image
                src={session.user?.image || "/profile.png"}
                alt="Your profile"
                width={50}
                height={50}
                className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Headrer
