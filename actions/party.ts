"use server";

import { z } from "zod";
import { partySchema } from "@/schemas";
import { response } from "@/lib/utils";

import { currentUser } from "@/lib/auth";
import { addParticipantToParty, createParty, getPartiesByCreator, getPartiesFromCreatorByName, getPartyById, getPartyBySlug, removeParty, verifyCreatorParty, verifyParticipant } from "@/services/party";

export const newParty = async (party: z.infer<typeof partySchema>) => {
  const user = await currentUser();
  if (!user) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized.",
      },
    });
  }

  // Check if user input is not valid.
  const validatedFields = partySchema.safeParse(party);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    });
  }
  const { name, description, valueForEachParticipant } = validatedFields.data;

  // Check if user already exist, then return an error.
  const existingParty = await getPartiesFromCreatorByName(user.id, name);
  if (existingParty) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Party already exists. Please use another name.",
      },
    });
  }

  await createParty(user.id, { name, description, valueForEachParticipant })

  return response({
    success: true,
    code: 201,
    message: "Party created.",
  });
};

export const addParticipant = async (partyId: string) => {
  const user = await currentUser();

  if (!user) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized.",
      },
    });
  }



  const party = await getPartyById(partyId)
  if (!party) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "Party not found.",
      },
    });
  }

  const verification = await verifyCreatorParty(user.id, partyId)
  if (verification) {
    return response({
      success: false,
      error: {
        code: 500,
        message: 'O anfitrião não pode se inscrever no seu próprio evento.'
      }
    })
  }

  const alreadyAdded = await verifyParticipant(user.id, partyId)
  if (alreadyAdded) {
    return response({
      success: false,
      error: {
        code: 404,
        message: 'Você já está participando!'
      }
    })
  }


  await addParticipantToParty(user.id, partyId)
  return response({
    success: true,
    code: 200,
    message: "Você foi adicionado a festa!"
  });

}

export const deleteParty = async (id: string) => {
  const party = await getPartyById(id)

  if (!party) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "No parties found.",
      },
    });
  }

  await removeParty(id)

  return response({
    success: true,
    code: 200,
    message: "Party deleted successfully."
  });
}

export const findPartyBySlug = async (slug: string) => {
  const party = await getPartyBySlug(slug)

  if (!party) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "Party not found.",
      },
    });
  }

  return response({
    success: true,
    code: 200,
    data: party,
  });
}

export const findAllByCreator = async () => {
  const user = await currentUser();

  // Verifica se o usuário está autenticado
  if (!user) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized.",
      },
    });
  }

  // Tenta pegar as festas do usuário
  const parties = await getPartiesByCreator(user.id);

  // Se não encontrar festas, retorna uma resposta adequada
  if (!parties || parties.length === 0) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "No parties found for this user.",
      },
    });
  }

  // Retorna as festas encontradas

  return response({
    success: true,
    code: 200,
    data: parties,
  });
};