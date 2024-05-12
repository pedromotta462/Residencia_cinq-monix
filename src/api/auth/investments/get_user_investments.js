import { supabase } from "../../../init";

export const get_user_investments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("investments")
      .select("*")
      .eq("user_id", req.user.id);

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao acessar os dados dos investimentos:", error);
    res
      .status(500)
      .json({ error: "Erro ao acessar os dados dos investimentos" });
  }
};
