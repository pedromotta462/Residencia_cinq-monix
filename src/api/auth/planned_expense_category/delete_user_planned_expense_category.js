import { supabase } from '../../../init';

export const delete_user_planned_expense_category = async (req, res) => {
  try {
    const planned_expense_category_id = req.params.id;

    if (!planned_expense_category_id) {
      res.status(400).json({ error: 'O id da categoria da entrada planejada é obrigatório' });
    }

    const { error } = await supabase
      .from('planned_expense_category')
      .delete()
      .eq('id', planned_expense_category_id);

    if (error) {
      throw error;
    }

    res.status(200).send("Categoria de despesa planejada excluído com sucesso");
  } catch (error) {
    console.error('Erro ao excluir categoria de despesa planejada:', error);
    res.status(500).json({ error: 'Erro ao excluir categoria da despesa planejada' });
  }
};
