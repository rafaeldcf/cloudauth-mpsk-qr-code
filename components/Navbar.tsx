import { NavLink } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconBrandGithub, IconSettings, IconUser, IconUserPlus, IconCreativeCommons } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar({ toggle }: { toggle: any }) {
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
      <NavLink
        href="/config"
        label="Aruba Central Tokens"
        leftSection={<IconSettings size="1rem" stroke={1.5} />}
        component={Link}
        active={pathname == "/config"}
        onClick={() => {
          toggle();
        }}
      />
      <NavLink
        disabled={!existsCookies}
        href="/users"
        label="Users"
        leftSection={<IconUser size="1rem" stroke={1.5} />}
        component={Link}
        active={pathname == "/users"}
        onClick={() => {
          toggle();
        }}
      />
      <NavLink
        disabled={!existsCookies}
        href="/new"
        label="New User"
        leftSection={<IconUserPlus size="1rem" stroke={1.5} />}
        component={Link}
        active={pathname == "/new"}
        onClick={() => {
          toggle();
        }}
      />
      <NavLink
        href="https://github.com/rafaeldcf/cloudauth-mpsk-qr-code"
        label="Github Repository"
        leftSection={<IconBrandGithub size="1rem" stroke={1.5} />}
        component={Link}
        onClick={() => {
          toggle();
        }}
        target="_blank"
      />
      <NavLink
        href="https://github.com/rafaeldcf/cloudauth-mpsk-qr-code"
        label="Author: Rafael del Cerro Flores"
        leftSection={<IconCreativeCommons size="1rem" stroke={1.5} />}
        component={Link}
        onClick={() => {
          toggle();
        }}
        target="_blank"
      />
    </>
  );
}
