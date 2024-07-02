"use client";
import React, { useEffect, useState } from "react";

import { Button, Divider, Table, Title, Group, Text, Center, Select, Alert, Skeleton, Grid, Loader } from "@mantine/core";

import { IconSquare, IconSquareCheck, IconTrash, IconUser, IconUsers } from "@tabler/icons-react";

import { useGetUsers } from "@/utils/requests/users";
import { useGetNamedMPSK } from "@/utils/requests/namedMPSK";
import ListUsersTable from "./users/ListUsersTable";
import ListUsersNoData from "./users/ListUsersNoData";

interface listError {
  error?: string;
  error_description?: string;
}

export default function ListUsers() {
  const { data: dataGetNamedMPSK, status: statusNamedMPSK, isLoading: isLoadingNamedMPSK }: { data: any; status: any; isLoading: any } = useGetNamedMPSK();

  const [namedMPKSList, setNamedMPSKList] = useState<any>([]);
  const [selectedNamedMPSK, setSelectedNamedMPSK] = useState<any>();
  const [listError, setListError] = useState<listError>();

  const { data: data1, status: statusUsers, isLoading: isLoadingUsers } = useGetUsers({ namedMPSK: selectedNamedMPSK });

  useEffect(() => {
    //console.log(dataGetNamedMPSK);
    if (dataGetNamedMPSK?.error) {
      console.log("hay que tratar renovar el token");
      setListError(dataGetNamedMPSK);
    } else {
      if (dataGetNamedMPSK?.items) {
        setListError({});
        var sal: any = [];
        dataGetNamedMPSK?.items.map((item: any) => {
          let itemNuevo = { value: item.id, label: item.ssid };
          sal.push(itemNuevo);
        });
        setNamedMPSKList(sal);

        if (sal.length == 1) {
          setSelectedNamedMPSK(sal[0].value);
        }
        //console.log(dataGetNamedMPSK?.data?.items);
      }
    }
  }, [dataGetNamedMPSK]);

  return (
    <>
      <Group gap="xs">
        <IconUser size="1.2rem" stroke={1.5} />
        <Title order={3}>List of Users</Title>
      </Group>
      <Divider mt={0} mb="sm" />
      <Grid align="center">
        <Grid.Col span={4}>
          <Group>
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
              disabled={(isLoadingNamedMPSK && statusNamedMPSK == "pending") || !!!dataGetNamedMPSK?.items?.length}
            />
            {isLoadingNamedMPSK && <Loader size="sm" color="blue" />}
          </Group>
        </Grid.Col>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
          {!listError && data1?.data?.items && (
            <Group justify="flex-end">
              <Center inline>
                <IconUsers size="1rem" stroke={1.5} />
                <Text ml="xs" size="sm">
                  Users: {data1?.data?.items?.length}
                </Text>
              </Center>
            </Group>
          )}
        </Grid.Col>
        <Grid.Col span={12}>
          {listError && listError?.error && (
            <Alert color="red" title={"Error: " + listError.error} p="xs">
              {listError.error_description}
            </Alert>
          )}
        </Grid.Col>
      </Grid>
      {isLoadingUsers && statusUsers == "pending" && (
        <>
          <Skeleton height={20} radius="sm" />
          <Skeleton height={20} mt={6} width="70%" radius="sm" />
          <Skeleton height={20} mt={6} width="90%" radius="sm" />
        </>
      )}
      {!isLoadingUsers && statusUsers == "success" && data1?.data?.items?.length > 0 && <ListUsersTable dataUsers={data1} namedMPSK={selectedNamedMPSK} />}
      {!isLoadingUsers && statusUsers == "success" && data1?.data?.items?.length == 0 && <ListUsersNoData />}
      {!isLoadingUsers && statusUsers == "success" && namedMPKSList.length == 0 && (
        <Alert title="No MPSK networks" color="yellow">
          No MPSK Networks. You need to add a MPSK Network: Global &rarr; Security &rarr; Auth&Policies &rarr; Config &rarr; Manage MPSK &rarr; Under MPSK Network add, New Configuration and select the
          SSDI created before.
        </Alert>
      )}
    </>
  );
}
