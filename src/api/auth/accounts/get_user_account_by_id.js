import { supabase } from '../../../init';

export const get_account_by_id = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'O ID da conta é obrigatório' });
    }

    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .single(); // Ensures only one record is returned

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Conta não encontrada' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao obter conta:', error);
    res.status(500).json({ error: 'Erro ao obter conta' });
  }
};
