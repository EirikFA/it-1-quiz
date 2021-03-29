import { SupabaseContext } from "@api";
import { SupabaseClient } from "@supabase/supabase-js";
import { useContext } from "react";

const useSupabase = (): SupabaseClient => {
  const client = useContext(SupabaseContext);
  if (!client) throw new Error("No Supabase instance found");
  return client;
};

export default useSupabase;
