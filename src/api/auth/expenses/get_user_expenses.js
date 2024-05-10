import { supabase } from '../../../init';

export const get_user_expenses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) {
      throw error;
    }

    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao recuperar despesas:', error);
    res.status(500).json({ error: 'Erro ao recuperar despesas' });
  }
};
