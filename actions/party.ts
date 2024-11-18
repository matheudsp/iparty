"use server";

import { z } from "zod";
import { partySchema } from "@/schemas";
import { response } from "@/lib/utils";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { addParticipantToParty, createParty, findBySlug, getPartiesByCreator, getPartiesFromCreatorByName, getPartyById, getPartyBySlug, removeParty, verifyCreatorParty, verifyParticipant } from "@/services/party";

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
  const { name, description, valueForEachParticipant, isPaymentActive } = validatedFields.data;

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

  await createParty(user.id, { name, description, valueForEachParticipant, isPaymentActive })

  return response({
    success: true,
    code: 201,
    message: "Party created.",
  });
};

type AddParticipantResponse = {
  success: boolean;
  code?: number;
  message?: string;
  error?: {
    code: number;
    message: string;
  };
};


export const addParticipant = async (
  partySlug: string,
  paymentMethod?: 'Card' | 'Pix'
): Promise<AddParticipantResponse> => {
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

  // Busca a festa pelo slug
  const party = await findBySlug(partySlug);

  if (!party) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "Evento não encontrado.",
      },
    });
  }

  // Verifica se o usuário é o criador da festa
  const isCreator = await verifyCreatorParty(user.id, party.id);

  if (isCreator) {
    return response({
      success: false,
      error: {
        code: 403,
        message: "O anfitrião não pode se inscrever no seu próprio evento.",
      },
    });
  }

  // Verifica se o usuário já está na festa
  const alreadyAdded = await verifyParticipant(user.id, party.id);

  if (alreadyAdded) {
    return response({
      success: false,
      error: {
        code: 410,
        message: "Você já está participando!",
      },
    });
  }

  //  Verifica se a festa requer pagamento
  if (party.isPaymentActive && paymentMethod) {
    if (paymentMethod === 'Card') {
      return {
        success: false,
        error: {
          code: 302, // Indica redirecionamento
          message: "Redirecionando para o checkout...",
        },
      };
    }
    if (paymentMethod === 'Pix') {
      return {
        success: false,
        error: {
          code: 501, // Indica funcionalidade não implementada
          message: "Pagamento via Pix ainda não implementado.",
        },
      };
    }
  }


  await addParticipantToParty(user?.id!, partySlug);

  return response({
    success: true,
    code: 200,
    message: "Você foi adicionado à festa com sucesso!",
  });

};

export const deleteParty = async (id: string) => {
  const party = await getPartyById(id)

  if (!party) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "Evento não encontrado.",
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