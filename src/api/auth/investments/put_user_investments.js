import { supabase } from "../../../init";
export const put_user_investments = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedInvestment = {
      user_id: req.user.id,
      goal_id: req.body.goal_id,
      category_id: req.body.category_id,
      subcategory_id: req.body.subcategory_id,
      member_id: req.body.member_id,
      account_id: req.body.account_id,
      investments_type_id: req.body.investments_type_id,
      date: req.body.date,
      value: req.body.value,
      planner: req.body.planner,
      description: req.body.description,
      frequency: req.body.frequency
      // origin: req.body.origin,
    };

    if (
      !req.body.date
      || !req.body.value
      // || !req.body.planner 
      || !req.body.description
      || !req.body.frequency
      // || !req.body.origin
    ) {
      res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const { error } = await supabase
      .from("investments")
      .update(updatedInvestment)
      .eq("id", id);

    if (error) throw error;

    res.status(200).send("dados atualizado com sucesso");
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar os dados" });
  }
};
