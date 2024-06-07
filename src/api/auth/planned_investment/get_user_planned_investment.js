import { supabase } from '../../../init';

export const get_user_planned_investment = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('planned_investment')
            .select(`
                id,
                user_id (
                    id,
                    name
                ),
                month,
                year
            `)
            .eq('user_id', req.user.id);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao recuperar investimentos planejados' });
    }
}
