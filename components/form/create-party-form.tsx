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
import { useTransition } from "react";
import { z } from "zod";
import { newParty } from "@/actions/party";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { FormInput } from "@/components/party/form-input";

import { PartyFormToggle } from "../party/party-form-toggle"

interface CreatePartyFormProps {
    onPartyCreated: () => void;
    dialogState: boolean
    dialogHandler: (state: boolean) => void;
}

export const CreatePartyForm: React.FC<CreatePartyFormProps> = ({
    dialogHandler,
    dialogState,
    onPartyCreated }) => {

    

    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof partySchema>>({
        resolver: zodResolver(partySchema),
        defaultValues: {
            name: "",
            description: "",
            isPaymentActive: false,
            valueForEachParticipant: "",
            pixKey: ""
        },
    });

    const handleSubmit = form.handleSubmit((values) => {
        startTransition(() => {
            newParty(values).then((data) => {
                if (data.success) {
                    // router.push(`/party/${slug}`)
                    toast.success(data.message);
                    onPartyCreated();
                    dialogHandler(false)
                    form.reset();
                } else {
                    toast.error(data.error.message);
                    dialogHandler(false)
                }

            });
        });
    });

    const onOpenChange = () => {
        dialogHandler(!dialogState)
        form.reset();
    }

    return (
        <Dialog open={dialogState} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    Adicionar Festa
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar festa</DialogTitle>
                    <DialogDescription>
                        Preencha todos os campos e pressione "Criar" quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
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

                        <DialogFooter className="pt-4 flex items-end">
                            <Button type="submit" className="w-[50%] md:w-[100%]" size={'default'}>Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}