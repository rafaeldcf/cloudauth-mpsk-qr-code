import { NavLink } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconSettings, IconUser, IconUserPlus } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const [existsCookies, setExistsCookies] = useState(false);
  const pathname = usePathname();

  // Check if there are cookies
  const cookies = Cookies.get("central-auth-token");

  useEffect(() => {
    if (cookies) {
      setExistsCookies(true);
    }
  }, [cookies]);

  return (
    <>
      <NavLink href="/config" label="Aruba Central Tokens" leftSection={<IconSettings size="1rem" stroke={1.5} />} component={Link} active={pathname == "/config"} />
      <NavLink disabled={!existsCookies} href="/users" label="Users" leftSection={<IconUser size="1rem" stroke={1.5} />} component={Link} active={pathname == "/users"} />
      <NavLink disabled={!existsCookies} href="/new" label="New User" leftSection={<IconUserPlus size="1rem" stroke={1.5} />} component={Link} active={pathname == "/new"} />
    </>
  );
}
