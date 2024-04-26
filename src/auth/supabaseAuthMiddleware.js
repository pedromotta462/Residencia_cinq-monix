import { supabase } from './../init';

export const supabaseAuthMiddleware = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  let { data, error } = await supabase.auth.getUser(token);
  if (error) {
    console.log("Failed to get supabase auth user:", error);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = data.user
  return next();

};
