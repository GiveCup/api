import supabase from "../config/supabaseConfig";
import { Request, Response, NextFunction } from "express";

interface OrganizationData {
  name: string;
  description?: string;
  about?: string;
  goals?: string;
  website?: string;
  logo_url?: string;
  contact_email?: string;
}

// Fetch all organizations
export const getAllOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { data, error } = await supabase.from("organizations").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Fetch a single organization by ID
export const getOrganizationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Organization not found" });
  res.json(data);
};

// Create a new organization
export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const organizationData: OrganizationData = req.body;

  const { data, error } = await supabase
    .from("organizations")
    .insert([organizationData]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

// Update an organization
export const updateOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await supabase
    .from("organizations")
    .update(updatedData)
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Delete an organization
export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = await supabase.from("organizations").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Organization deleted successfully" });
};
