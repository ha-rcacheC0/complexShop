import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

export const queryClient = new QueryClient()

export function getContext() {
  return {
    queryClient,
  }
}

export function TanStackQueryProvider(props: {
  children: any
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}
