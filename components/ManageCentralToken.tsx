"use client";
import React, { useEffect, useState } from "react";
import { useSetTokens, useGetTokens } from "@/utils/requests/tokens";
import { Button, Divider, Grid, Group, Stack, TextInput, Textarea, Title } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";

export default function ManageCentralToken() {
  const { mutateAsync } = useSetTokens();
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tokensParams, setTokensParams] = useState({});
  const [centralURL, setCentralURL] = useState("");
  const [guestSSID, setGuestSSID] = useState("");
  const [guestRole, setGuestRole] = useState("");

  const { data } = useGetTokens();
  //console.log(data);
  useEffect(() => {
    if (data && data?.cookies) {
      if (data.cookies.client_id != "") {
        setClientId(data.cookies.client_id);
      }
      if (data.cookies.client_secret != "") {
        setClientSecret(data.cookies.client_secret);
      }
      if (data.cookies.tokens_params) {
        setTokensParams(data.cookies.tokens_params);
      }
      if (data.cookies.central_url != "") {
        setCentralURL(data.cookies.central_url);
      }
      if (data.cookies.guest_ssid) {
        setGuestSSID(data.cookies.guest_ssid);
      }
      if (data.cookies.guest_role != "") {
        setGuestRole(data.cookies.guest_role);
      }
    }
  }, [data]);

  const tryParseJSONTokenParameters = (input: any) => {
    if (input) {
      let a;
      try {
        a = JSON.parse(input);
      } catch (e) {
        //return console.error(e); // error in the above string (in this case, yes)!
      }
      setTokensParams(a);
    }
  };

  const saveTokenData = async () => {
    console.log("Saving Tokens to Cookie");
    const inputData = {
      client_id: clientId,
      client_secret: clientSecret,
      tokens_params: tokensParams,
      central_url: centralURL,
      guest_ssid: guestSSID,
      guest_role: guestRole,
    };
    mutateAsync({ inputData: inputData });
  };
  return (
    <>
      <Group justify="space-between">
        <Title order={3}>Aruba Central Configuration</Title>
      </Group>
      <Divider mt={0} mb="sm" />

      <Grid>
        <Grid.Col span={3}>
          <Stack gap="sm">
            <TextInput label="Client Id" placeholder="Client Id" defaultValue={clientId} size="xs" onChange={(e) => setClientId(e.target.value)} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          <Stack gap="sm">
            <TextInput label="Client Secret" placeholder="Client Secret" defaultValue={clientSecret} size="xs" onChange={(e) => setClientSecret((e.target as HTMLInputElement).value)} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}></Grid.Col>
        <Grid.Col span={9}>
          <Textarea
            label="Tokens parameters"
            placeholder="Tokens Parameters placeholder"
            size="xs"
            value={JSON.stringify(tokensParams)}
            onChange={(e) => tryParseJSONTokenParameters((e.currentTarget as HTMLTextAreaElement).value)}
            rows={4}
            style={{ width: "100%" }}
          />
        </Grid.Col>
        <Grid.Col span={3}></Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Aruba Central Base URL" placeholder="Aruba Central Base Id" size="xs" value={centralURL} onChange={(e) => setCentralURL((e.target as HTMLInputElement).value)} />
        </Grid.Col>
        <Grid.Col span={6}></Grid.Col>
        <Grid.Col span={3}>
          <TextInput label="Guest SSID" placeholder="Guest SSID" size="xs" value={guestSSID} onChange={(e) => setGuestSSID((e.target as HTMLInputElement).value)} />
        </Grid.Col>
        <Grid.Col span={3}>
          <TextInput label="Guest Role" placeholder="Guest Role" size="xs" value={guestRole} onChange={(e) => setGuestRole((e.target as HTMLInputElement).value)} />
        </Grid.Col>
      </Grid>
      <Button mt="md" variant="default" size="xs" onClick={() => saveTokenData()} fullWidth={false} leftSection={<IconDeviceFloppy size="1rem" stroke={1.5} />}>
        Save Configuration
      </Button>
    </>
  );
}
