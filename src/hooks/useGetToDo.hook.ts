import type { CommonApi } from "@/models/commonapi.type";
import { getAllTask } from "@/services/todotask,api.ts";
import { useCallback, useEffect, useState } from "react";

export function useGetToDo() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = (await getAllTask()) as CommonApi;
      if (response.status) {
        setData(response.data);
        setLoading(true);
      }
    } catch (error) {
      setError("An error occurred while fetching data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
}
