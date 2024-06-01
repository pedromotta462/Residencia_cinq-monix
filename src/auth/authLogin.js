import { supabase } from "../init.js";

export const authLogin = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return data.session.access_token;
  } catch (err) {
    console.error("Error during email/password login", err.message);
    throw err;
  }
};

export const googleLoginUrl = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw error;

    return data.url;
  } catch (err) {
    console.error("Error generating Google login URL", err.message);
    throw err;
  }
};

export const handleGoogleCallback = async (token) => {
  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    return data.user;
  } catch (err) {
    console.error("Error handling Google callback", err.message);
    throw err;
  }
};
