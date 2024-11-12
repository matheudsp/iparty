import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  User, UserRound, PartyPopper, ChevronDown } from "lucide-react";
import { signOut } from "@/auth";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import MobileMenu from "@/components/ui/mobile-menu";

async function AuthNav() {
  const user = await currentUser();

  if (!user) return;

  return (
    <>
      {/* Desktop Menu*/}
      <div className="hidden md:flex ">
        < DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pr-4 rounded-none h-fit flex gap-x-2 focus-visible:ring-offset-0">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image ?? ""} />
                <AvatarFallback>
                  <UserRound />
                </AvatarFallback>
              </Avatar>
              <p>{user.name?.split(' ')[0]}</p>
              <ChevronDown size={18}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex flex-col gap-y-2 py-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback>
                    <UserRound size={40} />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Olá, {user.name?.split(' ')[0]}!</h3>
                  <p className="text-sm">{user.email}</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/my-parties" className="gap-2 items-center">
                  <PartyPopper size={16} />
                  Minhas Festas
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/profile" className="gap-2 items-center">
                  <User size={16} />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <DropdownMenuItem asChild>
                <Button type="submit" variant={'destructive'} className="w-full flex ">
                  Sair
                </Button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu >
      </div>

      {/* Mobile Menu Button */}
      <MobileMenu/>
    </>
  );
}

export default function Navbar() {
  return (
    <nav className="flex gap-x-4 border-b items-center justify-between shadow-sm md:pl-8 px-4 md:px-0 h-14 ">
      <Link href="/">
        <h1 className="text-2xl font-semibold">iParty</h1>
      </Link>
      <AuthNav />
    </nav>
  );
}
