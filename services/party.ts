
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

export const getPartyBySlug = async (slug: string) => {
    try {
        const party = await db.party.findUnique({ where: { slug } });

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
