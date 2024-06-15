import { client } from "@client";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

export const useMetas = (count?: number) => {
  const [metas, setMetas] = useState([] as any[]);
  const location = useLocation();

  const getMetas = async () => {
    const res = await client?.get("/goal");
    setMetas(res?.data);
  };

  const totalMetas = useMemo(
    () =>
      (count ? metas.slice(0, count) : metas).reduce(
        (sum, meta) => sum + meta.value,
        0
      ),
    [metas]
  );

  useEffect(() => {
    getMetas();
  }, [location]);

  return { metas: count ? metas.slice(0, count) : metas, totalMetas };
};
