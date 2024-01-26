"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { LoadingSpinner } from "../loading-spinner";

const formSchema = z.object({
  resourceName: z.string().min(2, "Name is required"),
  location: z.string().min(2, "Location is required"),
});

export default function ResourceGroupForm({ type, sid }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resourceName: "",
      location: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    const newValues = { ...values, type, subscriptionId: sid };
    try {
      setLoading(true);
      const res = await axios.post("/api/resource", newValues);
      console.log(res.data);
      setLoading(false);
      toast({ description: res.data.msg });
      form.reset();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex flex-col gap-3 items-center">
      <p>Resource creation in progress...</p>
      <LoadingSpinner />
    </div>
  ) : (
    <div className="p-4 border-2 border-gray-200 shadow-md rounded-md w-[40%]">
      <h4 className="text-xl text-center font-bold mb-3 underline">
        Resource Group
      </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="resourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Group Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter the resource group name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter the location"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button disabled={isLoading}>Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

/*
  // Your React component or page

import { useState } from "react";
import axios from "axios";

export default function YourComponent() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const runTerraform = async () => {
    try {
      const response = await axios.post("/api/terraform");
      setResults(response.data);
    } catch (error) {
      console.error("Error in API request:", error.message);
      setError("Failed to execute Terraform.");
    }
  };

  // Function to format multiline strings into arrays of lines
  const formatMultilineString = (multilineString) => {
    return multilineString.trim().split("\n");
  };

  return (
    <div>
      <button onClick={runTerraform}>Run Terraform</button>
      {results && (
        <div>
          <h2>Results:</h2>
          <div>
            <h3>Initialization:</h3>
            <ul>
              {formatMultilineString(results.init).map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Plan:</h3>
            <p>{formatMultilineString(results.plan).join(" ")}</p>
          </div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

*/
