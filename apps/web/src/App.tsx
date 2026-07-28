import { ApiClient } from '@repo/api-client';
import { Button } from '@repo/ui';
import { useQuery } from '@tanstack/react-query';

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim() || '/api';
const api = new ApiClient(apiBaseUrl);

export function App() {
  const {
    data: health,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['health'],
    queryFn: () => api.health()
  });

  const statusMessage = error
    ? error.message || 'The API is not available. Start it with pnpm dev.'
    : health
      ? `API status: ${health.status}`
      : 'Checking API…';

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">PNPM MONOREPO</p>
        <h1>React and NestJS are connected.</h1>
        <p className="description">
          Shared types, a typed API client, and UI components are all provided by workspace
          packages.
        </p>
        <div className="status" aria-live="polite">
          <span className={health && !error ? 'dot dot--online' : 'dot'} />
          {statusMessage}
        </div>
        <Button disabled={isFetching} onClick={() => void refetch()}>
          {isFetching ? 'Checking API…' : 'Check API'}
        </Button>
      </section>
    </main>
  );
}
