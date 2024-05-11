import { supabase } from '../../../init';

export const put_user_cards = async (req, res) => {
    try {
        const id = req.params.id;
        const novo_card = {
            name: req.body.name,
            dia_fechamento: req.body.dia_fechamento,
            dia_vencimento: req.body.dia_vencimento,
            limite: req.body.limite,
            active: true
        }

        if (!req.body.name || !req.body.dia_fechamento || !req.body.dia_vencimento || !req.body.limite) {
            res
            .status(400)
            .json({error: 'Todos os campos são obrigatórios'});
        }
        
        const { error } = await supabase
            .from('cards')
            .update(novo_card)
            .eq("id", id);

        if (error) throw error;

        res.status(200).send('Cartão atualizado com sucesso');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o cartão'});
    }
};
