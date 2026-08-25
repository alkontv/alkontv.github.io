import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Алиасы дублируют tsconfig: vitest их оттуда не читает, а контент-модуль
  // импортирует типы через @i18n.
  resolve: {
    alias: {
      "@i18n": fileURLToPath(new URL("./app/i18n", import.meta.url)),
      "@content": fileURLToPath(new URL("./app/content", import.meta.url)),
      "@stores": fileURLToPath(new URL("./app/stores", import.meta.url)),
      "@constants": fileURLToPath(new URL("./app/constants", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["app/**/*.test.ts", "app/**/*.test.tsx"],
  },
});
