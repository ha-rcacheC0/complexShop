import { createFileRoute } from "@tanstack/solid-router";
import { auth } from "../../../lib/auth";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return await auth.handler(request);
      },

      POST: async ({ request }) => {
        return await auth.handler(request);
      },
    },
  },
});