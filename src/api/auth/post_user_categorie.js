import { supabase } from './../../init';

export const post_user_categorie = async (req, res) => {

  try {

    if (!req.body.categorie_name) {
      return res.status(400).json({ error: 'O nome da categoria é obrigatório' });
    }

    const { error } = await supabase
    .from('categories')
    .insert({ user_id: req.user.id, name: req.body.categorie_name })

    if (error) throw error;

    res.status(200).send("Categoria criada com sucesso")
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao criar categoria:' });
  }
};