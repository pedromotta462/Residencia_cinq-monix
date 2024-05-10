import { supabase } from "../../../init";

export const delete_user_members = async (req, res) => {
  try {
    const membersId = req.body.id;

    if (!membersId) {
      res.status(400).json({ error: "O id do membro familiar é obrigatório" });
    }

    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", membersId);

    if (error) throw error;

    res.status(200).send("Membro da familia excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir membro familiar:", error);
    res.status(500).json({ error: "Erro ao excluir membro familiar" });
  }
};
