import { supabase } from "../../../init";

export const post_user_members = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: "O nome do membro da familia é obrigatório" });
    }

    const { error } = await supabase
      .from("members")
      .insert({ user_id: req.user.id, name: req.body.name });

    if (error) throw error;

    res.status(200).send("Membro da familia cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar membro familiar :", error);
    res.status(500).json({ error: "Erro ao recuperar os dados" });
  }
};
