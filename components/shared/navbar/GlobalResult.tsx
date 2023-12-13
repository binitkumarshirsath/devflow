import { Frown, Loader, Tag } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GlobarFilter from "./GlobarFilter";
import { getGlobalResults } from "@/lib/actions/general.action";
import Link from "next/link";

interface ResultItem {
  title: string;
  type: string;
  id: string;
}

const GlobalResult = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const global = searchParams.get("global");
  const [result, setResult] = useState<ResultItem[]>([]);

  // effect to call api
  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);

      try {
        const data = await getGlobalResults({
          query: global,
          type,
        });
        setResult(data || []);
      } catch (error) {
        console.error("Error while fetching global results", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [global, type]);

  return (
    <div className="background-light800_dark400 absolute top-full mt-3 flex w-full flex-col rounded-md p-5">
      <GlobarFilter />
      <div className=" flex w-full flex-col  justify-start">
        <div className="start-0 mt-4">Top Results</div>
        {loading ? (
          <div className="flex-center  w-full flex-col">
            <Loader className="mt-4 h-12 w-12 animate-spin text-primary-500" />
            <p>Searching in whole database</p>
          </div>
        ) : (
          <div>
            {result.length === 0 ? (
              <div className="flex w-full flex-col">
                <div className="mx-auto">No Results found</div>
                <div className="mx-auto">
                  <Frown className="h-14 text-primary-500" size={40} />
                </div>
              </div>
            ) : (
              result.map((item, index) => {
                const type =
                  item.type === "tag"
                    ? "tags"
                    : item.type === "user"
                      ? "profile"
                      : "question";
                return (
                  <Link
                    href={"/" + type + "/" + item.id}
                    key={index}
                    className="flex items-center gap-3 py-4 text-xs"
                  >
                    <div>
                      <Tag />
                    </div>
                    <div className="flex flex-col ">
                      <p>{item.title}</p>
                      <p>{item.type}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
