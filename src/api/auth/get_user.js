export const get_user = async (req, res) => {
  res.status(200).send(req.user)
}