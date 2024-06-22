import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CloudAuth MPSK QR Code",
    short_name: "CloudAuth MPSK QR Code",
    description: "Generate QR Code for users using Aruba Central CloudAuth MPSK feature",
    start_url: "/",
    display: "standalone",
    theme_color: "#fff",
    background_color: "#fff",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/x-png",
      },
    ],
  };
}
