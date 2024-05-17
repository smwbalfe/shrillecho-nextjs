'use client'
import Layout from "~/lib/layout";
import { Providers } from "~/lib/config/providers";
import { indexTheme } from "~/lib/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jb">
      <body>
        <Providers>
            <Layout>
              {children}
            </Layout>
          </Providers>
      </body>
    </html>
  );
}