"use client";
import React from "react";
import { Button, Divider, Table, Title, Group, Text, Center, Select, Alert, Skeleton } from "@mantine/core";
import { IconSquare, IconSquareCheck, IconTrash } from "@tabler/icons-react";

export default function ListUsersTable({ dataUsers }: { dataUsers: any }) {
  return (
    <>
      <Table withColumnBorders withRowBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Password</Table.Th>
            <Table.Th>Action</Table.Th>
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
                  <Button variant="default" size="xs" leftSection={<IconTrash size="1rem" stroke={1.5} />}>
                    Delete
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </>
  );
}
