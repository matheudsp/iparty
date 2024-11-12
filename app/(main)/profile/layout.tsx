

export const metadata = {
    title: "Perfil",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return <div className="md:mx-12 md:mt-12 mx-6 mt-6">{children}</div>;
}
