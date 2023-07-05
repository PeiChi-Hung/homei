import SearchBar from "../components/SearchBar";
import "./globals.css";
import { Inter } from "next/font/google";
import QueryWrapper from "@/lib/QueryWrapper";

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
        <QueryWrapper>
          <div className="flex flex-col items-center gap-10 p-6">
            <SearchBar />
            <div>{children}</div>
          </div>
        </QueryWrapper>
      </body>
    </html>
  );
}
