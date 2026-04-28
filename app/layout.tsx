import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revanth Gollapudi — AI Architect / Senior GenAI Engineer",
  description:
    "AI Architect / Senior GenAI Engineer. Production GenAI systems, RAG, EvalOps, model routing, AWS + Azure.",
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0d1117"/><text x="16" y="22" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="16" font-weight="700" fill="#79b8ff" text-anchor="middle">RG</text></svg>`
          ),
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
