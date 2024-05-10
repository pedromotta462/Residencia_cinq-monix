import { supabase } from '../../../init';

export const put_user_expense = async (req, res) => {
  try {
    const expenseId = req.body.id;
    const updatedExpense = {
      data: req.body.data,
      valor: req.body.valor,
      frequencia: req.body.frequencia,
      categoria: req.body.categoria,
      subcategoria: req.body.subcategoria,
      tipo_gasto: req.body.tipoGasto,
      descricao: req.body.descricao,
      efetivado: req.body.efetivado
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
