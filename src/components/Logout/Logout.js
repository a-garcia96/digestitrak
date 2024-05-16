import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/router";

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/");
    }
  }

  return (
    <button
      className="px-4 py-2 hover:bg-red-300 w-full text-sm text-gray-500 hover:text-red-500 text-left"
      onClick={signOut}
    >
      Logout
    </button>
  );
}
