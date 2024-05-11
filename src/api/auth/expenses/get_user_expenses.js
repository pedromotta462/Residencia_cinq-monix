import { supabase } from '../../../init';

export const get_user_expenses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        id,
        user_id,
        category_id (
          id,
          name
        ),
        subcategory_id (
          id, 
          name
        ),
        member_id (
          id,
          name
        ),
        account_id (
          id, 
          name
        ),
        expense_type_id (
          id,
          name
        ),
        date,
        value,
        description,
        frequency
      `)
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
