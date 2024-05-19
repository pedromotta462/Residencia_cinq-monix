import { supabase } from "../../../init";

export const get_user_cards = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cards")
      .select(`
      id,
      user_id,
      name,
      dia_fechamento,
      dia_vencimento,
      limite      
      `)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao recuperar cartão:", error);
    res.status(500).json({ error: "Erro ao recuperar os cartões" });
  }
};
