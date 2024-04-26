import { supabase } from './../../init';

export const put_user_categorie = async (req, res) => {
  try {
    const categoryId = req.body.id;
    const new_categorie_name = req.body.categorie_name;

    if (!new_categorie_name) {
      res.status(400).json({ error: 'O nome da categoria é obrigatório' });
    }

    const { error } = await supabase
    .from('categories')
    .update({ name: new_categorie_name })
    .eq('id', categoryId)

    if (error) throw error;

    res.status(200).send("Nome de categoria alterado com sucesso")
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};