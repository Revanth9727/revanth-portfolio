import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revanth Gollapudi — AI Architect",
  description:
    "I build AI systems that run in production. RAG platforms, evaluation tools, model routing, enterprise AI deployments.",
  openGraph: {
    title: "Revanth Gollapudi — AI Architect",
    description: "I build AI systems that run in production.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><rect width=\"32\" height=\"32\" rx=\"6\" fill=\"#08080b\"/><text x=\"16\" y=\"22\" font-family=\"-apple-system,Inter,sans-serif\" font-size=\"17\" font-weight=\"700\" fill=\"#6366f1\" text-anchor=\"middle\">R</text></svg>`
          ),
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        {/* Read mode preference before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('mode');document.documentElement.dataset.mode=m||'recruiter';}catch(e){document.documentElement.dataset.mode='recruiter';}})();`,
          }}
        />
      </head>
      <body className="recruiter">{children}</body>
    </html>
  );
}
