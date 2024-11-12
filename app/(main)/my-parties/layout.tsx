
export const metadata = {
    title: "Minhas Festas",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    
    return <div className="md:mx-12 md:mt-12 mx-4 mt-6">{children}</div>;
}
