import { supabase } from "../../../init";

export const post_user_planned_investment_category = async (req, res) => {
  try {
    if (
      !req.body.planned_investment_id ||
      !req.body.category.id ||
      req.body.value
    ) {
      res.status(400).json({ error: "É necessário preencher todos os campos" });
    }

    const { error } = await supabase
      .from("planned_investment_category")
      .insert({
        planned_investment_id: req.body.planned_investment_id,
        category_id: req.body.category.id,
        value: req.body.value,
      });
    if (error) {
      throw error;
    }
    res
      .status(201)
      .send("Categoria de investimento planejada criada com sucesso");
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Erro ao criar categoria de investimento planejada" });
  }
};
