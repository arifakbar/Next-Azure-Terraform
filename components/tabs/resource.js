"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import camelCaseToCapitalizeWithSpace from "@/lib/camelCaseToCapital";

export default function ResourceTabs({ resourcesArray }) {
  return (
    <Tabs defaultValue={resourcesArray[0].type} className="w-full">
      <TabsList>
        {resourcesArray.map((r, i) => (
          <TabsTrigger value={r.type} key={i}>
            {camelCaseToCapitalizeWithSpace(r.type)}
          </TabsTrigger>
        ))}
      </TabsList>
      {resourcesArray.map((r) => {
        return r.names.map((n, j) => (
          <TabsContent value={r.type} key={j}>
            {n}
          </TabsContent>
        ));
      })}
    </Tabs>
  );
}
