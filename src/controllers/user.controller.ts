import supabase from "../config/supabaseConfig";
import { Request, Response, NextFunction } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.status(500).json({ error });
  return res.json(data);
};

export const upsertUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("xp", { ascending: false })
    .limit(10); // Fetch the top 10 users, you can modify this as per requirement

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json(data);
};
