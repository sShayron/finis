import { client } from "@client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const useDespesas = (count?: number) => {
  const [despesas, setDespesas] = useState([] as any[]);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const location = useLocation();

  const getDespesas = async () => {
    const res = await client?.get("/income-expense");
    setDespesas(
      res?.data.incomeExpense.filter((d: any) => d.type === "expense")
    );
    setTotalIncomes(res?.data.totalIncomes);
  };

  useEffect(() => {
    getDespesas();
  }, [location]);

  return {
    despesas: count ? despesas.slice(0, count) : despesas,
    totalIncomes,
  };
};
