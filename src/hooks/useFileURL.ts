import { useSupabase } from "@hooks";
import { useCallback, useEffect, useState } from "react";

const useFileURL = (bucket: string, path?: string): { loading: boolean, url: string | null } => {
  const { storage } = useSupabase();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const download = useCallback(async () => {
    // Assume loading if no path
    if (path) {
      const { data } = await storage.from(bucket).download(path);
      if (data) {
        setUrl(URL.createObjectURL(data));
      }
      setLoading(false);
    }
    // Setting `storage` as a dependency will for some reason make the component re-render
    // and constantly change the blob/image source
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket, path]);

  useEffect(() => {
    download();
  }, [download]);

  return {
    loading,
    url
  };
};

export default useFileURL;
