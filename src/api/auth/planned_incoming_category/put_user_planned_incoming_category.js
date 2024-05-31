import { supabase } from '../../../init';

export const put_user_planned_incoming_category = async (req, res) => {
  try {
    const planned_incoming_category_id = req.params.id;
    const updated_planned_incoming_category = {
      planned_incoming_id: req.body.planned_incoming,
      category_id: req.body.category_id,
      value: req.body.value
    };

    const { error } = await supabase
      .from('planned_incoming_category')
      .update(updated_planned_incoming_category)
      .eq('id', planned_incoming_category_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Categoria de entrada planejada atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar categoria de entrada planejada:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria da entrada planejada' });
  }
};
