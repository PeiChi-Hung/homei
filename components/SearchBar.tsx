"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Address } from "@prisma/client";
import { useOnClickOutside } from "@/app/hook/use-on-click-outside";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["search", input],
    queryFn: async () => {
      if (!input) return [];
      // console.log("fetching");
      const { data } = await axios.get(`/api/search?q=${encodeURI(input)}`);
      return data as Address[];
    },
    enabled: false,
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        // isLoading={isFetching}
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
        placeholder="Search Address..."
      />
      {input.length > 0 && (
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-white shadow">
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Address">
              {queryResults?.map((address) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/search/${encodeURI(e)}`);
                    router.refresh();
                  }}
                  key={address.id}
                  value={address.full_address}
                >
                  <a href={`/search/${address.address}`}>
                    {address.full_address}
                  </a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
