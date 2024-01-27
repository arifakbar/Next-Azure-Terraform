"use client";

import ResourceGroupForm from "@/components/forms/resource-group";
import StorageAccountForm from "@/components/forms/storage-account";
import { useSelector } from "react-redux";

export default function ({ params }) {
  const { type } = params;
  const sid = useSelector((state) => state.sub.sid);

  const RenderForm = () => {
    if (type === "resourceGroup")
      return <ResourceGroupForm type={type} sid={sid} />;
    else if (type === "storageAccount")
      return <StorageAccountForm type={type} sid={sid} />;
  };

  return (
    <div className="flex w-full h-[calc(100vh-60px)] items-center justify-center">
      <RenderForm />
    </div>
  );
}
