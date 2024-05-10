import { supabase } from "../../../init";

export const put_user_members = async (req, res) => {
  try {
    const membersId = req.body.id;
    const new_members_name = req.body.name;

    if (!new_members_name) {
      res.status(400).json({ error: "O nome do familiar é obrigatório" });
    }

    const { error } = await supabase
      .from("members")
      .update({ name: new_members_name })
      .eq("id", membersId);

    if (error) throw error;

    res.status(200).send("Nome do membro familiar alterado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar os dados:", error);
    res.status(500).json({ error: "Erro ao atualizar os dados" });
  }
};
