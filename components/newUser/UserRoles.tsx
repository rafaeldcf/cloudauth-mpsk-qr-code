import { Select, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

export default function UserRoles({ user_role, setGuestRole }: { user_role: string; setGuestRole: any }) {
  return (
    <>
      <TextInput
        label="User Role"
        defaultValue={user_role}
        onChange={(e) => {
          setGuestRole(e.target.value);
        }}
      />
    </>
  );
}
