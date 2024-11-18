"use client";


import { useState, useEffect } from "react";
import { deleteParty, findAllByCreator } from "@/actions/party";
import { HStack } from "@/components/ui/hstack";
import { CreatePartyForm } from "@/components/form/create-party-form";
import { toast } from "sonner";
import { VStack } from "@/components/ui/vstack";
import { MyPartyCard } from "@/components/party/my-party-card";
import { PartySkeleton } from "@/components/ui/skeleton";
import { MyPartyEmptyPlaceholder } from "@/components/party/my-party-empty-placeholder";

export interface iParty {
  id: string;
  name: string;
  description?: string;
  slug: string;
  status?: boolean;
  isPaymentActive: boolean,
  valueForEachParticipant: string
}

export default function Page() {
  const [parties, setParties] = useState<iParty[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const DialogFormHandler = (state: boolean): void => setOpenDialogForm(state);
  const handleRefresh = (): void => setRefresh((prev) => !prev);

  const fetchParties = async () => {
    setLoading(true)
    const response = await findAllByCreator();
    if (response.success) {
      setParties(response.data);
      setLoading(false)
    }
    setLoading(false)
  };

  const handleDeleteParty = async (id: string) => {
    setLoading(true)
    const response = await deleteParty(id);
    if (response.success) {
      setRefresh(!refresh)
      toast.success("Festa excluída com sucesso!");
      setLoading(false)
    } else {
      toast.error("Erro ao excluir a festa.");
      setLoading(false)
    }
  };

  useEffect(() => {
    setParties([])
    fetchParties();
  }, [refresh]);


  return (
    <VStack className="gap-y-6">
      <HStack className="justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Minhas festas</h1>
        <CreatePartyForm
          dialogState={openDialogForm}
          dialogHandler={DialogFormHandler}
          onPartyCreated={handleRefresh}

        />
      </HStack>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PartySkeleton />
          <PartySkeleton />
          <PartySkeleton />
          <PartySkeleton />
        </div>
      ) : parties.length === 0 ? (
        <MyPartyEmptyPlaceholder
          dialogHandler={DialogFormHandler}
        />
      ) :
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {Array.isArray(parties) && parties.map((party) => (
              <MyPartyCard
                key={party.id}
                {...party}
                handleDelete={handleDeleteParty}
                onPartyUpdated={handleRefresh}
              />

            ))}
            

          </div>
        )}


    </VStack>
  );
}
