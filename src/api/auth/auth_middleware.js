import { supabaseAuthMiddleware } from "../../auth/supabaseAuthMiddleware"

export const auth_middleware = async (req, res, next) => {
  supabaseAuthMiddleware(req, res, next)
}