import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'

import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'

import Header from '../components/Header'
import { TanStackQueryProvider } from '../integrations/tanstack-query/provider'

import styleCss from '../styles/index.css?url'

export const Route = createRootRouteWithContext()({
  notFoundComponent: () => (
    <div class="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 class="text-3xl font-bold text-[var(--sea-ink)]">
        Page Not Found
      </h1>
  
      <p class="mt-3 text-[var(--sea-ink-soft)]">
        The page you requested does not exist.
      </p>
    </div>
  ),
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'complexShop',
      },
    ],
    links: [{ rel: 'stylesheet', href: styleCss }],
  }),
  shellComponent: RootComponent,
})

function RootComponent() {
  return (
    <html lang='en-US'>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <TanStackQueryProvider>
        <Suspense>
          <Header />
          <Outlet />
          <TanStackRouterDevtools />
        </Suspense>
        </TanStackQueryProvider>

        <Scripts />
      </body>
    </html>
  )
}
