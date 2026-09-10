import { createSignal } from 'solid-js'
import { createFileRoute, useNavigate } from '@tanstack/solid-router'
import { createForm } from '@tanstack/solid-form'

import type { JSX } from 'solid-js/jsx-runtime'
import type { ValidationError } from '@tanstack/solid-form'

import { authClient } from '../lib/auth-client'

// import styleCss from '../styles/index.css?url'

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
})

function FieldWrapper(props: {
  children: JSX.Element
  errors: Array<ValidationError>
  label: string
}) {
  return (
    <div>
      <label
        for={props.label}
        class="mb-2 block text-sm font-semibold text-[var(--sea-ink)]"
      >
        {props.label}
      </label>

      {props.children}

      {props.errors.length ? (
        <div class="mt-1 text-sm font-semibold text-red-600">
          {props.errors.join(', ')}
        </div>
      ) : null}
    </div>
  )
}

function SignUpPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = createSignal('')

  const form = createForm(() => ({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },

    onSubmit: async ({ value }) => {
        console.log("TANSTACK ON SUBMIT FIRED")
  console.log("VALUES:", value)
      
        setServerError("")
      
        try {
          const result = await authClient.signUp.email({
            name: value.name,
            email: value.email,
            password: value.password,
            callbackURL: "/",
          })
      
          console.log("BETTER AUTH RESULT:", result)
      
          if (result.error) {
            setServerError(result.error.message ?? "Unable to create account.")
            return
          }
      
          await navigate({ to: "/" })
        } catch (error) {
          console.error("SIGN UP ERROR:", error)
          setServerError("Something went wrong during sign up.")
        }
      },
  }))

  return (
    <main class="demo-page demo-center">
      <section class="demo-panel w-full max-w-md">
        <div class="mb-6">
          <p class="island-kicker mb-2">Account</p>

          <h1 class="demo-title">
            Create an account
          </h1>

          <p class="demo-muted mt-2">
            Sign up with your email and password.
          </p>
        </div>

        <form
  onSubmit={(e) => {
    console.log("HTML FORM SUBMIT FIRED")

    e.preventDefault()
    e.stopPropagation()

    console.log("BEFORE HANDLE SUBMIT")

    form.handleSubmit()

    console.log("AFTER HANDLE SUBMIT")
  }}
  class="space-y-6"
>
          {/* Name */}
          <form.Field
            name="name"
            validators={{}}
            // validators={{
            //   onBlur: ({ value }) => {
            //     if (!value || value.trim().length === 0) {
            //       return 'Name is required'
            //     }

            //     if (value.trim().length < 2) {
            //       return 'Name must be at least 2 characters'
            //     }

            //     return undefined
            //   },
            // }}
            children={(field) => (
              <FieldWrapper
                label="Name"
                errors={field().state.meta.errors}
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onChange={(e) =>
                    field().handleChange(e.target.value)
                  }
                  class="demo-input"
                  autocomplete="name"
                />
              </FieldWrapper>
            )}
          />

          {/* Email */}
          <form.Field
            name="email"
            // validators={{
            //   onBlur: ({ value }) => {
            //     if (!value || value.trim().length === 0) {
            //       return 'Email is required'
            //     }

            //     if (
            //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
            //         value,
            //       )
            //     ) {
            //       return 'Invalid email address'
            //     }

            //     return undefined
            //   },
            // }}
            children={(field) => (
              <FieldWrapper
                label="Email Address"
                errors={field().state.meta.errors}
              >
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
              </FieldWrapper>
            )}
          />

          {/* Password */}
          <form.Field
            name="password"
            validators={{}}
            // validators={{
            //   onBlur: ({ value }) => {
            //     if (!value) {
            //       return 'Password is required'
            //     }

            //     if (value.length < 8) {
            //       return 'Password must be at least 8 characters'
            //     }

            //     return undefined
            //   },
            // }}
            children={(field) => (
              <FieldWrapper
                label="Password"
                errors={field().state.meta.errors}
              >
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
                  autocomplete="new-password"
                />
              </FieldWrapper>
            )}
          />

          {/* Better Auth server error */}
          {serverError() ? (
            <div class="text-sm font-semibold text-red-600">
              {serverError()}
            </div>
          ) : null}

          {/* Submit */}
          <div class="flex justify-end">
            <button
              type="submit"
              disabled={form.state.isSubmitting}
              class="demo-button"
            >
              {form.state.isSubmitting
                ? 'Creating account...'
                : 'Create account'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}