import { useState, useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { createClient } from "@/utils/supabase/component";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const supabase = createClient();

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      router.push("/error");
    } else {
      router.push("/dashboard");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn();
  };

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();

      if (data) {
        router.push("/dashboard");
      }
    }

    getSession();
  }, []);

  return (
    <>
      <Head>
        <title>Login | Digestitrak | Gerd Symptom Tracker</title>
        <meta
          name="description"
          content="Welcome to Digestitrak, your personalized tool for tracking meals and symptoms related to GERD. Log in now to start monitoring your dietary intake and symptoms, gaining valuable insights to optimize your gut health and manage your condition effectively."
        />
      </Head>
      <main className="md:grid md:grid-cols-2">
        <section className="md:col-span-1 bg-white h-screen px-10 flex items-center justify-center">
          <div className="space-y-4">
            <h1 className="text-6xl text-center font-bold">
              Login to <span className="text-evening-sea-500">Digestitrak</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-evening-sea-700 sm:text-sm sm:leading-6"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-evening-sea-700 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <Link
                    href="/forgot-password"
                    className="text-xs mt-2 text-right text-evening-sea-500 italic hover:cursor-pointer"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <button className="text-base uppercase bg-evening-sea-500 text-evening-sea-50 font-bold w-full py-3 px-2 rounded hover:bg-evening-sea-400">
                login
              </button>
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-evening-sea-400 font-bold underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </section>
        <section className="hidden md:block md:col-span-1">
          <Image
            src="https://images.pexels.com/photos/6740517/pexels-photo-6740517.jpeg?auto=compress&cs=tinysrgb&w=800"
            height={1080}
            width={1920}
            className="object-cover h-screen"
          />
        </section>
      </main>
    </>
  );
}
