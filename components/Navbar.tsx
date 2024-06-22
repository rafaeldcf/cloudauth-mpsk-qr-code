import { NavLink } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IconSettings, IconUser, IconUserPlus } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      <NavLink href="/config" label="Aruba Central Tokens" leftSection={<IconSettings size="1rem" stroke={1.5} />} component={Link} active={pathname == "/config"} />
      <NavLink href="/users" label="Users" leftSection={<IconUser size="1rem" stroke={1.5} />} component={Link} active={pathname == "/users"} />
      <NavLink href="/new" label="New User" leftSection={<IconUserPlus size="1rem" stroke={1.5} />} component={Link} active={pathname == "/new"} />
    </>
  );
}
