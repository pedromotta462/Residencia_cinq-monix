import { supabase } from '../../../init';

export const post_user_category = async (req, res) => {
  try {

    if (!req.body.name) {
      res.status(400).json({ error: 'O nome da categoria é obrigatório' });
    }

    const { error } = await supabase
    .from('categories')
    .insert({ user_id: req.user.id, name: req.body.name })

    if (error) throw error;

    res.status(200).send("Categoria criada com sucesso")
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao recuperar categoria' });
  }
};