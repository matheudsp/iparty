"use client"

import { addParticipant } from "@/actions/party"
import { Button } from "../../ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { LoaderPinwheel } from "../loaderSpinWheel"
import { DialogPayment } from "./dialog-payment"


interface iButton {
    partySlug: string
    isPaymentActive: boolean
    size?: 'default' | 'icon' | 'lg' | 'sm'
    className?: string
}

export const ButtonAddParticipant = ({ partySlug, isPaymentActive, size, className }: iButton) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleParticipate = async () => {
        setLoading(true);
        const response = await addParticipant(partySlug);

        if (!response.success) {
            setLoading(false);


            return toast.error(response.error?.message || "Erro desconhecido.");
        }

        setLoading(false);
        toast.success(response.message || "Participação confirmada!");
    };



    return (
        isPaymentActive ? (
            <DialogPayment size={size} loading={loading} handleFunction={handleParticipate}/>
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