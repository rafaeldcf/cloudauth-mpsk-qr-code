import { useGetTokens } from "@/utils/requests/tokens";
import { useQRCode } from "next-qrcode";

import React from "react";

export default function Qr({ password }: { password: any }) {
  const { Canvas } = useQRCode();
  const { data } = useGetTokens();

  return (
    <Canvas
      text={"WIFI:T:WPA;S:" + data.cookies.guest_ssid + ";P:" + password + ";;"}
      options={{
        errorCorrectionLevel: "L",
        margin: 2,
        scale: 5,
        width: 250,
        color: {
          dark: "#010599FF",
          //light: "#FFBF60FF",
          light: "#ffffff",
        },
      }}
    />
  );
}
