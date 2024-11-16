import { ProfileForm } from "@/components/form/profile-form";
import { VStack } from "@/components/ui/vstack";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) return;

  return (
    <VStack className="gap-y-6 p-4 md:py-4 mx-auto">

      <h2 className="text-xl md:text-2xl text-center font-semibold">Meu Perfil</h2>

      <ProfileForm user={user} />
    </VStack>
  );
}
