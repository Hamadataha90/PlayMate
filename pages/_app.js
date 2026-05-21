import Footer from "@/components/Footer";
import Headrer from "@/components/Headrer";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <div>
      <SessionProvider session={session}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#1f2937',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '1rem',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              padding: '16px 24px',
              fontWeight: '500',
              fontFamily: 'inherit',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
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
