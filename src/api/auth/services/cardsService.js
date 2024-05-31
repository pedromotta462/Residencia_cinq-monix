import { supabase } from "../../../init";

// Service to get user cards
export const getUserCards = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("cards")
      .select(
        `
        id,
        user_id,
        name,
        dia_fechamento,
        dia_vencimento,
        limite      
        `
      )
      .eq("user_id", userId);

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error };
  }
};

// Service to create user card
export const createUserCard = async (userId, cardData) => {
  try {
    const { error } = await supabase.from("cards").insert({
      user_id: userId,
      name: cardData.name,
      dia_fechamento: cardData.dia_fechamento,
      dia_vencimento: cardData.dia_vencimento,
      limite: cardData.limite,
      active: true,
    });

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

// Service to update user card
export const updateUserCard = async (id, cardData) => {
  try {
    const updatedCard = {
      name: cardData.name,
      dia_fechamento: cardData.dia_fechamento,
      dia_vencimento: cardData.dia_vencimento,
      limite: cardData.limite,
      active: true,
    };

    const { error } = await supabase
      .from("cards")
      .update(updatedCard)
      .eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

// Service to delete user card
export const deleteUserCard = async (id) => {
  try {
    const { error } = await supabase.from("cards").delete().eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};
