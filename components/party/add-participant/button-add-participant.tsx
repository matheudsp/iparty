"use client"

import { addParticipant } from "@/actions/party"
import { Button } from "../../ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { LoaderPinwheel } from "../loaderSpinWheel"
import { DialogPaymentMethod } from "./dialog-payment-method"


interface iButton {
    partySlug: string
    isPaymentActive: boolean
    size?: 'default' | 'icon' | 'lg' | 'sm'
    className?: string
}

export const ButtonAddParticipant = ({ partySlug, isPaymentActive, size, className }: iButton) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleParticipate = async (paymentMethod?: 'Card' | 'Pix') => {
        setLoading(true);
        const response = await addParticipant(partySlug, paymentMethod);

        if (!response.success) {
            setLoading(false);

            if (response.error?.code === 302) {
                // Redirecionar para o checkout, caso necessário
                window.location.href = `/party/${partySlug}/checkout?slug=${partySlug}`;
                return;
            }

            return toast.error(response.error?.message || "Erro desconhecido.");
        }

        setLoading(false);
        toast.success(response.message || "Participação confirmada!");
    };



    return (
        isPaymentActive ? (
            <DialogPaymentMethod size={size} loading={loading} handleFunction={handleParticipate}/>
        ) : (
            <Button variant={'default'} onClick={() => { handleParticipate() }} size={size}>
                {!loading ? (
                    'Participar'
                ) : (
                    <LoaderPinwheel />
                )}
            </Button>
        )
    )
}