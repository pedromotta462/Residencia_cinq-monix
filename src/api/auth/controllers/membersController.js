import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../services/membersService";

export const get_members = async (req, res) => {
  try {
    const { data, error } = await getMembers(req.user.id);
    if (error) throw error;

    res.status(200).send(data);
  } catch (error) {
    console.error("Erro ao recuperar dados do membro familiar:", error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar dados do membro familiar" });
  }
};

export const post_members = async (req, res) => {
  try {
    if (!req.body.name) {
      res
        .status(400)
        .json({ error: "O nome do membro da familia é obrigatório" });
    }

    const { error } = await createMember(req.user.id, req.body);
    if (error) throw error;

    res.status(200).send("Membro da familia cadastrado com sucesso");
  } catch (error) {
    console.error("Erro ao cadastrar membro familiar :", error);
    res.status(500).json({ error: "Erro ao recuperar os dados" });
  }
};

export const put_members = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.name) {
      return res.status(400).json({ error: "O nome é obrigatório" });
    }

    const { error } = await updateMember(id, req.body);
    if (error) throw error;

    res.status(200).send("Membro atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar o membro:", error);
    res.status(500).json({ error: "Erro ao atualizar o membro" });
  }
};

export const delete_members = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } = await deleteMember(id);
    if (error) throw error;

    res.status(200).send("Membro deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar o membro:", error);
    res.status(500).json({ error: "Erro ao deletar o membro" });
  }
};
