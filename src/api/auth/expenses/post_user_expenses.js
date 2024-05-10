import { supabase } from '../../../init';

export const post_expense = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        user_id: req.user.id,
        data: req.body.data,
        valor: req.body.valor,
        frequencia: req.body.frequencia,
        categoria: req.body.categoria,
        subcategoria: req.body.subcategoria,
        tipo_gasto: req.body.tipoGasto,
        descricao: req.body.descricao,
        efetivado: req.body.efetivado
      });

    if (error) {
      throw error;
    }

    res.status(201).send("Despesa criada com sucesso");
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
    res.status(500).json({ error: 'Erro ao criar despesa' });
  }
};
