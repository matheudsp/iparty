"use server"

import { addParticipant, findPartyBySlug } from '@/actions/party'

import { HStack } from '@/components/ui/hstack'
import Logo from '@/components/ui/logo'
import { VStack } from '@/components/ui/vstack'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ButtonAddParticipant } from '@/components/party/button-add-participant'

import { ParticipantsTable } from '@/components/party/participants-table'

import { ShareButton } from '@/components/party/share-button'

async function fetchParty(slug: string) {

  const res = await findPartyBySlug(slug)
  if (res.success) {
    return (res.data)
  }

  return null
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug


  const party = await fetchParty(slug)
  // console.log(party)

  if (!party) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Festa não encontrada.</p>
      </div>
    );
  }


  return (

    <VStack className="w-full max-w-[640px] border-x h-[92vh] justify-between">


      <Tabs defaultValue="general" className="w-full space-y-0 ">
        <div className='w-full py-8 flex bg-secondary  items-center justify-center'>
          <div className='shadow-md shadow-slate-300 border-4 border-slate-400 rounded-xl border-primary flex items-center justify-center  w-20 h-20'>
            <Logo size={48} className='text-slate-500' />
          </div>
        </div>
        <TabsList className="grid w-full  grid-cols-2">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="participants">Participantes</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <VStack className=' w-full '>
            <HStack className="w-full gap-x-4 p-4 border-b justify-between items-center">
              <VStack className='items-start gap-2 '>
                <h1 className="text-lg sm:text-2xl leading-5 font-bold text-gray-800">{party.name}</h1>
                <p className="sm:text-sm text-xs text-gray-500">
                  Criado em   {new Date(party.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </VStack>

            </HStack>

            <VStack className="space-y-2 w-full p-4 bg-white ">
              <h2 className="text-xl font-semibold text-gray-700">Descrição</h2>
              <p className="text-gray-600 sm:text-base text-sm">
                {party.description.length == 0 ? ("Não há descrição.") : (party.description)}
              </p>
            </VStack>

            <VStack className="space-y-2 w-full p-4  bg-white border-t">
              <h2 className="text-lg font-semibold text-gray-700">Informações da Festa</h2>
              <HStack className='justify-between text-base font-normal'>
                <p className="text-gray-600">Valor por Participante </p>
                <p className=''>{party.valueForEachParticipant} <span className='text-xs font-semibold'>BRL</span></p>
              </HStack>
            </VStack>

          </VStack>
        </TabsContent>
        <TabsContent value="participants">
          <ParticipantsTable creatorId={party.creatorId} creatorName={party.creator.name} participants={party.participants} />
        </TabsContent>
      </Tabs>
      <HStack className="bottom-0 w-full gap-4 p-4 border-t justify-between   items-center ">
        <ShareButton slug={party.slug} />
        <ButtonAddParticipant className='w-[40%] md:w-[20%]' size='lg' partyId={party.id} />
      </HStack>

    </VStack>

  );
}
