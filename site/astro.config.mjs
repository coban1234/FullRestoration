import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL || "https://www.stonecroft.ca",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({ filter: (page) => !page.includes("/book/thank-you/") }),
  ],
});
