"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { LucideEdit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "@/components/loading-spinner";
import NewSubscriptionModal from "@/components/modals/new-subscription";
import WelcomePage from "@/components/welcomePage";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user");
      setUser(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-60px)]">
      {user?.email ? (
        <>
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSpinner className="w-8 h-8" />
            </div>
          ) : (
            <div className="flex flex-col p-6 gap-3">
              <h1 className="text-3xl font-semibold underline">
                Hello {user?.name},
              </h1>
              <div className="w-full flex items-end justify-between">
                <p className="text-md font-semibold">Your Subscriptions</p>
                <NewSubscriptionModal title="sign_in" />
              </div>
              <Separator className="h-[1px] w-full bg-gray-400" />
              <div className="flex flex-col gap-3 w-full overflow-y-auto h-[70vh] p-2">
                {user?.subscriptions.length > 0 ? (
                  user?.subscriptions.map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-[98%] cursor-pointer rounded-md shadow-md border-2 border-gray-500 p-3 flex items-center justify-between hover:bg-gray-200 transition-all">
                        <p className="text-sm font-semibold">{s}</p>
                      </div>
                      <div className="cursor-pointer rounded-md shadow-md border-2 border-gray-500 p-3 flex items-center justify-between hover:bg-gray-200 transition-all">
                        <LucideEdit size={18} color="green" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-semibold text-gray-500">
                    You currently do not have any subscription. Create to start
                    working.
                  </p>
                )}
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
