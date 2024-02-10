"use client";

import { LoadingSpinner } from "@/components/loading-spinner";
import camelCaseToCapitalizeWithSpace from "@/lib/camelCaseToCapital";
import returnDetails from "@/lib/returnDetails";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Resource({ params }) {
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [resource, setResource] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    loadResource();
  }, [id]);

  const loadResource = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/resource/single/${id}`);
      // console.log(res.data.data);
      setResource(res.data.data);
      const response = await axios.get(`/api/file/${res.data.data.name}`);
      console.log(response);
      if (response.data.status === 200) {
        setContent(response.data.content);
      } else {
        throw new Error("Failed to fetch");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-60px)] w-full">
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="flex gap-3 p-4">
          <div className="flex flex-col gap-3 w-[50%]">
            <h4 className="text-xl font-bold underline">
              {resource.type && camelCaseToCapitalizeWithSpace(resource.type)}
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="font-semibold">Name</p>: <p>{resource?.name}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Subscription</p>:{" "}
                <p>{resource?.subscriptionId?.subscriptionName}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Subscription ID</p>:{" "}
                <p>{resource?.subscriptionId?.subscriptionId}</p>
              </div>
              {resource.details && returnDetails(resource.details)}
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <h4 className="text-xl font-bold underline">Terraform Code:</h4>
            <pre className="shadow-md px-8 py-3 rounded-md border-2">
              {content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
