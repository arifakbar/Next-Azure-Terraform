"use client";

import { useSelector } from "react-redux";

export default function Home() {
  const sid = useSelector((state) => state.sub.sid);
  console.log(sid);
  return <div className="min-h-[calc(100vh-60px)]">Home</div>;
}
