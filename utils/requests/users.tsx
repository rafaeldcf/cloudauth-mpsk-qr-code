import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function useGetUsers({ namedMPSK }: { namedMPSK: any }) {
  return useQuery({
    queryKey: ["getUsers", namedMPSK],
    queryFn: async () => {
      const response = await fetch("/api/central/users?named_mpsk=" + namedMPSK, { method: "GET" });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    staleTime: 1,
    enabled: !!namedMPSK,
  });
}
