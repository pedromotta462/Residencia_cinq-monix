import { createAuthUser } from './../auth/createAuthUser.js';
import { createDbUser } from './../database/createDbUser.js';

export const post_signup =  async (req, res) => {
  let {email, password, name} = req.body;

  if(!email || !password || !name) {
    res.status(400).json({ error: 'É necessário preencher todos os campos' });
  }

  try {
    // 1. Insere novo usuário na Auth do supabase
    let authId = await createAuthUser(email, password);

    // 2. Insere novo usuário na tabela Users do supabase
    createDbUser({ id:authId, email, name});

    res.status(200).send("Usuário cadastro com sucesso")
  } catch (error) {
    res.status(400).send("Falha ao cadastrar usuário")
  }
};