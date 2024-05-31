import { supabase } from "../init";

export const checkEmailRecords = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error checking email records", err);
    throw new Error("Email já cadastrado");
  }
}
