import { supabase } from '../../../init';

export const get_user_typeofexpenses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('type_expenses')
      .select(`
        id,
        user_id,
         enum
      `)
      .eq('user_id', req.user.id);

    if (error) {
      throw error;
    }

    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao recuperar o tipo de despesa:', error);
    res.status(500).json({ error: 'Erro ao recuperar o tipo de despesa' });
  }
};
