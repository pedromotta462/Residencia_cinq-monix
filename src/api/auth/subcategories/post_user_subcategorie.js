import { supabase } from '../../../init';

export const post_user_subcategorie = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: 'O nome da subcategoria é obrigatório' });
    }

    const { error } = await supabase
    .from('subcategories')
    .insert({ category_id: req.body.category_id, name: req.body.name })

    if (error) throw error;

    res.status(200).send("Subcategoria criada com sucesso")
  } catch (error) {
    console.error('Erro ao criar subcategoria:', error);
    res.status(500).json({ error: 'Erro ao recuperar subcategoria' });
  }
};