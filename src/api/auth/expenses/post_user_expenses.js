import { supabase } from '../../../init';
import { createTypeExpenses } from '../../../database/createTypeExpenses.js';
import {v4 as uuidv4} from 'uuid';

export const post_user_expenses = async (req, res) => {
  try {
    if (!req.body.value 
      || !req.body.date
      || !req.body.frequency 
      || !req.body.category_id
      || !req.body.subcategory_id
      || !req.body.member_id
      || !req.body.account_id
      || !req.body.description
    ) {
      res.status(400).json({ error: 'É necessário preencher todos os campos' });
    }
    let myuuid = uuidv4();
    let query = await supabase 
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
        expense_type_id:myuuid,
        description: req.body.description
      });
let error = query["error"]
    if (error) {
      throw error;
    }
    console.log(myuuid)
    console.log(query)
    console.log(req.user.id)
    let cte=await createTypeExpenses ({user_id:req.user.id,id:myuuid})
    console.log(cte)
    res.status(201).send("Despesa criada com sucesso");
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
    res.status(500).json({ error: 'Erro ao criar despesa' });
  }
};
