import { supabase } from '../../../init';

export const post_user_planned_expense_category = async (req, res) => {
    try {
        if (!req.body.planned_expense_id || req.body.category_id
        ) {
            res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }

        const { error } = await supabase
        .from('planned_expense_category')
        .insert({
            planned_expense_id: req.body.planned_expense_id,
            category_id: req.body.category_id,
        });

        if (error) {
            throw error;
        }

        res.status(201).send('Categoria de planejamento de despesa criada com sucesso');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Erro ao criar categoria de planejamento de despesa' });
    }

}