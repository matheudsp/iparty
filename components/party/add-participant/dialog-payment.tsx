import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HStack } from "../../ui/hstack"
import { CreditCard } from "lucide-react"
import { Button } from "../../ui/button"
import { LoaderPinwheel } from "../loaderSpinWheel"

interface iDialogPayment {
    size?: 'default' | 'icon' | 'lg' | 'sm';
    loading: boolean;
    handleFunction: (paymentMethod: 'Card' | 'Pix') => any
}

export const DialogPayment = ({ size, loading, handleFunction }: iDialogPayment) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'default'} size={size}>
                    {!loading ? (
                        'Participar'
                    ) : (
                        <LoaderPinwheel />
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pagar</DialogTitle>
                    <DialogDescription>
                        Selecione o método de pagamento
                    </DialogDescription>
                </DialogHeader>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                    
                    <Button onClick={() => {
                        handleFunction('Pix')
                    }} variant={'outline'} className="border shadow-sm rounded-xl h-32 flex items-center justify-center gap-2">
                        Pix
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="48px"
                            height="48px"
                            baseProfile="basic"
                        >
                            <path
                                fill="#4db6ac"
                                d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"
                            />
                            <path
                                fill="#4db6ac"
                                d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"
                            />
                            <path
                                fill="#4db6ac"
                                d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z"
                            />
                        </svg>
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    )
}