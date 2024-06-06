import { supabase } from './../init.js';

export const createDbUser = async ({ id, email, name }) => {
  try {
    const { data, error } = await supabase
    .from("users")
    .insert([
      { id, email, name }
    ]);

    if (error) {
      throw error
    }
  
    return data;

  } catch (err) {
    console.error("Error creating user", err)
    throw err;
  }
} 
