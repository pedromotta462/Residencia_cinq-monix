import { supabase } from '../../../init';

export const put_user_planned_investment = async (req, res) => {
    try {
        const planned_investment_id = req.params.id;
        const updated_planned_investment = {
            month: req.body.month,
            year: req.body.year,
        };

        const { error } = await supabase
            .from('planned_investment')
            .update(updated_planned_investment)
            .eq('id', planned_investment_id);

        if (error) {
            throw error;
        }

        res.status(200).send("Investimento planejado atualizada com sucesso");
    } catch (error) {
        console.error('Erro ao atualizar investimento planejado:', error);
        res.status(500).json({ error: 'Erro ao atualizar investimento planejado' });
    }
};
