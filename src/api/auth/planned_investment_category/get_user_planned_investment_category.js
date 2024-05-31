import { supabase } from "../../../init";

export const get_user_planned_investment_category_by_planned_investment_id = async (
  req,
  res
) => {
  try {
    const { data, error } = await supabase
      .from("planned_investment_category")
      .select(
        `id,
         planned_investment_id(id,month,year),
         category_id(id,name),
         value`
      )
      .eq("planned_investment_id", req.params.id);
    if (error) {
      throw error;
    }
    res.status(200).send(data);
  } catch (error) {
    console.error(
      "Erro ao acessar os dados de categorias de investimentos:",
      error
    );
    res.status(500).json({
      error: "Erro ao acessar os dados de categorias de investimentos",
    });
  }
};
