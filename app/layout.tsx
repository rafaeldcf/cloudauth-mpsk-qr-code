import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import MainLayout from "@/components/MainLayout";
import { icons } from "@tabler/icons-react";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "CloudAuth - MPSK",
  description: "Demo: Aruba Central CloudAuth integration using MPSK with QR Code",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  creator: "Rafael del Cerro Flores",
  publisher: "Rafael del Cerro Flores",
  keywords: ["Next.js", "React", "JavaScript", "Aruba Central", "Aruba", "MPSK"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider>
            <MainLayout>
              {children}
              <Analytics />
            </MainLayout>
          </MantineProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
