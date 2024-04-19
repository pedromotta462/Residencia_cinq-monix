import { supabase } from "../init.js";

export const createAuthUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) throw error;

  return data.user.id
  } catch (err) {
    console.error("Error creating auth user", err.message);
    throw err;
  }
}