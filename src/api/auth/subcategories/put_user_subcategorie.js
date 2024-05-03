import { supabase } from '../../../init';

export const put_user_subcategorie = async (req, res) => {
  try {
    const id = req.params.subCategoryId;
    const newName = req.body.name;

    if (!newName) {
      res.status(400).json({ error: 'O nome da categoria é obrigatório' });
    }

    const { error } = await supabase
    .from('subcategories')
    .update({ name: newName })
    .eq('id', id)

    if (error) throw error;

    res.status(200).send("Nome de subcategoria alterado com sucesso")
  } catch (error) {
    console.error('Erro ao atualizar subcategoria:', error);
    res.status(500).json({ error: 'Erro ao atualizar subcategoria' });
  }
};