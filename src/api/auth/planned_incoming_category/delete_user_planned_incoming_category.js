import { supabase } from '../../../init';

export const delete_user_planned_incoming_category = async (req, res) => {
  try {
    const planned_incoming_category_id = req.params.id;

    if (!planned_incoming_category_id) {
      res.status(400).json({ error: 'O id da categoria da entrada planejada é obrigatório' });
    }

    const { error } = await supabase
      .from('planned_incoming_category')
      .delete()
      .eq('id', planned_incoming_category_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Categoria de entrada planejada excluído com sucesso");
  } catch (error) {
    console.error('Erro ao excluir categoria de entrada planejada:', error);
    res.status(500).json({ error: 'Erro ao excluir categoria da entrada planejada' });
  }
};
