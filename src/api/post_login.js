import { authLogin } from './../auth/authLogin';

export const post_login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let jwt = await authLogin(email, password);
    res.status(200).send(jwt);
  } catch (error) {
    res.status(400).send("Falha no login")
  }
}