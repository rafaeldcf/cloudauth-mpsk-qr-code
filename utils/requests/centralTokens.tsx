import { useQuery, useMutation } from "@tanstack/react-query";
export function useRenewCentralTokens() {
  return useMutation({
    mutationFn: async ({ inputData }: { inputData: any }) => {
      const response = await fetch("/api/central/tokens", { method: "POST", body: JSON.stringify(inputData) });
      const data = await response.json();
      //console.log(data);
      return data;
    },
    onSuccess: (data, variables, context) => {
      //console.log(data);
      //return data.json();
    },
  });
}
