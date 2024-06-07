import { supabase } from '../../../init';

export const post_account = async (req, res) => {
  try {
    const { user_id, name } = req.body;

    if (!user_id || !name) {
      return res.status(400).json({ error: 'Os campos user_id e name são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('accounts')
      .insert([{ user_id, name }]);

    if (error) throw error;

    res.status(201).json({ message: 'Conta criada com sucesso', data });
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
};
