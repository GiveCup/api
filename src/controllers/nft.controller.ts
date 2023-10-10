import { Request, Response } from "express";
import supabase from "../config/supabaseConfig";

// Cup Controller
export const getCups = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("cups").select();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addCup = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("cups").insert([req.body]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Accessory Controller
export const getAccessories = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("accessories").select();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addAccessory = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("accessories")
      .insert([req.body]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Case Controller
export const getCases = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("cases").select();
    if (error) throw error;
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addCase = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("cases").insert([req.body]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
