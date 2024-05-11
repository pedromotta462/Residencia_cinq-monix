

import { supabase } from "../../../init";
export const put_user_investments = async (req, res) => {
    try {
        const id = req.params.id;
        const new_investments = {
            date: req.body.date,
            value: req.body.value,
            planner: req.body.planner,
            description: req.body.description,
            frequency: req.body.frequency,
            origin: req.body.origin
            
        }

        if (!req.body.date || !req.body.value || !req.body.planner || !req.body.description || !req.body.frequency || !req.body.origin ) {
            res
            .status(400)
            .json({error: 'Todos os campos são obrigatórios'});
        }
        
        const { error } = await supabase
            .from('investments')
            .update(new_investments)
            .eq("id", id);

        if (error) throw error;

        res.status(200).send('dados atualizado com sucesso');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar os dados'});
    }
};