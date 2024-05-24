import { supabase } from '../../../init';

export const put_user_incomings = async (req, res) => {
  try {
    const incomingsId = req.params.id;

    const updatedIncomings = {
        date: req.body.date,
        value: req.body.value,
        member_id: req.body.member_id,
        frequency: req.body.frequency,
        category_id: req.body.category_id,
        subcategory_id: req.body.subcategory_id,
        description: req.body.description,
        payments: req.body.payments,
        status: req.body.status
    }

    const { error } = await supabase
      .from('incomings')
      .update(updatedIncomings)
      .eq('id', incomingsId);

    if (error) throw error;

    res.status(200).send("Entrada atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar entrada:', error);
    res.status(500).json({ error: 'Erro ao atualizar entrada' });
  }
};