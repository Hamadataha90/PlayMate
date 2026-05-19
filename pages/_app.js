import Footer from "@/components/Footer";
import Headrer from "@/components/Headrer";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <div>
    <SessionProvider session={session}>
      <Headrer />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
    </div>
  );
}
