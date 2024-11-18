import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Início",
};

export default async function Home() {
  const user = await currentUser();
  return (
    <div>
      Hello {user?.name}
      

   
    </div>
  )
}
