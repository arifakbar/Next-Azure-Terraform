"use client";

import ResourceGroupForm from "@/components/forms/resource-group";
import { useSelector } from "react-redux";

export default function ({ params }) {
  const { type } = params;
  const sid = useSelector((state) => state.sub.sid);

  const RenderForm = () => {
<<<<<<< HEAD
    if (type === "resourceGroup")
      return <ResourceGroupForm type={type} sid={sid} />;
=======
    if (type === "resourceGroup") return <ResourceGroupForm />;
>>>>>>> e9aca0c750f3a6c14b70edb8c1e866447685b554
  };

  return (
    <div className="flex w-full h-[calc(100vh-60px)] items-center justify-center">
      <RenderForm />
    </div>
  );
}
