import { supabase } from '../../../init';

export const get_user_planned_incoming_category_by_category_id = async (req, res) => {
    try{
        const { data, error } = await supabase
        .from('planned_incoming_category')
        .select(`
            id,
            planned_incoming_id (
                id,
                month,
                year
            ),
            category_id (
                id,
                name
            ),
            value
        `)
        .eq('category_id', req.params.id)

        if (error) throw error;
    
        res.status(200).send(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao recuperar categorias das entradas planejadas' });
    }
}