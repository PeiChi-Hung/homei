import { prisma } from "../../../prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    console.log(query);

    if (typeof query != "string") {
      return new Response("Invalid Response");
    }

    const posts = await prisma.address.findMany({
      where: {
        OR: [
          { address: { contains: query, mode: "insensitive" } },
          { suburb: { contains: query, mode: "insensitive" } },
          { state: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    return new Response(JSON.stringify({ posts }), { status: 200 });
  } catch (error) {}

  return new Response(null, { status: 200 });
}
