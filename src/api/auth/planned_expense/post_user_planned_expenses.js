import { supabase } from '../../../init';

export const post_user_planned_expense = async (req, res) => {
    try {
        if (!req.body.name
          || !req.body.month
          || !req.body.year 
        ) {
            res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }

        const { error } = await supabase
        .from('planned_expenses')
        .insert({
            user_id: req.user.id,
            name: req.body.name,
            month: req.body.month,
            year: req.body.year
        });

        if (error) {
            throw error;
        }

        res.status(201).send('Planejamento de despesa criada com sucesso');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Erro ao criar planejamento de despesa' });
    }

}