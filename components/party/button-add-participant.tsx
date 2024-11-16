"use client"

import { addParticipant } from "@/actions/party"
import { Button } from "../ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { LoaderPinwheel } from "./loaderSpinWheel"


interface iButton {
    partyId: string
    size?: 'default' | 'icon' | 'lg' | 'sm'
    className?: string
}

export const ButtonAddParticipant = ({ partyId, size, className }: iButton) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleParticipate = async () => {
        setLoading(true)
        const response = await addParticipant(partyId)
        if (!response.success) {
            setLoading(false)
            return toast.error(response.error.message);
        }
        setLoading(false)
        toast.success("Você foi adicionado a festa!");
    }

    return (
        <Button variant={'default'} className={className} size={size} onClick={handleParticipate}>
            {!loading ? (
                'Participar'
            ) : (
                <LoaderPinwheel />
            )}
        </Button>
    )
}