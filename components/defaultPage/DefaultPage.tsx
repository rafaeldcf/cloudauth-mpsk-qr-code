"use client";
import { Badge, Group, Title, Text, Card, SimpleGrid, Container, rem, useMantineTheme, Anchor } from "@mantine/core";
import { IconSettings, IconUser, IconUserPlus } from "@tabler/icons-react";
import classes from "./DefaultPage.module.css";
import { link } from "fs";
import Link from "next/link";

const mockdata = [
  {
    title: "Aruba Central Configuration",
    description: "Aruba Central settings to integrate the application using API-Rest authentication.",
    icon: IconSettings,
    link: "/config",
  },
  {
    title: "List of current MPSK users",
    description: "Users currently available for each MPSK network, you will be able to view and delete them",
    icon: IconUser,
    link: "/users",
  },
  {
    title: "Create new MPSK users",
    description: "Option to create new MPSK users for each network with a QR-Code to simplify the onboarding process",
    icon: IconUserPlus,
    link: "/new",
  },
];

export function DefaultPage() {
  const theme = useMantineTheme();

  const features = mockdata.map((feature) => (
    <Card key={feature.title} radius="md" className={classes.card} padding="xl" component={Link} href={feature.link}>
      <feature.icon style={{ width: rem(50), height: rem(50) }} stroke={2} color={theme.colors.blue[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="xl" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Demo Project - Aruba Central & CloudAuth
        </Badge>
      </Group>

      <Title order={2} ta="center" mt="sm" className={classes.title}>
        User access with Aruba Central and MPSK networks with QR-Code
      </Title>

      <Text c="dimmed" ta="center" mt="md" className={classes.description}>
        Create users accounts with a QR-Code to simplify the process for MPSK networks using CloudAuth. It´s a very simple workflow that could be integrated anywhere.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
