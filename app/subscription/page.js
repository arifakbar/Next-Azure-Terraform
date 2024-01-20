"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Subscription() {
  const [subscription, setSubscription] = useState({});
  const [loading, setLoading] = useState(false);

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

  return <div>Sub - {subscription?.subscriptionName}</div>;
}
