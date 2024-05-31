import { supabase } from '../../../init';

export const delete_user_planned_incoming = async (req, res) => {
  try {
    const planned_incoming_id = req.params.id;

    if (!planned_incoming_id) {
      res.status(400).json({ error: 'O id da receita planejada é obrigatório' });
      return;
    }

    const { error } = await supabase
      .from('planned_incoming')
      .delete()
      .eq('id', planned_incoming_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Entrada planejada excluída com sucesso");
  } catch (error) {
    console.error('Erro ao excluir entrada planejada:', error);
    res.status(500).json({ error: 'Erro ao excluir entrada planejada' });
  }
};
