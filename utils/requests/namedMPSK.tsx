import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextResponse } from "next/server";
export function useGetNamedMPSK() {
  return useQuery({
    queryKey: ["getNamedMPSK"],
    queryFn: async () => {
      const response = await fetch("/api/central/namedMPSK", { method: "GET" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const listado = await response.json();
      return listado;
    },
    staleTime: 1,
  });
}
