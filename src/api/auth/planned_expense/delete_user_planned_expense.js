import { supabase } from '../../../init';

export const delete_user_planned_expense = async (req, res) => {
  try {
    const planned_expense_id = req.params.id;

    if (!planned_expense_id) {
      res.status(400).json({ error: 'O id do despesa planejada é obrigatório' });
    }

    const { error } = await supabase
      .from('planned_expense')
      .delete()
      .eq('id', planned_expense_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Despesa planejada excluída com sucesso");
  } catch (error) {
    console.error('Erro ao excluir despesa planejada:', error);
    res.status(500).json({ error: 'Erro ao excluir despesa planejada' });
  }
};
