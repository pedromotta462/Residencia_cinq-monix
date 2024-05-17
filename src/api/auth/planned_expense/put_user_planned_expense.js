import { supabase } from '../../../init';

export const put_user_planned_expense = async (req, res) => {
  try {
    const planned_expense_id = req.params.id;
    const updated_planned_expense = {
      month: req.body.month,
      year: req.body.year
    };

    const { error } = await supabase
      .from('planned_expense')
      .update(updated_planned_expense)
      .eq('id', planned_expense_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Despesa atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
    res.status(500).json({ error: 'Erro ao atualizar despesa' });
  }
};
