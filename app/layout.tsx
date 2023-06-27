import SearchInput from "./SearchInput";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HOMEI",
  description: "The web page of HOMEI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-900 text-zinc-200`}>
        <div className="flex flex-col items-center gap-10 p-6">
          <SearchInput />
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
