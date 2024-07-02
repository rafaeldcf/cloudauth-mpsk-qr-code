"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Group, Stack, TextInput, Textarea, Title, Text, Card, Center, Alert, Code, List } from "@mantine/core";
import { IconDeviceFloppy, IconInfoCircle, IconSettings } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import ProgressBar from "./ProgressBar";
import { useRenewCentralTokens } from "@/utils/requests/centralTokens";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";

interface tokensparams {
  access_token?: string;
  appname?: string;
  authenticated_userid?: string;
  created_at?: number;
  credential_id?: string;
  expires_in?: number;
  id?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
  tokens_params?: any;
}

interface cookieData {
  client_id?: string;
  client_secret?: string;
  tokens_params?: any;
  central_url?: string;
  guest_role?: string;
  guest_ssid?: string;
}

export default function ManageCentralToken() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tokensParams, setTokensParams] = useState<tokensparams>({});
  const [centralURL, setCentralURL] = useState("");
  const [guestSSID, setGuestSSID] = useState("");
  const [guestRole, setGuestRole] = useState("");
  const [progressValue, setProgressValue] = useState((clientId ? 25 : 0) + (clientSecret ? 25 : 0) + (tokensParams?.access_token ? 25 : 0) + (centralURL ? 25 : 0));

  const [testResult, setTestResult] = useState<tokensparams>();

  const { mutateAsync: mutateAsyncRenewCentralToken } = useRenewCentralTokens();

  const router = useRouter();

  useEffect(() => {
    setProgressValue((clientId ? 25 : 0) + (clientSecret ? 25 : 0) + (tokensParams?.access_token ? 25 : 0) + (centralURL ? 25 : 0));
  }, [clientId, clientSecret, tokensParams, centralURL]);

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const lectureCookies = Cookies.get("central-auth-token");
  useEffect(() => {
    if (lectureCookies && isJsonString(lectureCookies)) {
      const cookieJSON = JSON.parse(lectureCookies);
      if (cookieJSON.tokens_params) {
        setTokensParams(cookieJSON.tokens_params);
      }
      if (cookieJSON.client_id) {
        setClientId(cookieJSON.client_id);
      }
      if (cookieJSON.client_secret) {
        setClientSecret(cookieJSON.client_secret);
      }
      if (cookieJSON.central_url) {
        setCentralURL(cookieJSON.central_url);
      }
      if (cookieJSON.guest_ssid) {
        setGuestSSID(cookieJSON.guest_ssid);
      }
      if (cookieJSON.guest_role) {
        setGuestRole(cookieJSON.guest_role);
      }
    }
  }, [lectureCookies]);

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

  const saveFormState = async (field: string, value: string) => {
    if (field == "clientid") {
      setClientId(value);
    }
  };

  const test = async () => {
    const inputData = {
      isTesting: true,
      central_url: centralURL,
      client_id: clientId,
      client_secret: clientSecret,
      tokens_params: tokensParams,
      guest_role: guestRole,
      guest_ssid: guestSSID,
    };
    const resultado = await mutateAsyncRenewCentralToken({ inputData: inputData });
    setTestResult(resultado);
    if (!resultado.error) {
      const tempParams = tokensParams;
      tempParams.access_token = resultado.access_token;
      tempParams.refresh_token = resultado.refresh_token;
      tempParams.expires_in = resultado.expires_in;
      const temp: cookieData = {
        client_id: clientId,
        client_secret: clientSecret,
        central_url: centralURL,
        tokens_params: tempParams,
      };

      if (resultado.expires_in == 7200) {
        temp.tokens_params.created_at = Date.now();
      }
      temp.guest_role = guestRole;
      temp.guest_ssid = guestSSID;
      //setTokensParams(temp);
      Cookies.set("central-auth-token", JSON.stringify(temp), { expires: 90 });
      router.refresh();
    }
  };

  const saveData2 = async () => {
    const currentCookies = Cookies.get("central-auth-token");
    if (currentCookies && isJsonString(currentCookies)) {
      const cookieJSON = JSON.parse(currentCookies);
      cookieJSON.guest_role = guestRole;
      cookieJSON.guest_ssid = guestSSID;
      Cookies.set("central-auth-token", JSON.stringify(cookieJSON), { expires: 90 });
    }
  };

  return (
    <>
      <Group gap="xs">
        <IconSettings size="1.2rem" stroke={1.5} />
        <Title order={3}>Aruba Central Configuration</Title>
      </Group>
      <Divider mt={0} mb="sm" />
      <Alert title="API Configuration" icon={<IconInfoCircle />} variant="light" color="green" p="sm" radius="md" mb="sm">
        <Text size="sm">
          Rest-API configuration to integrate Aruba Central. All information it´s available in your Aruba Central account: Global Settings &rarr; Organization &rarr; Platform Integration &rarr; Rest
          API.
        </Text>

        <List size="sm">
          <List.Item>Tokens parameters should be in the following format:</List.Item>
          <Text bg="white.0" p={5} size="sm">
            &#123; &#x22;access_token&#x22;:&#x22;xxxxx&#x22;, &#x22;appname&#x22;:&#x22;nms&#x22;, &#x22;authenticated_userid&#x22;:&#x22;xxxxx&#x22;, &#x22;created_at&#x22;:xxxxx,
            &#x22;credential_id&#x22;:&#x22;xxxxx&#x22;, &#x22;expires_in&#x22;:xxxxx, &#x22;id&#x22;:&#x22;xxxxx&#x22;, &#x22;refresh_token&#x22;:&#x22;xxxxx&#x22;, &#x22;scope&#x22;:&#x22;all&#x22;,
            &#x22;token_type&#x22;:&#x22;bearer&#x22; &#125;
          </Text>
          <List.Item>The Aruba Central Base URL should be in this format replacing it with your own: https://xxxxx-apigw.central.arubanetworks.com</List.Item>
          <List.Item>You need to create a SSID with MPSK-AES and Cloud Auth as Authentication Server</List.Item>
          <List.Item>
            You need to add a MPSK Network: Global &rarr; Security &rarr; Auth&Policies &rarr; Config &rarr; Manage MPSK &rarr; Under MPSK Network add, New Configuration and select the SSDI created
            before.
          </List.Item>
        </List>
      </Alert>
      <Card withBorder padding="sm" className={classes.card}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Grid>
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Stack gap="sm">
                  <TextInput label="Client Id" placeholder="Client Id" defaultValue={clientId} size="xs" onChange={(e) => saveFormState("clientid", e.target.value)} />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Stack gap="sm">
                  <TextInput label="Client Secret" placeholder="Client Secret" defaultValue={clientSecret} size="xs" onChange={(e) => setClientSecret((e.target as HTMLInputElement).value)} />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <TextInput label="Aruba Central Base URL" placeholder="Aruba Central Base Id" size="xs" value={centralURL} onChange={(e) => setCentralURL((e.target as HTMLInputElement).value)} />
              </Grid.Col>
              <Grid.Col span={12}>
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
              {/*
                
              <Grid.Col span={9}>
                <TextInput label="Aruba Central Base URL" placeholder="Aruba Central Base Id" size="xs" value={centralURL} onChange={(e) => setCentralURL((e.target as HTMLInputElement).value)} />
              </Grid.Col>
              <Grid.Col span={3}></Grid.Col>
              */}
            </Grid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack align="center">
              <ProgressBar value={progressValue} testResult={testResult} />
              <Button size="sm" onClick={() => test()} variant="primary" leftSection={<IconDeviceFloppy stroke={2} size={20} />}>
                Test & Save Data
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={12}>
            {testResult?.error && (
              <Alert color="red" title={testResult.error}>
                {testResult.error_description}
              </Alert>
            )}
          </Grid.Col>
        </Grid>
      </Card>
      <Card withBorder padding="sm" mt="sm" className={classes.card}>
        <Grid align="flex-end">
          <Grid.Col span={12}>
            <Text size="sm">The SSID will be used to encode the QR-Code. The Role should exists in your Aruba Central Group.</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput label="Guest SSID" placeholder="Guest SSID" size="xs" defaultValue={guestSSID} onChange={(e) => setGuestSSID((e.target as HTMLInputElement).value)} />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput label="Guest Role" placeholder="Guest Role" size="xs" defaultValue={guestRole} onChange={(e) => setGuestRole((e.target as HTMLInputElement).value)} />
          </Grid.Col>
          <Grid.Col span={3}>
            <Button size="xs" variant="default" onClick={() => saveData2()} leftSection={<IconDeviceFloppy size="1rem" stroke={1.5} />}>
              Save data
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}
