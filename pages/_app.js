import Footer from "@/components/Footer";
import Headrer from "@/components/Headrer";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sync with the dark class set by Headrer toggle
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  const toastStyle = isDark
    ? {
        background: 'rgba(17, 24, 39, 0.95)',
        color: '#f9fafb',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(55, 65, 81, 0.8)',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
        padding: '16px 24px',
        fontWeight: '500',
        fontFamily: 'inherit',
      }
    : {
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#1f2937',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(229, 231, 235, 0.8)',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        padding: '16px 24px',
        fontWeight: '500',
        fontFamily: 'inherit',
      };

  return (
    <div>
      <SessionProvider session={session}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: toastStyle,
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: isDark ? '#111827' : '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: isDark ? '#111827' : '#fff',
              },
            },
          }}
        />
        <Headrer />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </div>
  );
}
