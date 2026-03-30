import { type ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta name="base:app_id" content="69c9e18354fba99e37410fdc" />
        <meta
          name="talentapp:project_verification"
          content="831f7945123592ce812a9ff8cdd16e8d99333ac581c9a581c93b930ecf1a8c4b8ee5d9632ea490273abe15e49f5643101f713b7214aac5a16bfd24e5ca9f5261"
        />
        <title>LikeBoard</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
