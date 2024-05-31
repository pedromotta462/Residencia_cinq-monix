import { supabase } from "../../../init";

const flattenCategories = (data, categoryKey) =>
  data.flatMap((item) =>
    item[categoryKey].map((cat) => ({
      category_id: cat.category_id,
      value: cat.value,
    }))
  );

const calculateTotals = (records, key) =>
  records.reduce((sum, record) => sum + record[key], 0);

export const getFinancialSummary = async (userId, startDate, endDate) => {
  try {
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

    const totalIncomings = calculateTotals(incomings, "value");
    const totalExpenses = calculateTotals(expenses, "value");
    const totalInvestments = calculateTotals(investments, "value");

    const resultLaunch = totalIncomings - totalExpenses - totalInvestments;

    const totalPlannedIncomings = calculateTotals(
      plannedIncomingsFlat,
      "value"
    );
    const totalPlannedExpenses = calculateTotals(plannedExpensesFlat, "value");
    const totalPlannedInvestments = calculateTotals(
      plannedInvestmentsFlat,
      "value"
    );

    const resultPlanning =
      totalPlannedIncomings - totalPlannedExpenses - totalPlannedInvestments;

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

    const financialSummary = categories.map((categoryId) => {
      const incomingsByCategory = calculateTotals(
        incomings.filter((record) => record.category_id === categoryId),
        "value"
      );
      const expensesByCategory = calculateTotals(
        expenses.filter((record) => record.category_id === categoryId),
        "value"
      );
      const investmentsByCategory = calculateTotals(
        investments.filter((record) => record.category_id === categoryId),
        "value"
      );

      const plannedIncomingsByCategory = calculateTotals(
        plannedIncomingsFlat.filter(
          (record) => record.category_id === categoryId
        ),
        "value"
      );
      const plannedExpensesByCategory = calculateTotals(
        plannedExpensesFlat.filter(
          (record) => record.category_id === categoryId
        ),
        "value"
      );
      const plannedInvestmentsByCategory = calculateTotals(
        plannedInvestmentsFlat.filter(
          (record) => record.category_id === categoryId
        ),
        "value"
      );

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

    return {
      total_incomings: totalIncomings,
      total_expenses: totalExpenses,
      total_investments: totalInvestments,
      result_launch: resultLaunch,
      total_planned_incomings: totalPlannedIncomings,
      total_planned_expenses: totalPlannedExpenses,
      total_planned_investments: totalPlannedInvestments,
      result_planning: resultPlanning,
      categories: financialSummary,
    };
  } catch (error) {
    console.error("Erro ao acessar o resumo financeiro:", error);
    throw error;
  }
};
