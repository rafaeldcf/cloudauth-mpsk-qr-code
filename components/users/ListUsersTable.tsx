"use client";
import React, { useState } from "react";
import { Button, Divider, Table, Title, Group, Text, Center, Select, Alert, Skeleton, Loader } from "@mantine/core";
import { IconSquare, IconSquareCheck, IconTrash } from "@tabler/icons-react";
import { useDeleteUsers } from "@/utils/requests/users";

interface currentItem {
  id?: any;
}

export default function ListUsersTable({ dataUsers, namedMPSK }: { dataUsers: any; namedMPSK: string }) {
  const { mutateAsync: mutateAsyncDeteleUser, status: statusDeleteUser } = useDeleteUsers();

  const [currentItem, setCurrentItem] = useState<currentItem>();
  const deleteUser = async (element: any) => {
    setCurrentItem(element);
    mutateAsyncDeteleUser({ userId: element.id, namedMPSK: namedMPSK });
  };
  return (
    <>
      <Table withColumnBorders withRowBorders withTableBorder striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Password</Table.Th>
            <Table.Th style={{ width: "30%" }}>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {dataUsers?.data?.items?.length > 0 &&
            dataUsers?.data?.items?.map((element: any) => (
              <Table.Tr key={element.name}>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>
                  <Center>
                    {element.status == "enabled" ? (
                      <>
                        <IconSquareCheck size="1rem" stroke={1.5} style={{ marginRight: "0.5rem" }} /> Enabled
                      </>
                    ) : (
                      <>
                        <IconSquare size="1rem" stroke={1.5} style={{ marginRight: "0.5rem" }} /> Disabled
                      </>
                    )}
                  </Center>
                </Table.Td>
                <Table.Td>{element.mpsk}</Table.Td>
                <Table.Td>
                  <Group>
                    <Button variant="default" size="xs" leftSection={<IconTrash size="1rem" stroke={1.5} />} onClick={() => deleteUser(element)}>
                      Delete
                    </Button>
                    {element.id == currentItem?.id && statusDeleteUser && <Loader color="blue" size={20} />}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </>
  );
}
