"use server"

import { findPartyBySlug } from '@/actions/party'
import { Button } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import Logo from '@/components/ui/logo'
import { VStack } from '@/components/ui/vstack'
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

  if (!party) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Festa não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen  space-y-4">
      <VStack className="w-full max-w-2xl  rounded-lg  space-y-4 items-center justify-center">

        <div className='w-full bg-secondary p-4 flex items-center justify-center'>
          <div className='border-4 rounded-xl border-primary flex items-center justify-center  w-20 h-20'>
            <Logo size={48} />
          </div>
        </div>

        <VStack className='px-4 md:px-0 w-full'>
          <HStack className="w-full border-b pb-4 justify-between items-center">
            <VStack className='items-start'>
              <h1 className="text-2xl font-bold text-gray-800">{party.name}</h1>
              <p className="text-sm text-gray-500">
                Criado em   {new Date(party.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </VStack>
            <Button variant={'default'}>
              Participar
            </Button>
          </HStack>

          <VStack className="space-y-2 w-full ">
            <h2 className="text-xl font-semibold text-gray-700">Descrição</h2>
            <p className="text-gray-600">
              {party.description.length == 0 ? ("Não há descrição") : (party.description)}
            </p>
          </VStack>

          <VStack className="border-t pt-4 w-full">
            <h2 className="text-lg font-medium text-gray-700">Informações da Festa</h2>
            <p className="text-gray-600">Valor por Participante: R$ {party.valueForEachParticipant}</p>
          </VStack>
        </VStack>


      </VStack>
    </div>
  );
}
