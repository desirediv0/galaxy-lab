import localFont from "next/font/local";
import { Poppins, Open_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { RouteGuard } from "@/components/route-guard";
import { ClientOnly } from "@/components/client-only";

const jostFont = localFont({
  src: "./fonts/Jost-Regular.ttf",
  variable: "--font-jost",
  weight: "400",
  display: "swap",
});

const poppinsFont = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "400",
  display: "swap",
});

// Galaxy Labs™ Google Fonts
const poppinsGoogle = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins-google",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata = {
  title: "Galaxy Labs™ - Premium Supplements for Your Fitness Journey",
  description:
    "Get high-quality supplements at the best prices. Free shipping on orders over ₹999. Galaxy Labs™ - Your trusted partner in fitness and nutrition.",
  keywords: "supplements, fitness, nutrition, Galaxy Labs, protein, vitamins",
  author: "Galaxy Labs™",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppinsGoogle.variable} ${openSans.variable} ${quicksand.variable}`}
    >
      <head>
        {/* Galaxy Labs™ favicon and meta tags */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#D32F2F" />
        <meta name="msapplication-TileColor" content="#D32F2F" />
      </head>
      <body
        className={`${jostFont.variable} ${poppinsFont.variable} ${poppinsGoogle.variable} ${openSans.variable} ${quicksand.variable} font-galaxy-body antialiased bg-galaxy-cream text-galaxy-text-dark`}
      >
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <ClientOnly>
                  <RouteGuard>{children}</RouteGuard>
                </ClientOnly>
              </main>
              <Footer />
            </div>
            <Toaster
              position="top-center"
              richColors
              closeButton
              toastOptions={{
                style: {
                  fontFamily: "var(--font-open-sans), system-ui, sans-serif",
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
