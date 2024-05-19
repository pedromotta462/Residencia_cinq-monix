import { supabase } from "../../../init";

export const get_user_investments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("investments")
      .select(`
      id,
      user_id,
      goal_id (
        id,
        objetivo,
        valor_inicial,
        prazo,
        valor_desejado
      ),
      category_id (
        id,
        name
      ),
      subcategory_id (
        id,
        name
      ),
      member_id (
        id,
        name
      ),
      account_id (
        id, 
        name
      ),
      investments_type_id (
        id,
        name
      ),
      date,
      value,
      planner,
      description,
      frequency      
      `)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao acessar os dados dos investimentos:", error);
    res
      .status(500)
      .json({ error: "Erro ao acessar os dados dos investimentos" });
  }
};
