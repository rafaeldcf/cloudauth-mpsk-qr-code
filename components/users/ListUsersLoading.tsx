import { Skeleton } from "@mantine/core";
import React from "react";

export default function ListUsersLoading() {
  return (
    <>
      <Skeleton height={20} radius="sm" />
      <Skeleton height={20} mt={6} width="70%" radius="sm" />
      <Skeleton height={20} mt={6} width="90%" radius="sm" />
    </>
  );
}
