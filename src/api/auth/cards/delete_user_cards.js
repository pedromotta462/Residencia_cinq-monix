// Segue lógica do Delete da tabela Cards
import { supabase } from '../../../init';

// lógica para excluir um cartão de crédito
app.delete('/cards/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cards')
            .delete()
            .match({ id: req.params.id });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});