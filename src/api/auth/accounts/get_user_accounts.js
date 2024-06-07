import { supabase } from '../../../init';

export const get_accounts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao obter contas:', error);
    res.status(500).json({ error: 'Erro ao obter contas' });
  }
};
