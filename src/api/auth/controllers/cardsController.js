import {
  getUserCards,
  createUserCard,
  updateUserCard,
  deleteUserCard,
} from "../services/cardsService";

export const get_user_cards = async (req, res) => {
  try {
    const { data, error } = await getUserCards(req.user.id);
    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao recuperar cartão:", error);
    res.status(500).json({ error: "Erro ao recuperar os cartões" });
  }
};

export const post_user_cards = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: "O nome do cartão é obrigatório" });
    }

    const { error } = await createUserCard(req.user.id, req.body);
    if (error) throw error;

    res.status(200).send("Cartão de crédito cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar cartão de crédito:", error);
    res.status(500).json({ error: "Erro ao cadastrar cartão de crédito" });
  }
};

export const put_user_cards = async (req, res) => {
  try {
    const id = req.params.id;

    if (
      !req.body.name ||
      !req.body.dia_fechamento ||
      !req.body.dia_vencimento ||
      !req.body.limite
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const { error } = await updateUserCard(id, req.body);
    if (error) throw error;

    res.status(200).send("Cartão atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar o cartão:", error);
    res.status(500).json({ error: "Erro ao atualizar o cartão" });
  }
};

export const delete_user_cards = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "O id do cartão é obrigatório" });
    }

    const { error } = await deleteUserCard(id);
    if (error) throw error;

    res.status(200).send("Cartão excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir cartão:", error);
    res.status(500).json({ error: "Erro ao excluir cartão" });
  }
};
