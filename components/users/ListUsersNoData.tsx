import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function ListUsersNoData() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="blue" title="No users" icon={icon}>
      I cannot find any users in the database for this network.
    </Alert>
  );
}
