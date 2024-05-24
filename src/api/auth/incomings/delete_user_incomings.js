import { supabase } from '../../../init';

export const delete_user_incomings = async (req, res) => {
  try {
    const incomingId = req.params.id;

    if (!incomingId) {
      res.status(400).json({ error: 'O id da entrada é obrigatório' });
      return;
    }

    const { error } = await supabase
      .from('incomings')
      .delete()
      .eq('id', incomingId);

    if (error) {
      throw error;
    }

    res.status(200).send("Entrada excluída com sucesso");
  } catch (error) {
    console.error('Erro ao excluir entrada:', error);
    res.status(500).json({ error: 'Erro ao excluir entrada' });
  }
};