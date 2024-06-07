import { supabase } from '../../../init';

export const get_goals_info = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const goalsInfo = [];

    goals.forEach(goal => {
      const { objetivo, valor_inicial, prazo, valor_desejado } = goal;

      const currentDate = new Date();
      const deadline = new Date(prazo);
      const monthsLeft = Math.max(0, (deadline.getFullYear() - currentDate.getFullYear()) * 12 + deadline.getMonth() - currentDate.getMonth());

      const idealDeposit = monthsLeft > 0 ? Math.max(0, (valor_inicial - valor_desejado) / monthsLeft) : 0;

      const goalInfo = {
        'descrição do objetivo': objetivo,
        'saldo inicial': valor_inicial,
        'saldo desejado': valor_desejado,
        'prazo final': prazo,
        'meses faltantes': monthsLeft,
        'valor ideal para depositar no mês': idealDeposit
      };

      goalsInfo.push(goalInfo);
    });

    res.status(200).json(goalsInfo);
  } catch (error) {
    console.error('Erro ao obter informações dos objetivos:', error);
    res.status(500).json({ error: 'Erro ao obter informações dos objetivos' });
  }
};
