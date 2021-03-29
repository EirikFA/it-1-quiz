/* eslint-disable import/prefer-default-export */
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_KEY!
);

export const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);
