import { supabase } from '../../../init';

export const delete_user_planned_expense_subcategory = async (req, res) => {
    try {
        const planned_expense_subcategory_id = req.params.id;

        if (!planned_expense_subcategory_id) {
            res.status(400).json({ error: 'O id da subcategoria de despesa planejada é obrigatório' });
        }

        const { error } = await supabase
            .from('planned_expense_subcategory')
            .delete()
            .eq('id', planned_expense_subcategory_id);

        if (error) {
            throw error;
        }
        
        res.status(200).send("Subcategoria de despesa planejada excluída com sucesso");
        } catch (error) {
            console.error('Erro ao excluir subcategoria de despesa planejada:', error);
            res.status(500).json({ error: 'Erro ao excluir subcategoria de despesa planejada' });
        }
    };