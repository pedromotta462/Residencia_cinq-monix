import { supabase } from '../../../init';

export const get_user_goals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("goals")
      .select(`
        id,
        user_id,
        objetivo,
        valor_inicial,
        prazo,
        valor_desejado
      `)
      .eq("user_id", req.user.id);

    if (error) {
      throw error;
    }

    res.status(200).send(data);
  } catch (error) {
    console.error('Erro ao recuperar despesas:', error);
    res.status(500).json({ error: 'Erro ao recuperar despesas' });
  }
};
