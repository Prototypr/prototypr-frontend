"use server";

// import { redirect } from "next/navigation";
// import useSWR from "swr";
// import axios from "axios";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/iron-session/session";
import { cookies } from "next/headers";

export async function navigate(slug) {
  redirect(slug);
}

// This function acts like a hook but is meant to be used in server components.
export async function fetchUser() {
  //   const cookieStore = cookies();
  //   const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Fetch the user
  //   const { data: userData, error: userError } = await supabase.auth.getUser();
  //   const { data: user, mutate: mutateUser, isValidating:isLoading } = useSWR('/api/auth/user')

  //fetch the user from /api/auth/user with axios
  // const { data: user, error: userError } = await axios.post('/api/auth/user')
  // Fetch the profile
  // const { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const session = await getIronSession(cookies(), sessionOptions);


  // console.log(user)
  // Return both user and profile data
  return {
    user: session?.user?.login?.user,
    error: null,
  };
}
