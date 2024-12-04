export const Footer = () => {

    return (
        <footer className="h-[8vh] p-4 md:p-0 bg-secondary text-gray-800 flex items-center justify-center">
            <p className="text-sm">
                Desenvolvido por{" "}
                <a
                    href="https://github.com/matheudsp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm font-medium hover:underline"
                >
                    matheudsp
                </a>
                
            </p>
        </footer>
    )
}

export default Footer