import { supabase } from '../../../init';

export const get_subcategories_by_categoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)

    res.status(200).send(data)
  } catch (error) {
    console.error('Erro ao recuperar subcategorias:', error);
    res.status(500).json({ error: 'Erro ao recuperar subcategorias' });
  }
};