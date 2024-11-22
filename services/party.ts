
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { partySchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const createParty = async (userId: string, party: z.infer<typeof partySchema>) => {
    const slug = await generateSlug(party.name)

    try {
        return await db.party.create({
            data: {
                name: party.name,
                description: party.description,
                valueForEachParticipant: party.valueForEachParticipant,
                slug: slug,
                creatorId: userId
            }
        });
    } catch {
        return null;
    }
};

export const verifyCreatorParty = async (userId: string, partyId: string) => {

    try {
        const verification = await db.party.findFirst({
            where: {
                id: partyId,
                creatorId: userId
            }
        })

        return verification
    } catch {
        return null
    }
}

export const verifyParticipant = async (userId: string, partyId: string) => {
    try {
        const participant = await db.partyParticipant.findFirst({
            where: {
                partyId: partyId,
                userId: userId
            }
        })
        return participant
    } catch {
        return null
    }
}

export const addParticipantToParty = async (userId: string, slug: string, isPaid?: boolean) => {
    try {

        const findbySlug = await db.party.findUnique({
            where: { slug: slug }
        })

        const party = await db.partyParticipant.create({
            data: {
                partyId: findbySlug.id,
                userId: userId,
                isPaid: isPaid
            }
        })
        return party

    } catch {
        return null
    }
}

export const getLastPartiesFromUser = async (userId: string) => {
    try {
        const parties = await db.party.findMany({
            where: {
                AND: [
                    {
                        participants: {
                            some: { userId: userId } // O usuário é um participante
                        }
                    },
                    {
                        creatorId: { not: userId } // O usuário não é o criador
                    }
                ]
            },
            include: {
                creator: {
                    select: { name: true }
                }
            },
            orderBy: [
                { createdAt: 'desc' }
            ],
            take: 9
        });

        return parties;
    } catch (error) {
        console.error("Error fetching parties: ", error);
        return null;
    }
};


export const getLastPartiesFromCreator = async (userId: string) => {
    try {
        const party = await db.party.findMany({
            where: {
                creatorId: userId
            },
            include: {
                creator: {
                    select: { name: true }
                }
            },
            orderBy: [
                { createdAt: 'desc' }
            ],
            take: 9
        })

        return party
    } catch {
        return null;
    }
}



export const getPartiesFromCreatorByName = async (userId: string, name: string) => {
    try {
        const party = await db.party.findFirst({
            where: {
                name: name,
                creatorId: userId
            }
        })

        return party
    } catch {
        return null;
    }
}

export const getPartiesByCreator = async (userId: string) => {
    try {
        const party = await db.party.findMany({
            where: {
                creatorId: userId
            }
        })
        return party;
    } catch {
        return null;
    }
}

export const getPartyById = async (id: string) => {
    try {
        const party = await db.party.findUnique({ where: { id } });

        return party;
    } catch {
        return null;
    }
};

export const findBySlug = async (slug: string) => {
    try {
        const party = await db.party.findUnique({ where: { slug } });

        return party;
    } catch {
        return null;
    }
};


export const getPartyBySlug = async (slug: string) => {
    try {
        const party = await db.party.findUnique({
            where: { slug },
            include: {
                creator: {
                    select: {
                        name: true
                    }
                },
                participants: {
                    include: {
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return party;
    } catch {
        return null;
    }
};

export const removeParty = async (id: string) => {
    try {
        const party = await db.party.delete({ where: { id } });

        return party;
    } catch {
        return null;
    }
};

type UpdatePartyType = Prisma.Args<typeof db.party, "update">["data"];
export const updatePartyById = async (id: string, payload: UpdatePartyType) => {
    try {
        return await db.party.update({
            where: { id },
            data: payload,
        });
    } catch {
        return null;
    }
};
