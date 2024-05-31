import { supabase } from '../../../init';

export const get_user_planned_expense_subcategory_by_planned_expense_category_id = async (req, res) => {
    try {
        const {data, error} = await supabase
        .from('planned_expense_subcategory')
        .select(`
            id,
            planned_expense_category_id(
                id,
                category_id (
                    id, 
                    name
                ),
                value
            ),
            subcategory_id(
                id,
                name
            ),
            value
        `)
        .eq('planned_expense_category_id', req.params.id)

        res.status(200).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao recuperar subcategorias das despesas planejadas' });
    }
}