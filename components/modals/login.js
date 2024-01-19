import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { LoadingSpinner } from "../loading-spinner";

export default function LoginModal({ title }) {
  const [loading, setLoading] = useState(false);

  const handleGitHUBLogin = async () => {
    try {
      setLoading(true);
      await signIn("github");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm font-semibold hover:text-red-500 transition-all">
        {title === "signIn" ? (
          "Sign In"
        ) : (
          <p className="text-md text-red-500 cursor-pointer">Register</p>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to your Account and start working.</DialogTitle>
        </DialogHeader>
        <Separator className="bg-gray-300 w-full h-[2px]" />
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner className="h-5 w-5" />
          </div>
        ) : (
          <>
            <Button onClick={handleGitHUBLogin}>Continue with Github</Button>
            <Button variant="destructive">Continue with Google</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
