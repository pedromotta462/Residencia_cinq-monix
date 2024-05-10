// Segue lógica do Post da tabela Cards
import { supabase } from '../../../init';

//criar um novo cartão de crédito
app.post('/cards', async (req, res) => {
    try {
        const { user_id, nome, dia_fechamento, dia_vencimento, limite, active } = req.body;
        const { data, error } = await supabase
            .from('cards')
            .insert({ user_id, nome, dia_fechamento, dia_vencimento, limite, active: true });
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
