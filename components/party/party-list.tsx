import { iPartyHome } from "@/app/(main)/page";
import PartyCardHome from "./party-card-home";

import { Heading } from "../ui/heading";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { VStack } from "../ui/vstack";
import Link from "next/link";
import { Button } from "../ui/button";


interface Props {
    lastParties: iPartyHome[];
    headingTitle: string;
    ifEmptyEnableHref?: boolean
}

const PartyList = ({ lastParties, headingTitle, ifEmptyEnableHref }: Props) => {
    const hasParties = lastParties?.length > 0;

    return (
        <VStack className="w-full">
            <Heading title={headingTitle} className="px-4 md:px-8" />

            {!hasParties ? (
                <div className="flex w-full space-x-4 px-4 py-4 md:py-4 md:px-8">
                    {ifEmptyEnableHref ? (
                        <div className="flex h-[100px] p-4 w-full items-center justify-center rounded-md border border-dashed">
                            <div className="shrink-0 flex w-full flex-col items-center justify-center text-center">

                                <h3 className="text-start mb-2 text-gray-500">Nenhuma festa criada.</h3>
                                <Link href={'/my-parties'}>
                                    <Button size="sm" className="relative">
                                        Criar agora
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-[100px] p-4 w-full items-center justify-center rounded-md border border-dashed">
                            <p className="text-start text-gray-500">Nenhuma festa encontrada.</p>
                        </div>
                    )}
                </div>
            )
                : (
                    <ScrollArea className="w-full whitespace-nowrap ">
                        <div className="flex w-max space-x-4 px-4 py-4 md:py-4 md:px-8">
                            {lastParties.map((party) => (
                                <PartyCardHome key={party.id} party={party} />
                            ))}
                        </div>
                        <ScrollBar
                            className="w-[30%] bg-slate-100 rounded-full px-0.5 mx-auto"
                            orientation="horizontal"
                        />
                    </ScrollArea>
                )}


        </VStack >
    );
};

export default PartyList;
