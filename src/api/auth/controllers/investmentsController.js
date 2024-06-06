import {
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} from "../services/investmentsService.js";

export const get_investments = async (req, res) => {
  try {
    const { data, error } = await getInvestments(req.user.id);
    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao recuperar investimentos:", error);
    res.status(500).json({ error: "Erro ao recuperar os investimentos" });
  }
};

export const post_investments = async (req, res) => {
  try {
    if (
      !req.body.goal_id ||
      !req.body.category_id ||
      !req.body.subcategory_id ||
      !req.body.member_id ||
      !req.body.account_id ||
      !req.body.investments_type_id ||
      !req.body.date ||
      !req.body.value ||
      !req.body.description
    ) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const { error } = await createInvestment(req.user.id, req.body);
    if (error) throw error;

    res.status(200).send("Investimento cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar investimento:", error);
    res.status(500).json({ error: "Erro ao cadastrar investimento" });
  }
};

export const put_investments = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.date || !req.body.value || !req.body.description) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const { error } = await updateInvestment(id, req.body);
    if (error) throw error;

    res.status(200).send("dados atualizado com sucesso");
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar os dados" });
  }
};

export const delete_investments = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: "O id do investimento é obrigatório" });
    }

    const { error } = await deleteInvestment(id);
    if (error) throw error;

    res.status(200).send("investimento excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir investimento:", error);
    res.status(500).json({ error: "Erro ao excluir investimento" });
  }
};
