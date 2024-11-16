"use client";

import { profileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button";
import { profile } from "@/actions/profile";
import { toast } from "sonner";
import { ExtendedUser } from "@/types/next-auth";
import { FormToggle } from "@/components/auth/form-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

import { LogoutButton } from "../ui/logout-button";
import { signOut } from "@/auth";

type ProfileFormProps = {
  user: ExtendedUser;
};

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    values: {
      name: user.name || undefined,
      email: user.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || undefined,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      profile(values).then((data) => {
        if (data.success) {
          form.reset();
          return toast.success(data.message);
        }
        return toast.error(data.error.message);
      });
    });
  });

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex items-center justify-center">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>
            <UserRound size={128} />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className=" max-w-md ">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormInput
                control={form.control}
                name="name"
                label="Nome"
                type="text"
                placeholder="e.g. John Doe"
                isPending={isPending}
              />
              {!user.isOAuth && (
                <>
                  <FormInput
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="e.g. johndoe@example.com"
                    isPending={isPending}
                    disabled={user.isOAuth}
                  />
                  {/* <FormInput
                    control={form.control}
                    name="password"
                    label="Senha Antiga"
                    type="password"
                    placeholder="******"
                    autoComplete="off"
                    isPending={isPending}
                  />
                  <FormInput
                    control={form.control}
                    name="newPassword"
                    label="Nova Senha"
                    type="password"
                    placeholder="******"
                    autoComplete="off"
                    isPending={isPending}
                  /> */}
                  <FormToggle
                    control={form.control}
                    name="isTwoFactorEnabled"
                    label="Autenticação de Dois Fatores"
                    description="Proteja sua conta com segurança adicional habilitando a autenticação de dois fatores para login. Você será solicitado a inserir suas credenciais e um código de autenticação para fazer login."
                    isPending={isPending}
                  />
                </>
              )}
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              Atualizar perfil
            </Button>



          </form>
        </Form>
      </div>
      
    </div>
  );
};
