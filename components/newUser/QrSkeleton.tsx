import { Card, Center, Group, Skeleton } from "@mantine/core";

export default function QrSkeleton() {
  return (
    <Card withBorder>
      <Group justify="space-between" mb="xs">
        <Skeleton height={20} mb="xs" />
      </Group>
      <Skeleton height={20} mt={6} radius="xs" width="35%" />
      <Skeleton height={20} mt={6} radius="xs" width="28%" />
      <Skeleton height={20} mt={6} radius="xs" width="30%" />
      <Skeleton height={20} mt={6} radius="xs" width="35%" />
      <Center>
        <Skeleton height={250} mt={6} radius="sm" width={250} />
      </Center>
    </Card>
  );
}
