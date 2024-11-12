"use client";

import { Home, Menu, PartyPopper, User, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <div className="md:hidden flex">
            {/* Botão de abrir o menu */}
            {!isOpen && <Button
                variant={'outline'}
                onClick={toggleMenu}
                className="p-2 text-gray-700 focus:outline-none z-20"
                aria-label="Open menu"
            >
                <span>{!isOpen && <Menu />}</span>
            </Button>}

            <div
                className={`fixed inset-0 bg-primary/75  transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out z-10`}
            >
                {/* Fechar menu */}
                <Button
                    variant={'default'}
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 p-2 text-white focus:outline-none"
                    aria-label="Close menu"
                >
                    <X />
                </Button>

                {/* Itens do menu */}
                <nav className="flex flex-col items-center justify-center h-full space-y-4 w-full">
                    
                    <Link
                        href="/"
                        className="w-10/12  flex items-center "
                        onClick={toggleMenu}>
                        <Button
                            variant={'outline'}
                            className="w-full gap-2  text-primary"
                        >
                            <Home size={16} />
                            <span
                                className="text-lg"
                            >Início</span>
                        </Button>
                    </Link>


                    <Link
                        href="/my-parties"
                        className="w-10/12  flex items-center "
                        onClick={toggleMenu}>
                        <Button
                            variant={'outline'}
                            className="w-full gap-2  text-primary"
                        >
                            <PartyPopper size={16} />
                            <span
                                className="text-lg"
                            >Minhas Festas</span>
                        </Button>
                    </Link>


                    <Link
                        href="/profile"
                        className="w-10/12  flex items-center "
                        onClick={toggleMenu}>
                        <Button
                            variant={'outline'}
                            className="w-full gap-2  text-primary"
                        >
                            <User size={16} />
                            <span
                                className="text-lg"
                            > Meu Perfil</span>
                        </Button>
                    </Link>

                </nav>
            </div>
        </div >
    );
}