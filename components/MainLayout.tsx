"use client";
import React, { useState } from "react";

import { ActionIcon, Anchor, AppShell, Center, Group, Text } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";

import Navbar from "./Navbar";
import { IconBrandGithub, IconBrandGithubFilled, IconQrcode } from "@tabler/icons-react";
import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm" }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Anchor href="/" underline="never" component={Link}>
            <Center inline>
              <IconQrcode size={30} color="#228be6" />
              <Text fw={700} ml="xs" c="dark">
                CloudAuth MPSK QR Code
              </Text>
            </Center>
          </Anchor>
          <Anchor underline="never" href="https://github.com/rafaeldcf/cloudauth-mpsk-qr-code" target="_blank">
            <Center color="none">
              <ActionIcon variant="outline" radius="xl" aria-label="Settings" mr="xs">
                <IconBrandGithub size={20} stroke={1.8} />{" "}
              </ActionIcon>
              Github Repository
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
