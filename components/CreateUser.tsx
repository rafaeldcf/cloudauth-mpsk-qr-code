"use client";
import React, { useEffect, useState } from "react";
import Qr from "./Qr";
import { Card, Grid, Group, TextInput, Text, Center, Button, Stack, Title, Divider, Select } from "@mantine/core";
import { useGetNamedMPSK } from "@/utils/requests/namedMPSK";
import { useGetTokens } from "@/utils/requests/tokens";

export default function CreateUser() {
  const { data: dataGetNamedMPSK } = useGetNamedMPSK();

  const [password, setPassword] = useState();
  const [createdUser, setCreatedUser] = useState<any>();
  const [username, setUsername] = useState("");
  const [namedMPKSList, setNamedMPSKList] = useState<any>([]);
  const [selectedNamedMPSK, setSelectedNamedMPSK] = useState<any>();

  const { data: dataGetCookies } = useGetTokens();

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
    }
  }, [dataGetNamedMPSK]);

  const createMPSK = async () => {
    const body = {
      named_mpsk: selectedNamedMPSK,
      body: {
        mpsk: "12345678",
        name: username,
        role: dataGetCookies.cookies.guest_role,
        status: "enabled",
      },
    };
    const staticData = await fetch("/api/central/users", { method: "POST", body: JSON.stringify(body) });
    const salida = await staticData.json();
    if (salida.data?.mpsk) {
      setPassword(salida.data.mpsk);
      setCreatedUser(salida.data);
    }
  };

  return (
    <>
      <Group justify="space-between">
        <Title order={3}>New User</Title>
      </Group>
      <Divider mt={0} mb="sm" />

      <Grid>
        <Grid.Col span={4}>
          <Card withBorder>
            <Stack justify="space-between" mb="xs">
              <Text fw={500}>Create user</Text>
              <Select
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
              <TextInput size="sm" label="User email" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
              <Button onClick={() => createMPSK()}>Create User</Button>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          {password && (
            <Card withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>User created</Text>
              </Group>
              <Text>User Name: {createdUser?.name}</Text>
              <Text>Status: {createdUser?.status}</Text>
              <Text>Red WiFi: {dataGetCookies?.cookies.guest_ssid}</Text>
              <Text>Access Code: {password}</Text>
              <Center>
                <Qr password={password} />
              </Center>
            </Card>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}
