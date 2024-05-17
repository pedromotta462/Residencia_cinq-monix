import { supabase } from '../../../init';

export const post_user_planned_expense = async (req, res) => {
    try {
        if (!req.body.name
          || !req.body.mounth
          || !req.body.year 
        ) {
            res.status(400).json({ error: 'É necessário preencher todos os campos' });
        }

        const { error } = await supabase
        .from('planne_expense')
        .insert({
            user_id: req.user.id,
            name: req.body.name,
            mounth: req.body.mounth,
            year: req.body.year
        });

        if (error) {
            throw error;
        }

        res.status(201).send('Planejamento de despesa criada com sucesso');
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar planejamento de despesa' });
    }

}