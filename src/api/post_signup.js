import { createAuthUser } from './../auth/createAuthUser.js';
import { createDbUser } from './../database/createDbUser.js';
import { checkEmailRecords } from '../database/checkEmailRecords.js';

export const post_signup =  async (req, res) => {
  //não obrigatórios
  let { phone, rg, cpf, profession, organ_issuer, post_code, address, birth_date } = req.body;

  //obrigatórios
  let {email, password, name} = req.body;

  if(!email || !password || !name) {
    res.status(400).json({ error: 'É necessário preencher todos os campos obrigatórios' });
  }

  try {
    const emailExists = await checkEmailRecords(email);

    if (emailExists.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    // 1. Insere novo usuário na Auth do supabase
    let authId = await createAuthUser(email, password, name);

    // 2. Insere novo usuário na tabela Users do supabase
    let userData = { id: authId, email, name, phone, rg, cpf, profession, organ_issuer, post_code, address, birth_date };
    await createDbUser(userData);

    res.status(200).send("Usuário cadastro com sucesso")
  } catch (error) {
    if (error.message.includes('Email já cadastrado')) {
      res.status(400).json({ error: 'Email já cadastrado' });
    } else {
      res.status(400).send("Falha ao cadastrar usuário: " + error.message);
    }
  }
};