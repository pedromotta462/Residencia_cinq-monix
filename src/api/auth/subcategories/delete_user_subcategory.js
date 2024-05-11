import { supabase } from '../../../init';

export const delete_user_subcategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: 'O id da subcategoria é obrigatório' });
    }

    const { error } = await supabase
    .from('subcategories')
    .delete()
    .eq('id', id)

    if (error) throw error;

    res.status(200).send("Subcategoria excluída com sucesso")
  } catch (error) {
    console.error('Erro ao excluir subcategoria:', error);
    res.status(500).json({ error: 'Erro ao excluir subcategoria' });
  }
};