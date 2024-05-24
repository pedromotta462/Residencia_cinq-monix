import { supabase } from '../../../init';

export const put_user_goals = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedgoal = {
        user_id: req.user.id,
        objetivo: req.body.objetivo,
        valor_inicial: req.body.valor_inicial,
        prazo: req.body.prazo,
        valor_desejado: req.body.valor_desejado
    };

    const { error } = await supabase
      .from('goals')
      .update(updatedgoal)
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.status(200).send("Objetivo atualizado com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar objetivo:', error);
    res.status(500).json({ error: 'Erro ao atualizar objetivo' });
  }
};
