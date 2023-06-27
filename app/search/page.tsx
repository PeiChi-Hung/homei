"use client";
import { Address } from "@prisma/client";
import { useSearchParams } from "next/navigation";

import useSWR from "swr";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR<{ posts: Array<Address> }>(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts
  );

  if (!data?.posts) {
    return null;
  }

  console.log("HERE is data", data);

  return (
    <>
      <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>

      <div className="pt-10">
        {data.posts.map((post) => (
          <div key={post.id}>
            <p>Address: {post.address}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
