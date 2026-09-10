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
