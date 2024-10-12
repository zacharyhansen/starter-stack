import Link from 'next/link';
import { Button } from '@repo/ui/components/button';

import { HOME } from '~/constants/routes';

export default function NotFoundPage() {
  return (
    <main className="text-card-foreground grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-accent-foreground text-base font-semibold">404</p>
        <h1 className="text-primary mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="text-accent-foreground mt-6 text-base leading-7">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href={HOME}>
            <Button>Go back home</Button>
          </Link>
          <button className="text-accent-foreground text-sm font-semibold">
            Contact support <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </main>
  );
}
