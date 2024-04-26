import { supabase } from "../init";

export const post_logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error;

    res.status(200).send("Desconectado com sucesso");
  } catch (error) {
    res.status(400).send("Falha ao desconectar")
  }
}
