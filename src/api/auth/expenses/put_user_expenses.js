import { supabase } from '../../../init';

export const put_user_expenses = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const updatedExpense = {
      user_id: req.user.id,
      date: req.body.date,
      value: req.body.value,
      frequency: req.body.frequency,
      category_id: req.body.category_id,
      subcategory_id: req.body.subcategory_id,
      member_id: req.body.member_id,
      account_id: req.body.account_id,
      expense_type_id: req.body.expense_type_id,
      description: req.body.description
    };

    const { error } = await supabase
      .from('expenses')
      .update(updatedExpense)
      .eq('id', expenseId);

    if (error) {
      throw error;
    }

    res.status(200).send("Despesa atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
    res.status(500).json({ error: 'Erro ao atualizar despesa' });
  }
};
