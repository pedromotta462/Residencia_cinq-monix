import { supabase } from '../../../init';

export const put_user_planned_expense_subcategory = async (req, res) => {
    try {
        const planned_expense_subcategory_id = req.params.id;
        const updated_planned_expense_subcategory = {
            value: req.body.value
        }

        const { error } = await supabase
            .from('planned_expense_subcategory')
            .update(updated_planned_expense_subcategory)
            .eq('id', planned_expense_subcategory_id);

        if (error) {
            throw error;
        }

        res.status(200).send("Subcategoria de despesa planejada atualizada com sucesso");
    } catch (error) {
        console.error('Erro ao atualizar subcategoria de despesa planejada:', error);
        res.status(500).json({ error: 'Erro ao atualizar subcategoria da despesa planejada' });
    }
};