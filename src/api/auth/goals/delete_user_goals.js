import { supabase } from '../../../init';

export const delete_user_goals = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: 'O id da objetivo é obrigatório' });
    }

    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    res.status(200).send("Objetivo excluída com sucesso");
  } catch (error) {
    console.error('Erro ao excluir objetivo:', error);
    res.status(500).json({ error: 'Erro ao excluir objetivo' });
  }
};
