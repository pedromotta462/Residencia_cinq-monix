import { supabase } from "../../../init";

export const delete_user_cards = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res
        .status(400)
        .json({ error: "O id do cartão é obrigatório" });
    }

    const { error } = await supabase
      .from("cards")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).send("Cartão excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir cartão:", error);
    res.status(500).json({ error: "Erro ao excluir cartão" });
  }
};
