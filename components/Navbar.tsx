import { NavLink } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IconSettings, IconUser, IconUserPlus } from "@tabler/icons-react";

export default function Navbar() {
  return (
    <>
      <NavLink href="/config" label="Aruba Central Tokens" leftSection={<IconSettings size="1rem" stroke={1.5} />} component={Link} />
      <NavLink href="/users" label="Users" leftSection={<IconUser size="1rem" stroke={1.5} />} component={Link} />
      <NavLink href="/new" label="New User" leftSection={<IconUserPlus size="1rem" stroke={1.5} />} component={Link} />
    </>
  );
}
