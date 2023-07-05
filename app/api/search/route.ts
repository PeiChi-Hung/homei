import { prisma } from "../../../prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (!q) return new Response("Invalid query", { status: 400 });
  const results = await prisma.address.findMany({
    where: {
      full_address: { contains: q, mode: "insensitive" },
    },
  });
  return new Response(JSON.stringify(results));
}
