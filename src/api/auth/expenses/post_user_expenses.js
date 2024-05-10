import { supabase } from '../../../init';

export const post_user_expense = async (req, res) => {
  try {
    if (!req.body.value 
      || !req.body.date
      || !req.body.frequency 
      || !req.body.category_id
      || !req.body.subcategory_id
      || !req.body.member_id
      || !req.body.account_id
      || !req.body.expense_type_id
      || !req.body.description
    ) {
      res.status(400).json({ error: 'É necessário preencher todos os campos' });
    }

    const { error } = await supabase
      .from('expenses')
      .insert({
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
