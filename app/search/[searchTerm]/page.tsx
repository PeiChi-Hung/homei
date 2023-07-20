import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = { params: { searchTerm: string } };

const page = async ({ params: { searchTerm } }: Props) => {
  const displayTerm = decodeURI(searchTerm);

  const price = await db.sample_address.findFirst({
    where: { address: displayTerm },
  });

  if (!price) return notFound();

  return (
    <div className="text-center">
      <h1>
        Address: {displayTerm}, {price?.suburb}, {price?.state}
      </h1>
      <h1>Price: {price?.sold_price}</h1>
    </div>
  );
};

export default page;
