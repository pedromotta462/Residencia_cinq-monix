import { supabase } from '../../../init';

export const put_user_planned_expense_category = async (req, res) => {
  try {
    const planned_expense_category_id = req.params.id;
    const updated_planned_expense_category = {
      planned_expense_id: req.body.planned_expense_id,
      category_id: req.body.category_id
    };

    const { error } = await supabase
      .from('planned_expense_category')
      .update(updated_planned_expense_category)
      .eq('id', planned_expense_category_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Categoria de despesa planejada atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar categoria de despessa planejada:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria da despesa planejada' });
  }
}