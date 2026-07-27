import { useEffect, useState } from 'react';

import { ApiClient } from '@repo/api-client';
import type { HealthResponse } from '@repo/shared-types';
import { Button } from '@repo/ui';

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim() || '/api';
const api = new ApiClient(apiBaseUrl);

export function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkApi = async () => {
    setError(null);

    try {
      setHealth(await api.health());
    } catch (requestError) {
      setHealth(null);
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'The API is not available. Start it with pnpm dev.'
      );
    }
  };

  useEffect(() => {
    void checkApi();
  }, []);

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
          <span className={health ? 'dot dot--online' : 'dot'} />
          {health ? `API status: ${health.status}` : (error ?? 'Checking API…')}
        </div>
        <Button onClick={() => void checkApi()}>Check API</Button>
      </section>
    </main>
  );
}
