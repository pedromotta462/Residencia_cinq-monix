import{ supabase } from './../init';

export const authLogin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email, 
      password
    });

    if (error) throw error;

    return data.session;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
}
