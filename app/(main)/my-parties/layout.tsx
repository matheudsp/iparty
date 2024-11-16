
export const metadata = {
    title: "Minhas Festas",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return <div className="md:px-12 md:py-12 px-4 py-6">{children}</div>;
}
