import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";

import CarouselHome from "@/components/party/carousel-home";
import PartyCardHome from "@/components/party/party-card-home";
import { getLastParties } from "@/actions/party";

export const metadata: Metadata = {
  title: "Início",
};

import { iParty } from "./my-parties/page";
import PartyList from "@/components/party/party-list";

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

async function fecthParties() {
  const res = await getLastParties()
  if (res.success) {
    return (res.data)
  }

  return null
}

export default async function Home() {

  const lastParties = await fecthParties()
  
  return (
    <VStack className="w-full gap-4">
      <section className="w-full flex flex-col justify-center items-center">
        <CarouselHome />
      </section>

      <section className="flex justify-start ">
        <PartyList headingTitle="Últimas festas que você participou" lastParties={lastParties.LastPartiesEntered} />
      </section>
      <section className="flex justify-start ">
        <PartyList headingTitle="Festas criadas por você" lastParties={lastParties.LastPartiesCreated} />
      </section>

    </VStack>
  )
}
