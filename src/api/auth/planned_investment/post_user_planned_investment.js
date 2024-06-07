import { supabase } from '../../../init';

export const post_user_planned_investment = async (req, res) => {
    try {
        if (!req.body.month
            || !req.body.year ) {
            res.status(400).json({ error: 'É necessário preencher todos os campos obrigatórios' });
            return;
        }

        const { error } = await supabase
            .from('planned_investment')
            .insert({
                user_id: req.user.id,
                month: req.body.month,
                year: req.body.year,
            });

        if (error) throw error;

        res.status(201).send('Investimento planejado criada com sucesso');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erro ao criar investimento planejado' });
    }
}
