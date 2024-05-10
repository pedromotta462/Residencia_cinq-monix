import { supabase } from "../../../init";

export const get_user_members = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", req.user.id);

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao recuperar dados do membro familiar:", error);
    res.status(500).json({ error: "Erro ao recuperar dados do membro familiar" });
  }
};
