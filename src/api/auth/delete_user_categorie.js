import { supabase } from './../../init';

export const delete_user_categorie = async (req, res) => {
  try {
    const categoryId = req.body.id;

    if (!categoryId) {
      res.status(400).json({ error: 'O id da categoria é obrigatório' });
    }

    const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)

    if (error) throw error;

    res.status(200).send("Categoria excluída com sucesso")
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({ error: 'Erro ao excluir categoria' });
  }
};