import { supabase } from "../../../init";

export const get_user_members = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .select(`
      id,
      user_id,
      name      
      `)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao recuperar dados do membro familiar:", error);
    res.status(500).json({ error: "Erro ao recuperar dados do membro familiar" });
  }
};
