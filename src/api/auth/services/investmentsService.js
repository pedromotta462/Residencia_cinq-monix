import { supabase } from "../../../init";

export const getInvestments = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("investments")
      .select(
        `
      id,
      user_id,
      goal_id (
        id,
        objetivo,
        valor_inicial,
        prazo,
        valor_desejado
      ),
      category_id (
        id,
        name
      ),
      subcategory_id (
        id,
        name
      ),
      member_id (
        id,
        name
      ),
      account_id (
        id, 
        name
      ),
      investments_type_id (
        id,
        name
      ),
      date,
      value,
      planner,
      description,
      frequency      
      `
      )
      .eq("user_id", userId);

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error };
  }
};

export const createInvestment = async (userId, investmentData) => {
  try {
    const { error } = await supabase.from("investments").insert({
      user_id: userId,
      goal_id: investmentData.goal_id,
      category_id: investmentData.category_id,
      subcategory_id: investmentData.subcategory_id,
      member_id: investmentData.member_id,
      account_id: investmentData.account_id,
      investments_type_id: investmentData.investments_type_id,
      date: investmentData.date,
      value: investmentData.value,
      planner: investmentData.planner,
      description: investmentData.description,
      frequency: investmentData.frequency,
    });

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const updateInvestment = async (id, investmentData) => {
  try {
    const updatedInvestment = {
      goal_id: investmentData.goal_id,
      category_id: investmentData.category_id,
      subcategory_id: investmentData.subcategory_id,
      member_id: investmentData.member_id,
      account_id: investmentData.account_id,
      investments_type_id: investmentData.investments_type_id,
      date: investmentData.date,
      value: investmentData.value,
      planner: investmentData.planner,
      description: investmentData.description,
      frequency: investmentData.frequency,
    };

    const { error } = await supabase
      .from("investments")
      .update(updatedInvestment)
      .eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const deleteInvestment = async (id) => {
  try {
    const { error } = await supabase.from("investments").delete().eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};
