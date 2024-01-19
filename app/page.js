"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { LucideEdit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import NewSubscriptionModal from "@/components/modals/new-subscription";
import WelcomePage from "@/components/welcomePage";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const subscriptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
  const { data: session } = useSession();

  return (
    <div className="h-[calc(100vh-60px)]">
      {session?.user?.id ? (
        <>
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSpinner className="w-8 h-8" />
            </div>
          ) : (
            <div className="flex flex-col p-6 gap-3">
              <h1 className="text-3xl font-semibold underline">
                Hello {session?.user?.name},
              </h1>
              <div className="w-full flex items-end justify-between">
                <p className="text-md font-semibold">Your Subscriptions</p>
                <NewSubscriptionModal title="sign_in" />
              </div>
              <Separator className="h-[1px] w-full bg-gray-400" />
              <div className="flex flex-col gap-3 w-full overflow-y-auto h-[70vh] p-2">
                {subscriptions.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-[98%] cursor-pointer rounded-md shadow-md border-2 border-gray-500 p-3 flex items-center justify-between hover:bg-gray-200 transition-all">
                      <p className="text-sm font-semibold">{s}</p>
                    </div>
                    <div className="cursor-pointer rounded-md shadow-md border-2 border-gray-500 p-3 flex items-center justify-between hover:bg-gray-200 transition-all">
                      <LucideEdit size={18} color="green" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <WelcomePage />
      )}
    </div>
  );
}
