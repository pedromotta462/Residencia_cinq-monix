// Segue lógica do Put da tabela Cards
import { supabase } from '../../../init';

// atualizar um cartão de crédito existente
app.put('/cards/:id', async (req, res) => {
    try {
        const { nome, dia_fechamento, dia_vencimento, limite, active } = req.body;
        const { data, error } = await supabase
            .from('cards')
            .update({ nome, dia_fechamento, dia_vencimento, limite, active })
            .match({ id: req.params.id });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
