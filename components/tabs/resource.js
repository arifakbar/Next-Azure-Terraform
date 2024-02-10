"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import camelCaseToCapitalizeWithSpace from "@/lib/camelCaseToCapital";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResourceTabs({ resources }) {
  const router = useRouter();
  const resourcesByTypes = {};
  resources.forEach((r) => {
    if (resourcesByTypes.hasOwnProperty(r.type)) {
      resourcesByTypes[r.type].push({ id: r.id, name: r.name });
    } else {
      resourcesByTypes[r.type] = [{ id: r.id, name: r.name }];
    }
  });
  const resourcesArray = Object.keys(resourcesByTypes).map((type) => ({
    type,
    info: resourcesByTypes[type],
  }));
  const l = resourcesArray.length;

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex flex-wrap h-auto justify-start">
        <TabsTrigger value="all">All Resources</TabsTrigger>
        {resourcesArray.map((r, i) => (
          <TabsTrigger
            value={r.type}
            key={i}
            className={`md:w-[calc(100vw/${l})]`}
          >
            {camelCaseToCapitalizeWithSpace(r.type)}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-2 h-[60vh] overflow-auto w-full">
        <TabsContent value="all">
          {resources.map((r) => {
            return (
              <div
                key={r._id}
                className="w-full flex items-center justify-between gap-3"
                onClick={() => router.push(`/resource/${r._id}`)}
              >
                <p className="w-full shadow-md p-2 rounded-md my-2 cursor-pointer border-2 text-sm font-semibold text-gray-500">
                  {r.name}
                </p>
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-green-500">
                  <Edit2 size={22} />
                </button>
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-red-500">
                  <Trash2 size={22} />
                </button>
              </div>
            );
          })}
        </TabsContent>
        {resourcesArray.map((r) => {
          return r.info.map((n, j) => (
            <TabsContent value={r.type} key={j}>
              <div
                className="w-full flex items-center justify-between gap-3"
                onClick={() => router.push(`/resource/${n.id}`)}
              >
                <p className="w-full shadow-md p-2 rounded-md my-1 cursor-pointer border-2 text-sm font-semibold text-gray-500">
                  {n.name}
                </p>
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-green-500">
                  <Edit2 size={22} />
                </button>
                <button className="shadow-md p-2 rounded-md cursor-pointer border-2 text-sm font-semibold text-red-500">
                  <Trash2 size={22} />
                </button>
              </div>
            </TabsContent>
          ));
        })}
      </div>
    </Tabs>
  );
}
