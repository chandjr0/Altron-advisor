// Shared Vite + TanStack Start config (plugins, path alias, Nitro target).
// Do not re-add those plugins manually or the build will hit duplicates.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
});
