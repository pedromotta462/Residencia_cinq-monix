import { supabase } from './../init.js';

export const createTypeExpenses = async (userData) => {
  try {
    const { data, error } = await supabase
    .from("type_expenses")
    .insert(userData)
    if (error) {
      throw error
    }
  
    return data;

  } catch (err) {
    console.error("Error creating user", err)
    throw err;
  }
} 