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

const formSchema = z.object({
  subscriptionName: z.string().min(2, "Name is required"),
  subscriptionId: z.string().min(2, "Subscription ID is required"),
  tenantId: z.string().min(2, "Tenant ID is required"),
  clientId: z.string().min(2, "Client ID is required"),
  clientSecret: z.string().min(2, "Client Secret is required"),
});

export default function ResourceGroupForm({ loadUser }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resourceName: "",
      location: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (values) => {};

  return (
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
                      disabled={loading}
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
                      disabled={loading}
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
            <Button disabled={loading}>Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
