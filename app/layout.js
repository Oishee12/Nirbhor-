import "./globals.css";

export const metadata = {
  title: "Nirbhor — Verified Trust Portal",
  description: "Verified local service marketplace frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}