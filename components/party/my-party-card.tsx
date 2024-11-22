

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { ChevronRight, PartyPopper, Pencil, Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

import { iParty } from "@/app/(main)/my-parties/page";
import Link from "next/link";

import { UpdatePartyForm } from "./update-party-form";

interface iPartyCard extends iParty {
    handleDelete: (id: string) => void
    onPartyUpdated: () => void
}

export const MyPartyCard = ({ id, name, description, slug, isPaymentActive, valueForEachParticipant, handleDelete,onPartyUpdated }: iPartyCard,) => {
    return (


        <Card key={id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border rounded-lg">

            <CardHeader className="flex-row items-center justify-between  p-4 border-b">
                <HStack className="gap-4 items-center">
                    <PartyPopper size={48} />
                    <VStack>
                        <CardTitle className="text-lg font-semibold text-gray-800">{name}</CardTitle>
                        <CardDescription className="text-sm font-medium text-gray-600">{description}</CardDescription>
                    </VStack>
                </HStack >
                <HStack>
                    <Link href={`/party/${slug}`}>
                        <Button variant={'default'} className="">
                            <text className="md:flex hidden">Abrir</text>
                            <ChevronRight />
                        </Button>
                    </Link>
                </HStack>
            </CardHeader >
            
            < CardFooter className="p-2 flex justify-center" >
                <UpdatePartyForm  onPartyUpdated={onPartyUpdated} party={{id,slug, name, description, isPaymentActive,valueForEachParticipant}}/>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="gap-2">
                            <Trash2 size={16} className="" />
                            Excluir
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá os dados permanentemente.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel >Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(id)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter >
        </Card >


    )
}