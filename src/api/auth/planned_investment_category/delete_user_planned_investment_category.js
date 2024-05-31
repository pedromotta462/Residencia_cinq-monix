import { supabase } from "../../../init";
export const delete_user_planned_investment_category = async (req, res) => {
  try {
    const planned_investment_category_id = req.params.id;
    if (!planned_investment_category_id) {
      res.status(400).json({
        error: "O id da categoria de investimento planejada é obrigatório",
      });
    }
    const { error } = await supabase
      .from("planned_investment_category")
      .delete()
      .eq("id", planned_investment_category_id);
    if (error) {
      throw error;
    }

    res
      .status(200)
      .send("Categoria de investimento planejada excluída com sucesso");
  } catch (error) {
    console.error(
      "Erro ao excluir categoria de investimento planejada:",
      error
    );
    res
      .status(500)
      .json({ error: "Erro ao excluir categoria de investimento planejada" });
  }
};
