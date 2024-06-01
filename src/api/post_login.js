import { authLogin, googleLoginUrl, handleGoogleCallback } from './../auth/authLogin.js';

export const post_login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    // Email/password login
    try {
      const jwt = await authLogin(email, password);
      res.status(200).json({ token: jwt });
    } catch (error) {
      res.status(400).send("Falha no login");
    }
  } else {
    res.status(400).send("Email e senha são necessários para login");
  }
};

export const get_google_login = async (req, res) => {
  try {
    const url = await googleLoginUrl();
    res.status(200).json({ url });
  } catch (error) {
    res.status(400).send("Falha no login com Google");
  }
};

export const post_google_callback = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await handleGoogleCallback(token);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send("Falha no login com Google");
  }
};
