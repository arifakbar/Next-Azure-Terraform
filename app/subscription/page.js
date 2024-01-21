"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import ResourceTabs from "@/components/tabs/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Subscription() {
  const [subscription, setSubscription] = useState({});
  const [loading, setLoading] = useState(false);

  const resources = [
    {
      type: "resourceGroup",
      name: "RG-01",
      content: {},
    },
    {
      type: "resourceGroup",
      name: "RG-02",
      content: {},
    },
    {
      type: "virtualMachine",
      name: "VM01",
      content: {},
    },
    {
      type: "virtualMachine",
      name: "VM02",
      content: {},
    },
    {
      type: "storageAccount",
      name: "SA01",
      content: {},
    },
  ];

  const resourcesByTypes = {};
  resources.forEach((r) => {
    if (resourcesByTypes.hasOwnProperty(r.type)) {
      resourcesByTypes[r.type].push(r.name);
    } else {
      resourcesByTypes[r.type] = [r.name];
    }
  });
  const resourcesArray = Object.keys(resourcesByTypes).map((type) => ({
    type,
    names: resourcesByTypes[type],
  }));

  const sid = useSelector((state) => state.sub.sid);

  useEffect(() => {
    loadSub();
  }, [sid]);

  const loadSub = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/subscription/${sid}`);
      setSubscription(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="p-6 w-full h-[calc(100vh-60px)]">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold">
              Subscription: {subscription?.subscriptionName}
            </p>
            <p className="text-sm text-gray-500 font-semibold">
              Id: {subscription?.subscriptionId}
            </p>
          </div>
          <div className="flex items-center justify-between w-full">
            <Input placeholder="Search..." className="w-[350px]" />
            <Button>Create New</Button>
          </div>
          <Separator />
          <ResourceTabs resourcesArray={resourcesArray} />
        </div>
      )}
    </div>
  );
}
