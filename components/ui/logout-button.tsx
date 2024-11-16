"use server"
import { signOut } from "@/auth";
import { Button } from "./button";


export const LogoutButton = () => {

  return (
    <form
      action={async () => {
        
        await signOut();
      }}
    >

      <Button type="submit" variant={'destructive'} className="w-full flex ">
        Sair
      </Button>

    </form>
  )

}