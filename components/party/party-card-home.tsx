
import { iPartyHome } from "@/app/(main)/page";
import { VStack } from "../ui/vstack";
import { HStack } from "../ui/hstack";
import Logo from "../ui/logo";
import { currentUser } from "@/lib/auth";
import { User2 } from "lucide-react";
import Link from 'next/link'


interface PartyCardHomeProps {
    party: iPartyHome;
}

const PartyCardHome = async ({ party }: PartyCardHomeProps) => {
    const user = await currentUser()
    const formattedDate = new Date(party.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "numeric",
        year: "numeric",
    });



    return (
        <Link className="flex flex-col justify-center w-60 h-28 shadow-md shadow-zinc-200 rounded-xl" href={`/party/${party.slug}`}>
            <HStack className="w-full h-full ">
                <div className="h-full w-4/12">
                    <div className='border-y-4 bg-slate-100 border-slate-400 rounded-y-xl rounded-l-xl border-primary flex items-center justify-center  w-full h-full'>
                        <Logo size={48} className='text-slate-500' />
                    </div>
                </div>
                <VStack className="w-8/12 justify-between border-y-4 rounded-r-xl border-slate-400 p-2">
                    <div className="font-medium  text-base md:text-lg  text-wrap leading-tight">  {party.name.length > 12 ? `${party.name.slice(0, 12)}...` : party.name}</div>
                    <HStack className="items-center  gap-1">
                        <User2 className="" size={16} />
                        <p className="text-[10px] md:text-xs text-wrap"> <span className="font-medium">{(party.creator.name === user?.name ? 'Eu' : party.creator.name.split(" ")[0])}</span></p>
                    </HStack>
                    <p className="text-[10px] md:text-[12px] text-wrap"> Criado em {formattedDate}</p>
                </VStack>
            </HStack>

        </Link>
    )
}

export default PartyCardHome;