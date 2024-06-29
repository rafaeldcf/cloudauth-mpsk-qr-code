import React from "react";
import ReactDOM from "react-dom/client";
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateUser from "@/components/CreateUser";
import { AppShell, Burger, Button, Grid, Group, Skeleton, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";

import ManageCentralToken from "@/components/ManageCentralToken";
import Navbar from "@/components/Navbar";
import MainLayout from "@/components/MainLayout";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      Configure settings
      {/*
        <MainLayout />
        */}
    </>
  );
}
