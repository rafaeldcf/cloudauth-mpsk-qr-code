"use client";
import React, { useState } from "react";

import { Anchor, AppShell, Center, Group, Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";

import Navbar from "./Navbar";
import { IconQrcode } from "@tabler/icons-react";
import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm" }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Anchor href="/" underline="never" component={Link}>
            <Center inline>
              <IconQrcode size={30} color="#228be6" />
              <Text fw={700} ml="xs" c="dark">
                CloudAuth MPSK QR Code
              </Text>
            </Center>
          </Anchor>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
