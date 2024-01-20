import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import SubscriptionForm from "../forms/subscription";

export default function NewSubscriptionModal({ loadUser }) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center gap-1 shadow-md bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 py-2 px-3 rounded-md text-sm">
        Add New <Plus size={16} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Subscription</DialogTitle>
          <DialogDescription>
            A logical container used to provision related business or technical
            resources in Azure.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <SubscriptionForm loadUser={loadUser} />
      </DialogContent>
    </Dialog>
  );
}
