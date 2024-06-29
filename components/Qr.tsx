import { useQRCode } from "next-qrcode";

import React from "react";

export default function Qr({ password, guestSSID }: { password: any; guestSSID: string }) {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={"WIFI:T:WPA;S:" + guestSSID + ";P:" + password + ";;"}
      options={{
        errorCorrectionLevel: "L",
        margin: 2,
        scale: 5,
        width: 250,
        color: {
          dark: "#010599FF",
          light: "#ffffff",
        },
      }}
    />
  );
}
