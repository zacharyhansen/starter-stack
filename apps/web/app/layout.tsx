import 'server-only';
import '@repo/ui/tailwind.css';

import { ClerkProvider } from '@clerk/nextjs';

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
        signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      >
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
