import Navbar from "@/app/_components/navbar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Navbar className="h-[8vh]" />
      <main className="h-[92vh]">{children}</main>
      <footer className="h-[8vh] bg-secondary text-gray-800 flex items-center justify-center">
        <p className="text-sm">
          © {new Date().getFullYear()} - Desenvolvido por{" "}
          <a
            href="https://github.com/matheudsp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 text-sm font-medium hover:underline"
          >
            Matheus de Sousa Pereira
          </a>
        </p>
      </footer>
    </div>
  );
}
