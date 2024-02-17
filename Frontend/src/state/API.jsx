import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query({
      query: () => "kpi/kpis",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query({
      query: () => "product/products",
      providesTags: ["Products"],
    }),
    getTransactions: build.query({
      query: () => "transaction/transactions",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;

function MyComponent() {
  const kpisQuery = useGetKpisQuery();
  const productsQuery = useGetProductsQuery();
  const transactionsQuery = useGetTransactionsQuery();

  if (kpisQuery.isLoading || productsQuery.isLoading || transactionsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (kpisQuery.error || productsQuery.error || transactionsQuery.error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div></div>
  );
}

export default MyComponent;