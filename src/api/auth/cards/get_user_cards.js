// Segue lógica do Get da tabela Cards
import { supabase } from '../../../init';

// obter todos os cartões de crédito de um usuário
app.get('/cards/:user_id', async (req, res) => {
    try {
        const { userId } = req.params;
        const { data: cartoes, error } = await supabase
            .from('cards')
            .select('*')
            .eq('user_id', userId);
        if (error) throw error;
        res.json(cartoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});