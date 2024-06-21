import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import MainLayout from "@/components/MainLayout";

export const metadata = {
  title: "CloudAuth - MPSK",
  description: "Demo: Aruba CloudAuth MPSK with QR Code",
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
            <MainLayout>{children}</MainLayout>
          </MantineProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
