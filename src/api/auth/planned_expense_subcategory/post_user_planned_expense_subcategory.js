import { supabase } from '../../../init';

export const post_user_planned_expense_subcategory = async (req, res) => {
    try {
        if (!req.body.planned_expense_category_id 
            || !req.body.subcategory_id
            || !req.body.value
        ){
            res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }

        const { error } = await supabase
        .from('planned_expense_subcategory')
        .insert({
            planned_expense_category_id : req.body.planned_expense_category_id ,
            subcategory_id: req.body.subcategory_id,
            value: req.body.value
        });

        if (error) {
            throw error;
        }

        res.status(201).send('Subcategoria de despesa planejada criada com sucesso');
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao criar subcategoria de despesa planejada' });
    }
}