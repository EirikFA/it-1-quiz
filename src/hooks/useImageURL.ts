import { useSupabase } from "@hooks";
import { useCallback, useEffect, useState } from "react";

const useImageURL = (path: string): string => {
  const { storage } = useSupabase();
  const [url, setUrl] = useState("");

  const download = useCallback(async () => {
    const { data } = await storage.from("quizzes").download(path);
    if (data) {
      setUrl(URL.createObjectURL(data));
    }
  // Setting `storage` as a dependency will for some reason make the component re-render
  // and constantly change the blob/image source
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    download();
  }, [download]);

  return url;
};

export default useImageURL;
