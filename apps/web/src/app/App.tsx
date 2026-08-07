import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { api } from '../lib/http';
import { authClient } from '../lib/auth';

export function App() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const {
    data: health,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['health'],
    queryFn: () => api.health()
  });
  const { data: currentUser } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => api.me(),
    enabled: Boolean(session)
  });

  const statusMessage = error
    ? error.message || 'The API is not available. Start it with pnpm dev.'
    : health
      ? `API status: ${health.status}`
      : 'Checking API…';

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="w-full max-w-[680px] rounded-3xl border border-[#dce4f0] bg-white p-[clamp(2rem,7vw,4rem)] shadow-[0_24px_80px_rgb(33_54_92_/_10%)]">
        <p className="mb-4 text-xs font-extrabold tracking-[0.14em] text-[#526cd3]">
          PNPM MONOREPO
        </p>
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.045em]">
          React and NestJS are connected.
        </h1>
        <p className="my-6 text-[1.05rem] leading-[1.7] text-[#63708b]">
          {currentUser
            ? `Signed in as ${currentUser.user.name || currentUser.user.email}. Your session is valid in both the web and API apps.`
            : 'Shared types, a typed API client, and UI components are all provided by workspace packages.'}
        </p>
        <div className="mb-6 flex items-center gap-2.5 text-[#43506b]" aria-live="polite">
          <span
            className={cn('size-2.5 rounded-full bg-[#e2a43a]', health && !error && 'bg-[#2daf78]')}
          />
          {statusMessage}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isSessionPending ? null : session ? (
            <button
              className="cursor-pointer rounded-[10px] bg-[#16213c] px-[18px] py-3 font-bold text-white"
              type="button"
              onClick={() => void authClient.signOut().then(() => window.location.reload())}
            >
              Sign out
            </button>
          ) : (
            <Link
              className="rounded-[10px] bg-[#16213c] px-[18px] py-3 font-bold text-white no-underline"
              to="/login"
            >
              Open login
            </Link>
          )}
          <Button
            className="h-auto bg-[#526cd3] px-[18px] py-3 font-bold hover:bg-[#4059bd]"
            disabled={isFetching}
            onClick={() => void refetch()}
          >
            {isFetching ? 'Checking API…' : 'Check API'}
          </Button>
        </div>
      </section>
    </main>
  );
}
