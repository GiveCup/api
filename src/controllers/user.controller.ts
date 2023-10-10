import supabase from "../config/supabaseConfig";

export const getAllUsers = async (req: any, res: any) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.status(500).json({ error });
  return res.json(data);
};
