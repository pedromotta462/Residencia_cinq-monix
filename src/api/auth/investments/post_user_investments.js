import { supabase } from "../../../init";

export const post_user_investments = async (req, res) => {
  try {
    if (
      !req.body.date ||
      !req.body.value ||
      !req.body.description ||
      !req.body.origin ||
      !req.body.goal_id ||
      !req.body.category_id ||
      !req.body.subcategory_id ||
      !req.body.member_id ||
      !req.body.account_id ||
      !req.body.investments_type_id
    ) {
      res
      .status(400)
      .json({ error: "Todos os campos são obrigatórios" });
    }

    const { error } = await supabase.from("investments").insert({
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
      frequency: req.body.frequency,
      origin: req.body.origin,
    });

    if (error) throw error;

    res.status(200).send("Investimento cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar investimento:", error);
    res.status(500).json({ error: "Erro ao cadastrar investimento" });
  }
};
