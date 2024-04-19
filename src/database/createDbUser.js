import { supabase } from './../init.js';

export const createDbUser = async (userData) => {
  try {
    const { data, error } = await supabase
    .from("users")
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
