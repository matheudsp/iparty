import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "iParty",
    template: "iParty | %s",
  },
  description: "Organize suas festas sem dor de cabeça!",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        
          <Toaster position="bottom-left" richColors theme="light" />
          {children}

      </body>


    </html >
  );
}
