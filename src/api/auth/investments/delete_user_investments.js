import { supabase } from "../../../init";

export const delete_user_investments = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res
      .status(400)
      .json({ error: "O id do investimento é obrigatório" });
    }

    const { error } = await supabase
      .from("investments")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(200).send("investimento excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir investimento:", error);
    res.status(500).json({ error: "Erro ao excluir investimento" });
  }
};