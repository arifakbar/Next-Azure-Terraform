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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { supportedLocations } from "@/utils";
import { extractErrorCode } from "@/lib/extractCodeFromError";

const formSchema = z.object({
  resourceName: z
    .string()
    .min(3, "Name is required")
    .max(24, "Name cannot be more than 24 characters long")
    .regex(
      /^[a-z0-9]+$/,
      "Name can only include lowercase letters and numbers"
    ),
  location: z.string().min(2, "Location is required"),
  rgName: z.string().min(2, "Resource Group is required"),
  saTier: z.string().min(2, "Account Tier is required"),
  saRepli: z.string().min(2, "Replication Type is required"),
});

export default function StorageAccountForm({ type, sid }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resourceName: "",
      location: "",
      rgName: "rg-01",
      saTier: "Standard",
      saRepli: "LRS",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    const newValues = { ...values, type, subscriptionId: sid };
    // console.log(newValues);
    try {
      setLoading(true);
      const res = await axios.post("/api/resource", newValues);
      console.log("DATA: ", res.data);
      if (res.data.error) {
        const resError = extractErrorCode(`${res.data.error.stderr}`);
        if (resError === "StorageAccountAlreadyTaken")
          toast({
            variant: "destructive",
            title: "Storage Account Already Taken",
            description: "Name is already present in Azure.",
          });
        // console.log(extractErrorCode(`${res.data.error.stderr}`));
        setLoading(false);
        return;
      }
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
        Storage Account
      </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="resourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage Account Name</FormLabel>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedLocations.map((l) => (
                          <SelectItem key={l.code} value={l.code}>
                            {l.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Group</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter the Resource Group Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="saTier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Tier</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="saRepli"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Replication Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="LRS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LRS">LRS</SelectItem>
                        <SelectItem value="ZRS">ZRS</SelectItem>
                        <SelectItem value="GRS">GRS</SelectItem>
                        <SelectItem value="RAGRS">RAGRS</SelectItem>
                        <SelectItem value="GZRS">GZRS</SelectItem>
                        <SelectItem value="RAGZRS">RAGZRS</SelectItem>
                      </SelectContent>
                    </Select>
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
