import { createQuery, useQueryClient } from '@tanstack/solid-query'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'

import { authClient } from '../../lib/auth-client'

async function getSession() {
  const response = await fetch('/api/auth/get-session', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to get session')
  }

  return response.json()
}

export default function AppTanstackQueryHeaderUser() {
  const queryClient = useQueryClient()

  const sessionQuery = createQuery(() => ({
    queryKey: ['session'],
    queryFn: getSession,
  }))

  async function handleSignOut() {
    const result = await authClient.signOut()

    if (!result.error) {
      queryClient.setQueryData(['session'], null)
    }
  }

  return (
    <>
      <div class="flex items-center gap-2">
        {sessionQuery.isPending ? (
          <span class="text-sm text-[var(--sea-ink-soft)]">
            Loading...
          </span>
        ) : sessionQuery.error ? (
          <span class="text-sm text-[var(--sea-ink-soft)]">
            Unable to verify account
          </span>
        ) : sessionQuery.data?.user ? (
          <>
            <span class="text-sm font-semibold text-[var(--sea-ink)]">
              Welcome, {sessionQuery.data.user.name}
            </span>

            <button
              type="button"
              onClick={handleSignOut}
              class="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <a
              href="/sign-in"
              class="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
            >
              Sign In
            </a>

            <a
              href="/sign-up"
              class="rounded-full bg-[var(--sea-ink)] px-4 py-2 text-sm font-semibold text-white no-underline transition hover:-translate-y-0.5"
            >
              Sign Up
            </a>
          </>
        )}
      </div>

      <SolidQueryDevtools buttonPosition="bottom-right" />
    </>
  )
}

