import GamesImg from '@/GamesImagesData/Data';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

function GameImages({ onSportClick, activeSport }) {
  const [Games, setGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setGames(GamesImg);
  }, []);

  const getBentoClasses = (index) => {
    const pos = index % 8;
    switch (pos) {
      case 0: return "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2"; // Large hero
      case 1: return "md:col-span-1 md:row-span-1 sm:col-span-1"; // Standard
      case 2: return "md:col-span-1 md:row-span-1 sm:col-span-1"; // Standard
      case 3: return "md:col-span-2 md:row-span-1 sm:col-span-2"; // Wide
      case 4: return "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2"; // Tall
      case 5: return "md:col-span-2 md:row-span-1 sm:col-span-1"; // Right Top
      case 6: return "md:col-span-1 md:row-span-1 sm:col-span-1"; // Right Bottom
      case 7: return "md:col-span-3 md:row-span-1 sm:col-span-2"; // Wide Bottom
      default: return "";
    }
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-x-0 -top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6 leading-tight">
          Unleash Your <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">Inner Athlete</span>
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
          Immerse yourself in our curated collection of dynamic sports. Find your passion and let the games begin.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[250px] sm:auto-rows-[280px] md:auto-rows-[300px] gap-4 md:gap-6">
        {Games && Games.slice(0, visibleCount).map((item, index) => (
          <div 
            key={item.id} 
            onClick={() => onSportClick?.(item.name)}
            className={`group relative flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 transition-all duration-500 hover:-translate-y-2 cursor-pointer min-h-[250px] sm:min-h-0 ${getBentoClasses(index)} ${
              activeSport === item.name
                ? 'border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.35)]'
                : 'border-white/20 dark:border-gray-700/50 hover:border-blue-400/40'
            }`}
          >
            <Image 
              src={item.img} 
              alt={item.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            {/* Ambient glass gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md mb-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-8 group-hover:translate-x-0 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7-7m7-7H3"></path></svg>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-lg tracking-wide">
                {item.name}
              </h3>
              {activeSport === item.name && (
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/80 text-white text-xs font-black mb-2 backdrop-blur-sm">
                  Filtered ✓
                </span>
              )}
              <div className="h-1.5 w-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out delay-75 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        {Games && visibleCount < Games.length ? (
          <button 
            onClick={() => setVisibleCount(prev => prev + 8)}
            className="group relative cursor-pointer inline-flex items-center justify-center px-12 py-5 text-lg font-black text-white transition-all duration-300 bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] focus:outline-none hover:-translate-y-1 active:translate-y-0 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              Discover More
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </span>
          </button>
        ) : (
          Games.length > 8 && (
            <button 
              onClick={() => setVisibleCount(8)}
              className="group relative cursor-pointer inline-flex items-center justify-center px-12 py-5 text-lg font-black text-gray-900 dark:text-white transition-all duration-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-xl focus:outline-none hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative flex items-center gap-3">
                Show Less
                <svg className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
              </span>
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default GameImages;
