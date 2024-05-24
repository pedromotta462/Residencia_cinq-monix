import { supabase } from '../../../init';

export const get_user_incomings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('incomings')
      .select(`
      id,
      user_id,
      date,
      value,
      member_id (id, name),
      frequency,
      category_id (id, name),
      subcategory_id (id, name),
      description,
        payments,
        status
    `)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar entradas:', error);
    res.status(500).json({ error: 'Erro ao buscar entradas' });
  }
};