import { supabase } from '../../../init';

export const put_user_expense = async (req, res) => {
  try {
    const typesofexpensesId = req.params.id;
    const updatedtypesofexpenses = {
      id: req.body.id,
      user_id: req.user.id,
      enum: req.body.enum
    };

    const { error } = await supabase
      .from('typesofexpenses')
      .update(updatedtypesofexpenses)
      .eq('id', typesofexpensesId);

    if (error) {
      throw error;
    }

    res.status(200).send("Tipo de despesa atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar o tipo de despesa:', error);
    res.status(500).json({ error: 'Erro ao atualizar o tipo despesa' });
  }
};
