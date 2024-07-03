import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextResponse } from "next/server";
export function useGetUsers({ namedMPSK }: { namedMPSK: any }) {
  return useQuery({
    queryKey: ["getUsers", namedMPSK],
    queryFn: async () => {
      const response = await fetch("/api/central/users?named_mpsk=" + namedMPSK, { method: "GET" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    },
    staleTime: 1,
    enabled: !!namedMPSK,
  });
}

export function useDeleteUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, namedMPSK }: { userId: any; namedMPSK: any }) => {
      const response = await fetch("/api/central/users?named_mpsk=" + namedMPSK + "&user_id=" + userId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    },
    onSuccess: async (data, variables, context) => {
      const resCentralQuery = await data.json();
      const internalRequest = data.status;

      if (internalRequest == 200 && resCentralQuery.status == 204) {
        queryClient.invalidateQueries({ queryKey: ["getUsers", variables.namedMPSK] });
      }
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ body }: { body: any }) => {
      const response = await fetch("/api/central/users", { method: "POST", body: JSON.stringify(body) });
      const data = await response.json();
      return data;
    },
    onSuccess: async (data, variables, context) => {
      //const resCentralQuery = await data.json();
      const internalRequest = data.status;

      if (internalRequest == 200) {
        queryClient.invalidateQueries({ queryKey: ["getUsers", variables.body.namedMPSK] });
      }
    },
  });
}
