import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/Layout/Layout";
import AccountLayout from "@/components/AccountLayout/AccountLayout";

import { createClient } from "@/utils/supabase/server-props";

import { createClient as createComponentClient } from "@/utils/supabase/component";

import { useRouter } from "next/router";
import Card from "@/components/Card/Card";

export async function getServerSideProps(context) {
  const supabase = createClient(context);
  const token = context.query.token;
  const email = context.query.email;

  console.log(token, email);

  if (!token) {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const { data: userData } = await supabase
      .from("user_data")
      .select("*")
      .eq("id", data.user.id);

    return {
      props: {
        user: data.user,
        userData: userData[0],
      },
    };
  }

  const { data: otpData } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "recovery",
  });

  console.log(otpData);

  const { data: userData } = await supabase
    .from("user_data")
    .select("*")
    .eq("id", otpData.user.id);

  return {
    props: {
      user: otpData.user,
      userData: userData[0],
    },
  };
}

export default function Page({ user, userData }) {
  const supabase = createComponentClient();
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTypeText, setIsTypeText] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (confirmedPassword.length >= 6 && password.length >= 6) {
      if (password == confirmedPassword) {
        setButtonIsDisabled(false);
        setShowError(false);
      } else {
        setButtonIsDisabled(true);
        setErrorMessage(
          "Passwords do not match. Please verify that they are the same."
        );
        setShowError(true);
      }
    } else {
      setErrorMessage("Password must be 6 characters or more.");
      setShowError(true);
    }
  }, [confirmedPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.updateUser({
      password: confirmedPassword,
    });

    if (data) {
      router.push("/my-profile");
    } else {
      setErrorMessage(error);
      setShowError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Account Management | Password Change</title>
      </Head>
      <Layout user={user} userData={userData}>
        <Card>
          <section className="lg:grid lg:grid-cols-3 lg:gap-5">
            <aside className="col-span-2">
              <h1 className="font-bold text-2xl text-evening-sea-500">
                Update Your Password
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      type={isTypeText ? "text" : "password"}
                      name="password"
                      id="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-evening-sea-600 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm New Password
                  </label>
                  <div className="mt-2">
                    <input
                      type={isTypeText ? "text" : "password"}
                      name="password"
                      id="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-evening-sea-600 sm:text-sm sm:leading-6"
                      value={confirmedPassword}
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                  </div>
                  {showError && (
                    <>
                      <p className="text-xs text-red-500 bg-red-100 rounded mt-2 px-2 py-1">
                        {errorMessage}
                      </p>
                      <div className="mt-2 flex justify-end">
                        <input
                          type="checkbox"
                          onChange={(e) => setIsTypeText(e.target.checked)}
                        />
                        <label className="ml-2 text-xs italic">
                          Show password
                        </label>
                      </div>
                    </>
                  )}
                  <div className="flex gap-x-2 items-center mt-2">
                    <Link
                      href="/my-profile"
                      className="bg-yellow-100 block w-fit p-2 rounded text-yellow-800 font-bold hover:bg-yellow-200"
                    >
                      Cancel
                    </Link>
                    <button
                      disabled={buttonIsDisabled}
                      className="bg-evening-sea-500 p-2 rounded font-bold text-evening-sea-50 disabled:bg-gray-400 disabled:text-gray-500 block"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </aside>
          </section>
        </Card>
      </Layout>
    </>
  );
}
