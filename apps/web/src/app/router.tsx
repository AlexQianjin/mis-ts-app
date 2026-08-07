import { createRootRoute, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router';

import { LoginPage } from '../features/auth';
import { authClient } from '../lib/auth';
import { App } from './App';

const rootRoute = createRootRoute({
  component: Outlet
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (!session) {
      throw redirect({ to: '/login' });
    }
  },
  component: App
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
