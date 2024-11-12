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

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { partySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { z } from "zod";
import { newParty } from "@/actions/party";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { FormInput } from "@/components/party/form-input";

interface CreatePartyFormProps {
    onPartyCreated: () => void;
    dialogState: boolean
    dialogHandler: (state:boolean) => void;
}

export const CreatePartyForm: React.FC<CreatePartyFormProps> = ({
    dialogHandler,
    dialogState,
    onPartyCreated }) => {

    const router = useRouter();

    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof partySchema>>({
        resolver: zodResolver(partySchema),
        defaultValues: {
            name: "",
            description: "",
            valueForEachParticipant: "",
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

    return (
        <Dialog open={dialogState} onOpenChange={dialogHandler}>
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
                        <div className="grid gap-4 py-4">
                            <FormInput
                                control={form.control}
                                name="name"
                                label="Name"
                                autoComplete="off"
                                type="text"
                                placeholder="Social na minha casa"
                                isPending={isPending}
                            />

                            <FormInput
                                control={form.control}
                                name="description"
                                label="Descrição"
                                autoComplete="off"
                                type="text"
                                placeholder="Traga sua bebida!"
                                isPending={isPending}
                            />

                            <FormInput
                                control={form.control}
                                name="valueForEachParticipant"
                                label="Cada participante pagará"
                                autoComplete="off"
                                type="number"
                                placeholder="50"
                                isPending={isPending}
                            />
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="payment-mode" className="text-right">Aceitar pagamentos</Label>
                                <Switch id="payment-mode" />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}