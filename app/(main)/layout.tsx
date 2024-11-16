import Navbar from "@/app/_components/navbar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Navbar className="h-[8vh]"/>
      <main className="h-[92vh]">{children}</main>
    </div>
  );
}
