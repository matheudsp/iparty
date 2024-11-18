

import { currentUser } from "@/lib/auth";
import { Badge } from "../ui/badge";
import { HStack } from "../ui/hstack";
import { ScrollArea } from "../ui/scroll-area";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface iParticipantTable {
    participants: any[]
    creatorName: string
    creatorId: string
    isPaymentActive: boolean
}

export async function ParticipantsTable({ isPaymentActive, participants, creatorName, creatorId }: iParticipantTable
) {
    const user = await currentUser()
    return (
        <ScrollArea className="w-full h-[52vh] md:h-[56vh]">
            <Table >
                <TableCaption>Lista de participantes recentes.
                </TableCaption>
                <TableHeader className="w-full">
                    <TableRow >
                        <TableHead >Participante</TableHead>
                        {isPaymentActive && <TableHead >Status</TableHead>}

                    </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                    <TableRow className="w-full">
                        <TableCell className={`font-medium ${creatorId === user?.id && 'text-blue-500'}`}>{creatorId == user?.id ? (creatorName + ' (Você)') : (creatorName + ' (Anfitrião)')} </TableCell>
                    </TableRow>
                    {participants.map((participant) => (


                        <TableRow key={participant.id} className="w-full">
                            <TableCell className={`font-medium`}>
                                {participant.id === user?.id ? `${participant.user.name} (Você)` : (participant.user.name)}
                            </TableCell>
                            {isPaymentActive &&
                                <TableCell className={`${participant.isPaid ? "text-green-500" : "text-red-500"} text-sm font-medium `}>{participant.isPaid ? (
                                    'Pago'
                                ) : (
                                    'Não Pago'
                                )}</TableCell>}

                        </TableRow>




                    ))}

                </TableBody>
                <TableFooter className="w-full">
                    <TableRow className="">
                        <TableCell className="text-start">{(participants.length + 1) == 1 ? (
                            ` ${participants.length + 1} participante`
                        ) : (
                            ` ${participants.length + 1} participantes `
                        )} </TableCell>
                        <TableCell >Total</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </ScrollArea>
    );
}
