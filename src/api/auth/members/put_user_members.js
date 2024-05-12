import { supabase } from "../../../init";

export const put_user_members = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMember = {
      name: req.body.name,
    };

    if (!updatedMember) {
      res
      .status(400)
      .json({ error: "O nome do familiar é obrigatório" });
    }

    const { error } = await supabase
      .from("members")
      .update(updatedMember)
      .eq("id", id);

    if (error) throw error;

    res.status(200).send("Nome do membro familiar alterado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar os dados:", error);
    res.status(500).json({ error: "Erro ao atualizar os dados" });
  }
};
