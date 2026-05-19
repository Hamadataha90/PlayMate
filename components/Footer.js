import React from 'react'

function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 mt-16 overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500 mb-4 tracking-tight cursor-pointer">PlayMate</h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs font-medium">
            Connect with sports players near you. Find teammates, join matches, and grow your game — Cricket, Football, Tennis, Hockey, Volleyball and more.
          </p>
        </div>

        {/* Sports */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Sports</h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center gap-2"><span className="text-lg">🏏</span> Cricket</li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center gap-2"><span className="text-lg">⚽</span> Football</li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center gap-2"><span className="text-lg">🎾</span> Tennis</li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center gap-2"><span className="text-lg">🏑</span> Hockey</li>
            <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer flex items-center gap-2"><span className="text-lg">🏐</span> Volleyball</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">Community Posts</li>
            <li className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">Find Players</li>
            <li className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">Create a Post</li>
            <li className="hover:text-blue-400 hover:translate-x-1 transition-all duration-300 cursor-pointer">Sign In</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">📧 support@players.app</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">📍 Egypt & Worldwide</li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">🕐 Available 24/7</li>
          </ul>
          <div className="flex gap-4 mt-6">
            {/* Twitter/X */}
            <a href="#" className="group bg-gray-900 border border-gray-800 hover:border-blue-500 hover:bg-blue-600/10 p-2.5 rounded-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="group bg-gray-900 border border-gray-800 hover:border-pink-500 hover:bg-pink-600/10 p-2.5 rounded-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="group bg-gray-900 border border-gray-800 hover:border-blue-700 hover:bg-blue-700/10 p-2.5 rounded-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(29,78,216,0.3)]">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800/80 bg-gray-950/50 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} PlayMate. All rights reserved.</p>
          <p>Built with ❤️ for sports communities worldwide.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
