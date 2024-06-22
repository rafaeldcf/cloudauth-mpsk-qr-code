"use client";
import React, { useEffect, useState } from "react";

import { Button, Divider, Table, Title, Group, Text, Center, Select, Alert, Skeleton } from "@mantine/core";

import { useSetTokens } from "@/utils/requests/tokens";
import { IconSquare, IconSquareCheck, IconTrash } from "@tabler/icons-react";

import { useGetUsers } from "@/utils/requests/users";
import { useGetNamedMPSK } from "@/utils/requests/namedMPSK";
import ListUsersLoading from "./users/ListUsersLoading";
import ListUsersTable from "./users/ListUsersTable";
import ListUsersNoData from "./users/ListUsersNoData";

export default function ListUsers() {
  const { data: dataGetNamedMPSK, status: statusNamedMPSK, isLoading: isLoadingNamedMPSK } = useGetNamedMPSK();
  console.log("StatusMPSK:", statusNamedMPSK);
  console.log("isLoadingMPSK:", isLoadingNamedMPSK);
  console.log(dataGetNamedMPSK);
  //const { data: data2 } = useSetTokens();

  const [namedMPKSList, setNamedMPSKList] = useState<any>([]);
  const [selectedNamedMPSK, setSelectedNamedMPSK] = useState<any>();

  const { data: data1, status: statusUsers, isLoading: isLoadingUsers } = useGetUsers({ namedMPSK: selectedNamedMPSK });
  //console.log(data1?.data?.items);

  console.log("Status Users:", statusUsers);
  console.log("Is LoadingUsers:", isLoadingUsers);

  useEffect(() => {
    if (dataGetNamedMPSK?.data?.items) {
      var sal: any = [];
      dataGetNamedMPSK?.data?.items.map((item: any) => {
        let itemNuevo = { value: item.id, label: item.ssid };
        sal.push(itemNuevo);
      });
      setNamedMPSKList(sal);

      if (sal.length == 1) {
        setSelectedNamedMPSK(sal[0].value);
      }
      //console.log(dataGetNamedMPSK?.data?.items);
    }
  }, [dataGetNamedMPSK]);

  if (isLoadingUsers && statusUsers == "pending") {
    // return <ListUsersLoading />;
  }

  return (
    <>
      <Group justify="space-between">
        <Title order={3}>List of Users</Title>
        <Text>Cantidad: {data1?.data?.items?.length}</Text>
      </Group>
      <Divider mt={0} mb="sm" />
      <Select
        mb="xs"
        style={{ width: "200px" }}
        size="sm"
        label="WiFi Network"
        placeholder="WiFi Network"
        data={namedMPKSList}
        value={selectedNamedMPSK}
        onChange={(_value: any, option) => {
          if (_value) {
            setSelectedNamedMPSK(_value);
          }
        }}
      />

      {isLoadingUsers && statusUsers == "pending" && (
        <>
          <Skeleton height={20} radius="sm" />
          <Skeleton height={20} mt={6} width="70%" radius="sm" />
          <Skeleton height={20} mt={6} width="90%" radius="sm" />
        </>
      )}
      {!isLoadingUsers && statusUsers == "success" && data1?.data?.items?.length > 0 && <ListUsersTable dataUsers={data1} />}
      {!isLoadingUsers && statusUsers == "success" && data1?.data?.items?.length == 0 && <ListUsersNoData />}
      {/*
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
          {data1?.data?.items?.length > 0 &&
            data1?.data?.items?.map((element: any) => (
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
      */}
    </>
  );
}
