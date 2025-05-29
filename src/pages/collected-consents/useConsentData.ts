import { useCallback, useEffect, useState } from "react";
import type { ConsentData } from "../../utils/types";

export const PAGE_SIZE = 2;

const getConsentsForPage = (consents: Array<ConsentData>, page: number) => {
  const startIndex = (page - 1) * PAGE_SIZE;
  return consents.slice(startIndex, startIndex + PAGE_SIZE);
};

export default function useConsentData() {
  const [data, setData] = useState<Array<ConsentData>>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchConsents = useCallback(async () => {
    try {
      const response = await fetch("/consents");
      const data = await response.json();
      setData(data.data || []);
      setTotalPages(Math.ceil(data.data.length / PAGE_SIZE));
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch consents:", error);
      setLoading(false);
    }
  }, []);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    fetchConsents();
  }, [fetchConsents]);

  return {
    loading,
    consents: getConsentsForPage(data, page),
    handlePageChange,
    totalPages,
    page,
  };
}
