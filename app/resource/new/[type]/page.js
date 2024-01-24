"use client";

import ResourceGroupForm from "@/components/forms/resource-group";
import { useSelector } from "react-redux";

export default function ({ params }) {
  const { type } = params;
  const sid = useSelector((state) => state.sub.sid);

  const RenderForm = () => {
    if (type === "resourceGroup") return <ResourceGroupForm />;
  };

  return (
    <div className="flex w-full h-[calc(100vh-60px)] items-center justify-center">
      <RenderForm />
    </div>
  );
}
