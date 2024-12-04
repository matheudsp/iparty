import Navbar from "@/app/_components/navbar";
import Footer from "@/app/_components/footer";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    
      <div className="h-screen">
        <Navbar className="h-[8vh]" />
        <main className="min-h-[92vh]">{children}</main>
        <Footer />
      </div>
    
  );
}
