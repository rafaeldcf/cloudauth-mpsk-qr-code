"use client";
import React, { useEffect, useState } from "react";
import Qr from "./Qr";
import { Card, Grid, Group, TextInput, Text, Center, Button, Stack, Title, Divider, Select, Alert } from "@mantine/core";
import { useGetNamedMPSK } from "@/utils/requests/namedMPSK";
import { useGetTokens } from "@/utils/requests/tokens";
import { IconUserPlus } from "@tabler/icons-react";
import QrSkeleton from "./newUser/QrSkeleton";
import { useCreateUser } from "@/utils/requests/users";
import ErrorUser from "./newUser/ErrorUser";
import Cookies from "js-cookie";

interface listError {
  error?: string;
  error_description?: string;
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export default function CreateUser() {
  const { data: dataGetNamedMPSK, status: statusNamedMPSK, isLoading: isLoadingNamedMPSK } = useGetNamedMPSK();

  const [password, setPassword] = useState();
  const [createdUser, setCreatedUser] = useState<any>();
  const [username, setUsername] = useState("");
  const [namedMPKSList, setNamedMPSKList] = useState<any>([]);
  const [selectedNamedMPSK, setSelectedNamedMPSK] = useState<any>();
  const [isError, setIsError] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [listError, setListError] = useState<listError>();
  const [guestSSID, setGuestSSID] = useState("");
  const [guestRole, setGuestRole] = useState("");

  const { data: dataGetCookies } = useGetTokens();

  const { mutateAsync: mutateAsyncCreateUser, status: statusCreateUser, isPending: isPendingCreateUser } = useCreateUser();

  const lectureCookies = Cookies.get("central-auth-token");

  useEffect(() => {
    if (lectureCookies && isJsonString(lectureCookies)) {
      const cookieJSON = JSON.parse(lectureCookies);
      if (cookieJSON.guest_ssid) {
        setGuestSSID(cookieJSON.guest_ssid);
      }
      if (cookieJSON.guest_role) {
        setGuestRole(cookieJSON.guest_role);
      }
    }
  }, [lectureCookies]);

  useEffect(() => {
    if (dataGetNamedMPSK?.error) {
      console.log("hay que tratar renovar el token");
      setListError(dataGetNamedMPSK);
    } else {
      setListError({});
      if (dataGetNamedMPSK?.items) {
        var sal: any = [];
        dataGetNamedMPSK?.items.map((item: any) => {
          let itemNuevo = { value: item.id, label: item.ssid };
          sal.push(itemNuevo);
        });
        setNamedMPSKList(sal);

        if (sal.length == 1) {
          setSelectedNamedMPSK(sal[0].value);
        }
      }
    }
  }, [dataGetNamedMPSK]);

  const createMPSK = async () => {
    const body = {
      named_mpsk: selectedNamedMPSK,
      body: {
        mpsk: "12345678",
        name: username,
        role: guestRole,
        status: "enabled",
      },
    };

    const resultado = await mutateAsyncCreateUser({ body: body });
    //console.log(resultado);
    if (resultado.data.errorCode) {
      setIsError(true);
      setErrorData(resultado.data);
    } else {
      setPassword(resultado.data.mpsk);
      setCreatedUser(resultado.data);
      setErrorData({});
    }
  };

  return (
    <>
      <Group gap="xs">
        <IconUserPlus size="1.2rem" stroke={1.5} />
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
                disabled={(isLoadingNamedMPSK && statusNamedMPSK == "pending") || !!!dataGetNamedMPSK?.items?.length}
              />
              {listError && listError?.error && (
                <Alert color="red" title={"Error: " + listError.error} p="xs">
                  {listError.error_description}
                </Alert>
              )}
              <TextInput size="sm" label="User email" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
              <Button onClick={() => createMPSK()} disabled={isPendingCreateUser || (isLoadingNamedMPSK && statusNamedMPSK == "pending") || !!!dataGetNamedMPSK?.items?.length}>
                Create User
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          {password && !isError && (
            <Card withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>User created</Text>
              </Group>
              <Text>User Name: {createdUser?.name}</Text>
              <Text>Status: {createdUser?.status}</Text>
              <Text>WiFi Network: {guestSSID}</Text>
              <Text>Access Code: {password}</Text>
              <Center>
                <Qr password={password} guestSSID={guestSSID} />
              </Center>
            </Card>
          )}
          {statusCreateUser == "pending" && <QrSkeleton />}
          {isError && <ErrorUser error_data={errorData} />}
        </Grid.Col>
      </Grid>
    </>
  );
}
