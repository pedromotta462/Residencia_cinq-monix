import { supabase } from '../../../init';

export const get_user_planned_expense = async (req, res) => {
    try{
        const { data, error } = await supabase
        .from('planned_expense')
        .select(`
            id,
            user_id,
            month,
            year
        `)
        .eq('user_id', req.user.id)
    
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao recuperar despesas planejadas' });
    }
}