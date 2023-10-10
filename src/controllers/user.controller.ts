import supabase from "../config/supabaseConfig";

export const getAllUsers = async (req: any, res: any) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.status(500).json({ error });
  return res.json(data);
};

export const upsertUser = async (req: any, res: any, next: any) => {
  const { address, username, herotag } = req.body;

  // Check if the user exists
  const { data: user, error: userNotFound } = await supabase
    .from("users")
    .select("*")
    .eq("address", address)
    .single();

  // Upsert user logic
  const { error } = await supabase
    .from("users")
    .upsert({ address, username, herotag });

  if (error) {
    return res.status(500).send({
      message: "Error updating user.",
      details: error.message,
    });
  }

  if (!user) {
    // If user wasn't found earlier, it means this is a new user.
    await supabase.from("notifications").insert({
      user: address,
      status: "success",
      message: "Welcome to GiveCup!",
    });
  }

  return res.status(200).send({
    message: "User upserted",
  });
};
