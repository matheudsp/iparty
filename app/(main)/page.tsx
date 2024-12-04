import { VStack } from "@/components/ui/vstack";
import { Metadata } from "next";
import CarouselHome from "@/components/party/carousel-home";

import { getLastParties } from "@/actions/party";

export const metadata: Metadata = {
  title: "Início",
};

import { iParty } from "./my-parties/page";
import PartyList from "@/components/party/party-list";
import { useQuery } from "@tanstack/react-query";

export interface iPartyHome extends iParty {
  createdAt: Date
  creator: {
    name: string
  }
}

export interface iPartyData {
  LastPartiesEntered: iPartyHome[];
  LastPartiesCreated: iPartyHome[];
}

async function fetchParties() {
  const res = await getLastParties()
  if (res.success) {
    return (res.data)
  }

  return null
}

export default async function Home() {

  const lastParties = await fetchParties()

  return (
    <VStack className="w-full gap-4">
      <section className="w-full flex flex-col justify-center items-center">
        <CarouselHome />
      </section>

      <section className="flex justify-start ">
        <PartyList headingTitle="Últimas festas que você participou" lastParties={lastParties.LastPartiesEntered} />
      </section>
      <section className="flex justify-start ">
        <PartyList ifEmptyEnableHref headingTitle="Festas criadas por você" lastParties={lastParties.LastPartiesCreated} />
      </section>

    </VStack>
  )
}
