import { Alert } from "@mantine/core";
import React from "react";

export default function ErrorUser({ error_data }: { error_data: any }) {
  return (
    <Alert color="red" title={"Error: " + error_data.errorCode}>
      {error_data.errorMessage}
    </Alert>
  );
}
