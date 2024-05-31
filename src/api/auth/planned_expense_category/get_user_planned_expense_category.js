import { supabase } from '../../../init';

export const get_user_planned_expense_category_by_planned_expense_id = async (req, res) => {
    try{
        const { data, error } = await supabase
        .from('planned_expense_category')
        .select(`
            id,
            planned_expense_id,
            category_id,
            value
        `)
        .eq('planned_expense_id', req.params.id)
    
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao recuperar as categorias de despesas planejadas' });
    }
}