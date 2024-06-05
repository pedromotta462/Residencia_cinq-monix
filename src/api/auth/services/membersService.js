import { supabase } from "../../../init";

export const getMembers = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .select(
        `
        id,
        user_id,
        name            
        `
      )
      .eq("user_id", userId);

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error };
  }
};

export const createMember = async (userId, memberData) => {
  try {
    const { error } = await supabase.from("members").insert({
      user_id: userId,
      name: memberData.name,
    });

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const updateMember = async (id, memberData) => {
  try {
    const updatedMember = {
      name: memberData.name,
    };

    const { error } = await supabase
      .from("members")
      .update(updatedMember)
      .eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const deleteMember = async (id) => {
  try {
    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};
