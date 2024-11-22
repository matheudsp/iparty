import { iPartyHome } from "@/app/(main)/page";
import PartyCardHome from "./party-card-home";

import { Heading } from "../ui/heading";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { VStack } from "../ui/vstack";


interface Props {
    lastParties: iPartyHome[];
    headingTitle: string;
}

const PartyList = ({ lastParties, headingTitle }: Props) => {

    return (
        <VStack className="w-full">
            <Heading title={headingTitle} className="px-4 md:px-8" />

            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 px-4 py-4 md:py-4 md:px-8">

                    {lastParties?.length ? (
                        lastParties.map((party: iPartyHome) => (
                            <PartyCardHome key={party.id} party={party} />
                        ))
                    ) : (
                        <p>Nenhuma festa encontrada.</p>
                    )}
                </div>

                <ScrollBar className="w-[30%] bg-slate-100 rounded-full px-0.5 mx-auto" orientation="horizontal" />
            </ScrollArea>
        </VStack>
    );
};

export default PartyList;
