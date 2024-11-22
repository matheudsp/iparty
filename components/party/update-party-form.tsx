"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { partySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { z } from "zod";
import { updateParty } from "@/actions/party";
import { toast } from "sonner";

import { Form } from "../ui/form";
import { FormInput } from "@/components/party/form-input";
import { Pencil } from "lucide-react"
import { PartyFormToggle } from "./party-form-toggle"
import { iParty } from "@/app/(main)/my-parties/page";



import { LoaderPinwheel } from "./loaderSpinWheel";


interface UpdatePartyFormProps {
    party: iParty
    onPartyUpdated: () => void;
    dialogState?: boolean
    dialogHandler?: (state: boolean) => void;
}

export const UpdatePartyForm: React.FC<UpdatePartyFormProps> = ({
    party,
    dialogHandler,
    dialogState,
    onPartyUpdated }) => {
    const [isPending, startTransition] = useTransition()
    

    const form = useForm<z.infer<typeof partySchema>>({
        resolver: zodResolver(partySchema),
        mode: "onChange",
        values: {
            name: party.name,
            description: party.description,
            isPaymentActive: party.isPaymentActive,
            valueForEachParticipant: party.valueForEachParticipant,
        },
    });

    const handleSubmit = form.handleSubmit((values) => {
        startTransition(() => {
            updateParty(party.id, values).then((data) => {
                if (data.success) {
                    onPartyUpdated()
                    dialogHandler?.(false);
                    return toast.success(data.message);
                }
                return toast.error(data.error.message);

            });
        });
    });
    return (
        <Dialog open={dialogState} onOpenChange={dialogHandler}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="gap-2">
                    <Pencil size={16} className="" />
                    Editar
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar festa - {party.name}</DialogTitle>
                    <DialogDescription>
                       {' Preencha todos os campos e pressione "Salvar" quando terminar.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <FormInput
                                control={form.control}
                                name="name"
                                label="Name"
                                autoComplete="off"
                                type="text"
                                placeholder="Ex: Social na minha casa"
                                isPending={isPending}
                            />

                            <FormInput
                                control={form.control}
                                name="description"
                                label="Descrição"
                                autoComplete="off"
                                type="text"
                                placeholder="Ex: Sem bebidas alcoólicas"
                                isPending={isPending}
                            />
                            <PartyFormToggle
                                control={form.control}
                                name="isPaymentActive"
                                label="Aceitar pagamentos (em desenvolvimento)"
                                description="Receba e gerencie os valores da festa pela plataforma."
                                isPending={isPending}
                            />
                            {form.watch("isPaymentActive") && (
                                <>
                                    <FormInput
                                        control={form.control}
                                        name="valueForEachParticipant"
                                        label="Cada participante pagará"
                                        autoComplete="off"
                                        type="number"
                                        placeholder="Ex: 25,00"

                                        isPending={isPending}
                                    />
                                    <FormInput
                                        control={form.control}
                                        name="pixKey"
                                        label="Chave PIX"
                                        autoComplete="off"
                                        type="number"
                                        placeholder="Sua chave PIX"
                                        isPending={isPending}
                                    />
                                </>
                            )}

                        </div>

                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (<LoaderPinwheel />) : "Salvar"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
} 