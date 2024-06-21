import { useQuery, useMutation } from "@tanstack/react-query";
export function useSetTokens() {
  return useMutation({
    mutationFn: ({ inputData }: { inputData: any }) => {
      //console.log(inputData);
      const response = fetch("/api/tokens", { method: "POST", body: JSON.stringify(inputData) });
      // console.log(response);
      return response;
    },
    onSuccess: (data, variables, context) => {
      //console.log(data);
      return data.json();
    },
  });
}

export function useGetTokens() {
  return useQuery({
    queryKey: ["getTokens"],
    queryFn: async () => {
      const response = await fetch("/api/tokens", { method: "GET" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
