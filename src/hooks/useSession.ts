import { useSupabase } from "@hooks";
import { Session } from "@supabase/gotrue-js";
import { useEffect, useState } from "react";

const useSession = (): Session | null => {
  const client = useSupabase();
  const [session, setSession] = useState<Session | null>(client.auth.session());

  useEffect(() => {
    const { data } = client.auth.onAuthStateChange((_event, newSession) => setSession(newSession));
    return () => data?.unsubscribe();
  }, [client]);

  return session;
};

export default useSession;
