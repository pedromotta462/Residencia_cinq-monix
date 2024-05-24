import { supabase } from "../../../init";

export const post_user_cards = async (req, res) => {
  try {
    if (!req.body.name) {
      res
      .status(400)
      .json({ error: "O name do cartão é obrigatório" });
    }

    const { error } = await supabase
      .from("cards")
      .insert({
        user_id: req.user.id,
        name: req.body.name,
        dia_fechamento: req.body.dia_fechamento,
        dia_vencimento: req.body.dia_vencimento,
        limite: req.body.limite,
        active: true,
      });

    if (error) throw error;

    res.status(200).send("Cartão de crédito cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar cartão de crédito :", error);
    res.status(500).json({ error: "Erro ao recuperar os dados" });
  }
};
