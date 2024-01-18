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

export default function NewSubscriptionModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Add New <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Subscription</DialogTitle>
          <DialogDescription>Subscription Info.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
