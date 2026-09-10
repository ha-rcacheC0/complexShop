import { createSignal } from 'solid-js'
import { createFileRoute, useNavigate } from '@tanstack/solid-router'
import { createForm } from '@tanstack/solid-form'

import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = createSignal('')

  const form = createForm(() => ({
    defaultValues: {
      email: '',
      password: '',
    },

    onSubmit: async ({ value }) => {
      console.log('TANSTACK ON SUBMIT FIRED')
      console.log('VALUES:', value)

      setServerError('')

      try {
        const result = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: '/',
        })

        console.log('BETTER AUTH RESULT:', result)

        if (result.error) {
          setServerError(
            result.error.message ?? 'Unable to sign in.',
          )
          return
        }

        await navigate({ to: '/' })
      } catch (error) {
        console.error('SIGN IN ERROR:', error)
        setServerError('Something went wrong during sign in.')
      }
    },
  }))

  return (
    <main class="demo-page demo-center">
      <section class="demo-panel w-full max-w-md">
        <div class="mb-6">
          <p class="island-kicker mb-2">Account</p>

          <h1 class="demo-title">
            Sign in
          </h1>

          <p class="demo-muted mt-2">
            Sign in with your email and password.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            console.log('HTML FORM SUBMIT FIRED')

            e.preventDefault()
            e.stopPropagation()

            console.log('BEFORE HANDLE SUBMIT')

            form.handleSubmit()

            console.log('AFTER HANDLE SUBMIT')
          }}
          class="space-y-6"
        >
          <form.Field
            name="email"
            children={(field) => (
              <div>
                <label
                  for="email"
                  class="mb-2 block text-sm font-semibold text-[var(--sea-ink)]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onChange={(e) =>
                    field().handleChange(e.target.value)
                  }
                  class="demo-input"
                  autocomplete="email"
                />
              </div>
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <div>
                <label
                  for="password"
                  class="mb-2 block text-sm font-semibold text-[var(--sea-ink)]"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onChange={(e) =>
                    field().handleChange(e.target.value)
                  }
                  class="demo-input"
                  autocomplete="current-password"
                />
              </div>
            )}
          />

          {serverError() ? (
            <div class="text-sm font-semibold text-red-600">
              {serverError()}
            </div>
          ) : null}

          <div class="flex justify-end">
            <button
              type="submit"
              disabled={form.state.isSubmitting}
              class="demo-button"
            >
              {form.state.isSubmitting
                ? 'Signing in...'
                : 'Sign in'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
