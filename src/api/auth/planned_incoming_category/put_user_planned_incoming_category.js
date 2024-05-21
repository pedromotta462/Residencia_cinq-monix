import { supabase } from '../../../init';

export const put_user_planned_incoming_category = async (req, res) => {
  try {
    const planned_incoming_category_id = req.params.id;
    const updated_planned_incoming_category = {
      value: req.body.value
    };

    const { error } = await supabase
      .from('planned_incoming_category')
      .update(updated_planned_incoming_category)
      .eq('id', planned_incoming_category_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Categoria de planejamento de entrada atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria planejamento de entrada' });
  }
};
