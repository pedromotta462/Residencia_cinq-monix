import { supabase } from "../../../init";

export const get_financial_summary = async (req, res) => {
  try {
    const userId = req.user.id; // Supõe que você esteja utilizando autenticação e que o user_id está disponível no req.user
    const startDate = req.query.start_date || "2024-01-01";
    const endDate = req.query.end_date || "2024-12-31";

    // Filtragem por data inicial e final e user_id
    const { data: incomings, error: incomingsError } = await supabase
      .from("incomings")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate);

    if (incomingsError) throw incomingsError;

    const { data: expenses, error: expensesError } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate);

    if (expensesError) throw expensesError;

    const { data: investments, error: investmentsError } = await supabase
      .from("investments")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate);

    if (investmentsError) throw investmentsError;

    // Planejamentos filtrados por user_id
    const { data: plannedIncomings, error: plannedIncomingsError } =
      await supabase
        .from("planned_incoming")
        .select(
          "id, user_id, year, planned_incoming_category (category_id, value)"
        )
        .eq("user_id", userId)
        .eq("year", 2024);

    if (plannedIncomingsError) throw plannedIncomingsError;

    const { data: plannedExpenses, error: plannedExpensesError } =
      await supabase
        .from("planned_expense")
        .select(
          "id, user_id, year, planned_expense_category (category_id, value)"
        )
        .eq("user_id", userId)
        .eq("year", 2024);

    if (plannedExpensesError) throw plannedExpensesError;

    const { data: plannedInvestments, error: plannedInvestmentsError } =
      await supabase
        .from("planned_investment")
        .select(
          "id, user_id, year, planned_investment_category (category_id, value)"
        )
        .eq("user_id", userId)
        .eq("year", 2024);

    if (plannedInvestmentsError) throw plannedInvestmentsError;

    // Transformar os dados de planejamentos em uma lista única por categoria
    const flattenCategories = (data, categoryKey) =>
      data.flatMap((item) =>
        item[categoryKey].map((cat) => ({
          category_id: cat.category_id,
          value: cat.value,
        }))
      );

    const plannedIncomingsFlat = flattenCategories(
      plannedIncomings,
      "planned_incoming_category"
    );
    const plannedExpensesFlat = flattenCategories(
      plannedExpenses,
      "planned_expense_category"
    );
    const plannedInvestmentsFlat = flattenCategories(
      plannedInvestments,
      "planned_investment_category"
    );

    // Calcular os totais
    const totalIncomings = incomings.reduce(
      (sum, record) => sum + record.value,
      0
    );
    const totalExpenses = expenses.reduce(
      (sum, record) => sum + record.value,
      0
    );
    const totalInvestments = investments.reduce(
      (sum, record) => sum + record.value,
      0
    );

    const resultLaunch = totalIncomings - totalExpenses - totalInvestments;

    const totalPlannedIncomings = plannedIncomingsFlat.reduce(
      (sum, record) => sum + record.value,
      0
    );
    const totalPlannedExpenses = plannedExpensesFlat.reduce(
      (sum, record) => sum + record.value,
      0
    );
    const totalPlannedInvestments = plannedInvestmentsFlat.reduce(
      (sum, record) => sum + record.value,
      0
    );

    const resultPlanning =
      totalPlannedIncomings - totalPlannedExpenses - totalPlannedInvestments;

    // Obter todas as categorias
    const categories = [
      ...new Set([
        ...incomings.map((record) => record.category_id),
        ...expenses.map((record) => record.category_id),
        ...investments.map((record) => record.category_id),
        ...plannedIncomingsFlat.map((record) => record.category_id),
        ...plannedExpensesFlat.map((record) => record.category_id),
        ...plannedInvestmentsFlat.map((record) => record.category_id),
      ]),
    ];

    // Calcular resultados por categoria
    const financialSummary = categories.map((categoryId) => {
      const incomingsByCategory = incomings
        .filter((record) => record.category_id === categoryId)
        .reduce((sum, record) => sum + record.value, 0);
      const expensesByCategory = expenses
        .filter((record) => record.category_id === categoryId)
        .reduce((sum, record) => sum + record.value, 0);
      const investmentsByCategory = investments
        .filter((record) => record.category_id === categoryId)
        .reduce((sum, record) => sum + record.value, 0);

      const plannedIncomingsByCategory = plannedIncomingsFlat
        .filter((record) => record.category_id === categoryId)
        .reduce((sum, record) => sum + record.value, 0);
      const plannedExpensesByCategory = plannedExpensesFlat
        .filter((record) => record.category_id === categoryId)
        .reduce((sum, record) => sum + record.value, 0);
      const plannedInvestmentsByCategory = plannedInvestmentsFlat
        .filter((record) => record.category_id === categoryId)
        .reduce((sum, record) => sum + record.value, 0);

      return {
        category_id: categoryId,
        result_launch_category:
          incomingsByCategory - expensesByCategory - investmentsByCategory,
        result_planned_category:
          plannedIncomingsByCategory -
          plannedExpensesByCategory -
          plannedInvestmentsByCategory,
      };
    });

    res.status(200).json({
      total_incomings: totalIncomings,
      total_expenses: totalExpenses,
      total_investments: totalInvestments,
      result_launch: resultLaunch,
      total_planned_incomings: totalPlannedIncomings,
      total_planned_expenses: totalPlannedExpenses,
      total_planned_investments: totalPlannedInvestments,
      result_planning: resultPlanning,
      categories: financialSummary,
    });
  } catch (error) {
    console.error("Erro ao acessar o resumo financeiro:", error);
    res
      .status(500)
      .json({ error: "Erro ao acessar o resumo financeiro" });
  }
};
