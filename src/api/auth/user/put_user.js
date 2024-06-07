import { supabase } from '../../../init';

export const put_user = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, phone, rg, cpf, profession, organ_issuer, post_code, address, birth_date } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'O nome do usuário é obrigatório' });
    }

    // Construindo o objeto de atualização com os campos fornecidos no corpo da requisição
    const updateData = { name, phone, rg, cpf, profession, organ_issuer, post_code, address, birth_date };

    // Remover campos não definidos (opcionais não enviados)
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const { error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;

    res.status(200).send("Dados do usuário atualizados com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};
